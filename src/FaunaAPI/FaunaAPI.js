import * as faunadb from "faunadb";
import { useState } from "react";
import sha512 from "crypto-js/sha512";
import { v4 } from "uuid";
import dayjs from "dayjs";
const DBKEY = "fnAEDU6P0MACCG7RBdvmIKviKzteD2ATpMvtVVxF";

export function login2({ client, q }, req) {
   return new Promise((resolve, reject) => {
      // rewrite this with index, this is way too expensive
      client
         .query(q.Paginate(q.Documents(q.Collection("users"))))
         .then((ret) => {
            let usermatch = [];
            const result = ret.data;
            client
               .query(q.Map(result, q.Lambda("x", q.Get(q.Var("x")))))
               .then((res) => {
                  usermatch = res
                     .map((i) => i.data)
                     .filter((i) => i.email === req.email);

                  if (usermatch.length === 0) {
                     alert("bad email");
                     localStorage.setItem("tt21_token", "");
                     return;
                  } else {
                     if (
                        usermatch[0].passwordHash !==
                        sha512(req.password + "_tt21").toString()
                     ) {
                        alert("bad password");
                        localStorage.setItem("tt21_token", "");
                        return;
                     } else {
                        // login success
                        // generate token, for now we use a fixed token
                        localStorage.setItem("tt21_token", usermatch[0].id);
                        alert("login success");
                        resolve(localStorage.getItem("tt21_token"));
                     }
                  }
               });
         });
   });
}

export function login({ client, q }, req) {
   return new Promise((resolve, reject) => {
      client
         .query(q.Get(q.Match(q.Index("HashByEmail"), req.email)))
         .then((ret) => {
            if (
               ret.data.passwordHash ===
               sha512(req.password + "_tt21").toString()
            ) {
               localStorage.setItem("tt21_token", ret.data.id);
               resolve({ ...ret.data, passwordHash: "" });
            } else {
               localStorage.setItem("tt21_token", "");
               reject("bad password");
            }
         })
         .catch((err) => {
            localStorage.setItem("tt21_token", "");
            reject("bad email");
         });
   });
}

// for localstorage user retrival
export function getUserByID({ client, q }, id) {
   return new Promise((resolve, reject) => {
      client
         .query(q.Get(q.Match(q.Index("RefByUserID"), id)))
         .then((ret) => {
            resolve({ ...ret.data, passwordHash: "" });
         })
         .catch((err) => {
            reject("bad token");
         });
   });
}

export function getCurrentUserRecipes({ client, q }, userid) {
   return new Promise((resolve, reject) => {
      client
         .query(
            q.Map(
               q.Paginate(q.Match(q.Index("RecipesBySubmittedUserID"), userid)),
               q.Lambda("x", q.Get(q.Var("x")))
            )
         )
         .then((ret) => {
            resolve(ret.data.map((i) => i.data));
         });
   });
}

export function register({ client, q }, req) {
   // reject if email is registered
   const newreq = {
      id: v4(),
      passwordHash: sha512(req.password + "_tt21").toString(),
      username: req.username,
      email: req.email,
      recipes: [],
      timeregistered: dayjs().format().split("T")[0],
      firstname: "",
      lastname: "",
      bio: "",
   };
   return new Promise((resolve, reject) => {
      client
         .query(q.Get(q.Match(q.Index("RefByEmail"), req.email)))
         .then((ret) => {
            // console.log(ret);
            reject("email already taken");
         })
         .catch((err) => {
            // console.log(err + " EMAIL NOT REGISTERED");
            client
               .query(
                  q.Create(q.Collection("users"), {
                     data: newreq,
                  })
               )
               .then((ret) => resolve(ret));
         });
   });
}

export function getRecipes({ client, q }) {
   // currently no authentication for getting recipes
   return new Promise((resolve, reject) => {
      client
         .query(q.Paginate(q.Documents(q.Collection("recipes")), { size: 20 }))
         .then((ret) => {
            client
               .query(q.Map(ret.data, q.Lambda("x", q.Get(q.Var("x")))))
               .then((res) => {
                  resolve(res.map((i) => i.data));
               });
         });
   });
}

export function getRecipesByCategory({ client, q }, category) {
   return new Promise((resolve, reject) => {
      client
         .query(
            q.Paginate(q.Match(q.Index("RefByRecipeCategory"), category), {
               size: 15,
            })
         )
         .then((ret) => {
            client
               .query(q.Map(ret.data, q.Lambda("x", q.Get(q.Var("x")))))
               .then((ret) => resolve(ret.map((i) => i.data)))
               .catch((err) => reject(err));
         });
   });
}

export function getRecipe({ client, q }, id) {
   return new Promise((resolve, reject) => {
      client
         .query(q.Get(q.Match(q.Index("RefByRecipeID"), id)))
         .then((ret) => resolve(ret))
         .catch((err) => reject(err));
   });
}

export function getCategories({ client, q }) {
   return new Promise((resolve, reject) => {
      client
         .query(q.Paginate(q.Distinct(q.Match(q.Index("Category")))))
         .then((ret) => resolve(ret))
         .catch((err) => reject(err));
   });
}

export function submitRecipe({ client, q }, req) {
   const newreq = { ...req, id: v4() };
   return new Promise((resolve, reject) => {
      client
         .query(
            q.Create(q.Collection("recipes"), {
               data: newreq,
            })
         )
         .then((ret) => resolve(ret));
   });
}

export function updateUser({ client, q }, userid, params) {
   return new Promise((resolve, reject) => {
      client
         .query(q.Get(q.Match(q.Index("RefByUserID"), userid)))
         .then((ret) => {
            client
               .query(q.Update(ret.ref, { data: params }))
               .then((ret) => resolve(ret));
         });
   });
}

// edit recipe not yet finished
export function updateRecipe({ client, q }, recipeid, params) {
   return new Promise((resolve, reject) => {
      client
         .query(q.Get(q.Match(q.Index("RefByRecipeID"), recipeid)))
         .then((ret) => {
            client
               .query(q.Update(ret.ref, { data: params }))
               .then((ret) => resolve(ret));
         });
   });
}

export function search({ client, q }, term, category) {
   if (term === "" && category !== "") {
      return getRecipesByCategory({ client, q }, category);
   }

   if (term !== "" && category === "") {
      return new Promise((resolve, reject) => {
         client
            .query(
               q.Map(
                  q.Filter(
                     q.Paginate(q.Match(q.Index("RecipesNamesID"))),
                     q.Lambda(
                        "x",
                        q.ContainsStrRegex(
                           q.Select([1], q.Var("x")),
                           "(?i)" + term
                        )
                     )
                  ),
                  q.Lambda(
                     "a",
                     q.Get(
                        q.Match(
                           q.Index("RefByRecipeID"),
                           q.Select([0], q.Var("a"))
                        )
                     )
                  )
               )
            )
            .then((res) => console.log(res));
      });
   }

   return new Promise((resolve, reject) => {
      client
         .query(
            q.Map(
               q.Filter(
                  q.Paginate(q.Match(q.Index("RefByRecipeCategory"), category)),
                  q.Lambda(
                     "x",
                     q.ContainsStrRegex(
                        q.Select(["data", "title"], q.Get(q.Var("x"))),
                        "(?i)" + term
                     )
                  )
               ),
               q.Lambda("a", q.Get(q.Var("a")))
            )
         )
         .then((res) => {
            // console.log(res.data.map((i) => i.data));
            resolve(res.data.map((i) => i.data));
         })
         .catch((err) => reject("no such found"));
   });
}

export function deleteRecipe({ client, q }, itemID) {
   return new Promise((resolve, reject) => {
      client
         .query(
            q.Delete(
               q.Select(
                  ["ref"],
                  q.Get(q.Match(q.Index("RefByRecipeID"), itemID))
               )
            )
         )
         .then((res) => resolve("delete success"))
         .catch((err) => reject(err));
   });
}

export default function useFauna() {
   var clnt = new faunadb.Client({
      secret: DBKEY,
   });
   const [client] = useState(clnt);
   const [q] = useState(faunadb.query);

   return { client, q };
}

import * as faunadb from "faunadb";
import { useState } from "react";
import sha512 from "crypto-js/sha512";
import { v4 } from "uuid";
const DBKEY = "fnAEDU6P0MACCG7RBdvmIKviKzteD2ATpMvtVVxF";

export function login({ client, q }, req) {
   return new Promise((resolve, reject) => {
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
                        localStorage.setItem(
                           "tt21_token",
                           "7deb9d7066be4e8bbf5b603e71817b6c"
                        );
                        alert("login success");
                        resolve(localStorage.getItem("tt21_token"));
                     }
                  }
               });
         });
   });
}

export function register({ client, q }, req) {
   // reject if email is registered
   const newreq = {
      id: v4(),
      passwordHash: sha512(req.password + "_tt21").toString(),
      name: req.username,
      email: req.email,
      recipes: [],
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
         .query(q.Paginate(q.Documents(q.Collection("recipes")), { size: 10 }))
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
               size: 10,
            })
         )
         .then((ret) => {
            client
               .query(q.Map(ret.data, q.Lambda("x", q.Get(q.Var("x")))))
               .then((ret) => resolve(ret.map((i) => i.data)))
               .catch((err) => console.log(err));
         });
   });
}

export function getRecipe({ client, q }, id) {
   return new Promise((resolve, reject) => {
      client
         .query(q.Get(q.Match(q.Index("RefByRecipeID"), id)))
         .then((ret) => resolve(ret))
         .catch((err) => console.log(err));
   });
}

export function getCategories({ client, q }) {
   return new Promise((resolve, reject) => {
      client
         .query(q.Paginate(q.Match(q.Index("Category"))))
         .then((ret) => resolve(ret))
         .catch((err) => console.log(err));
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

export default function useFauna() {
   var clnt = new faunadb.Client({
      secret: DBKEY,
   });
   const [client] = useState(clnt);
   const [q] = useState(faunadb.query);

   return { client, q };
}

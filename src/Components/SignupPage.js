import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import useFauna, { register } from "../FaunaAPI/FaunaAPI";
import { path } from "../Routes/routes";
import {
   DivFlexStyled,
   DivFlexGrowStyled,
   DivToggleFormStyled,
   LinkStyled,
   H1TitleStyled,
   DivFieldsetStyled,
   LabelStyled,
   InputStyled,
   DivButtonPaddingStyled,
   ButtonSubmitStyled,
   PRedStyled,
} from "./SharedStyles";
import schema from "../yupSchema/registerSchema";

const initialValues = {
   username: "",
   email: "",
   password: "",
   passwordConf: "",
};

const initialFocus = {
   username: false,
   email: false,
   password: false,
   passwordConf: false,
};

export default function SignupPage() {
   const [values, setValues] = useState(initialValues);
   const [focus, setFocus] = useState(initialFocus);
   const [errors, setErrors] = useState([]);
   const fauna = useFauna();

   function onChange(evt) {
      const { name, value } = evt.target;
      setValues({ ...values, [name]: value });
   }

   function onFocus(evt) {
      const { name } = evt.target;
      setFocus({ ...initialFocus, [name]: true });
   }

   function onBlur(evt) {
      setFocus(initialFocus);
   }

   function onSubmit(evt) {
      evt.preventDefault();
      // clean up data and check if ready
      // (valid email, username, passwords match...)

      try {
         schema.validateSync(values, { abortEarly: false });
         setErrors([]);
      } catch (err) {
         const list = err.inner.map((error) => error.errors[0]);
         setErrors(list);
      }

      // axios.post('url', values)
      //   .then( respones => {
      //     //confirmation and login user
      //   })
      //   .catch( err => {
      //     // assuming the error looks something like "username/email already taken"
      //     //setErrors(err.data);
      //   });

      register(fauna, values)
         .then((res) => alert("registered"))
         .catch((err) => alert(err));
   }

   return (
      <DivFlexStyled>
         <DivFlexGrowStyled>
            <DivToggleFormStyled>
               <LinkStyled to={path.login}>Login</LinkStyled>
            </DivToggleFormStyled>

            <H1TitleStyled>Register</H1TitleStyled>

            <form onSubmit={onSubmit} id="register">
               <DivFieldsetStyled>
                  <LabelStyled
                     focus={focus.username}
                     htmlFor="username"
                     hasData={values.username === "" ? false : true}
                  >
                     Username
                  </LabelStyled>
                  <InputStyled
                     id="username"
                     type="text"
                     name="username"
                     value={values.username}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                  />
               </DivFieldsetStyled>

               <DivFieldsetStyled>
                  <LabelStyled
                     focus={focus.email}
                     htmlFor="email"
                     hasData={values.email === "" ? false : true}
                  >
                     Email
                  </LabelStyled>
                  <InputStyled
                     id="email"
                     type="text"
                     name="email"
                     value={values.email}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                  />
               </DivFieldsetStyled>

               <DivFieldsetStyled>
                  <LabelStyled
                     focus={focus.password}
                     htmlFor="password"
                     hasData={values.password === "" ? false : true}
                  >
                     Password
                  </LabelStyled>
                  <InputStyled
                     id="password"
                     type="text"
                     name="password"
                     value={values.password}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                  />
               </DivFieldsetStyled>

               <DivFieldsetStyled>
                  <LabelStyled
                     focus={focus.passwordConf}
                     htmlFor="passwordConf"
                     hasData={values.passwordConf === "" ? false : true}
                  >
                     Confirm Password
                  </LabelStyled>
                  <InputStyled
                     id="passwordConf"
                     type="text"
                     name="passwordConf"
                     value={values.passwordConf}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                  />
               </DivFieldsetStyled>
            </form>

            {errors.map((error, i) => (
               <PRedStyled key={i}>{error}</PRedStyled>
            ))}
         </DivFlexGrowStyled>

         <DivButtonPaddingStyled>
            <ButtonSubmitStyled type="submit" form="register">
               Register
            </ButtonSubmitStyled>
         </DivButtonPaddingStyled>
      </DivFlexStyled>
   );
}

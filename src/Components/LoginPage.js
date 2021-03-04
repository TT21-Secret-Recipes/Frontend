import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';


import useFauna, { login } from '../FaunaAPI/FaunaAPI';
import { LoginContext } from '../Contexts';

import { path } from '../Routes/routes';
import eyeVisible from '../assets/iconmonstr-eye-thin.svg';
import eyeNotVisible from '../assets/iconmonstr-eye-off-thin.svg';

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
   ImgEyeStyled,
} from './SharedStyles';
import schema from '../yupSchema/loginSchema';

const initialValues = {
   email: '',
   password: '',
};

const initialFocus = {
   email: false,
   password: false,
};

export default function LoginPage() {
   const [values, setValues] = useState(initialValues);
   const [focus, setFocus] = useState(initialFocus);
   const [errors, setErrors] = useState([]);
   const [passwordVisible, setPasswordVisible] = useState(false);

   const fauna = useFauna();
   const { setCurrentUser } = useContext(LoginContext);
   const history = useHistory();

   function togglePasswordVisibilty(){
      setPasswordVisible(!passwordVisible);
   }

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

      try {
         schema.validateSync(values, { abortEarly: false });
         setErrors([]); // succsess! login user

         login(fauna, {
            email: values.email,
            password: values.password,
         })
            .then((res) => {
               // alert(res);
               setCurrentUser(res);
               history.push('/dashboard');
            })
            .catch((err) => {
               // alert(err)
               setErrors(['The provided email/password do not match']);
            });

      } catch (err) {
         const list = err.inner.map((error) => error.errors[0]);
         setErrors(list);
      }
   }

   return (
      <DivFlexStyled>
         <DivFlexGrowStyled>
            <DivToggleFormStyled>
               <LinkStyled to={path.signup}>Register</LinkStyled>
            </DivToggleFormStyled>

            <H1TitleStyled>Login</H1TitleStyled>

            <form onSubmit={onSubmit} id='login'>
               <DivFieldsetStyled>
                  <LabelStyled
                     focus={focus.email}
                     htmlFor='email'
                     hasData={values.email === '' ? false : true}
                  >
                     Email
                  </LabelStyled>
                  <InputStyled
                     id='email'
                     type='text'
                     name='email'
                     value={values.email}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                  />
               </DivFieldsetStyled>

               <DivFieldsetStyled>
                  <LabelStyled
                     htmlFor='password'
                     focus={focus.password}
                     hasData={values.password === '' ? false : true}
                  >
                     Password
                  </LabelStyled>
                  <InputStyled
                     id='password'
                     type={passwordVisible ? 'text' : 'password'}
                     name='password'
                     value={values.password}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                  />
                  <ImgEyeStyled 
                     src={passwordVisible ? eyeNotVisible : eyeVisible}
                     alt=''
                     onClick={togglePasswordVisibilty}
                  />
               </DivFieldsetStyled>
            </form>

            {errors.map((error, i) => (
               <PRedStyled key={i}>{error}</PRedStyled>
            ))}

         </DivFlexGrowStyled>

         <DivButtonPaddingStyled>
            <ButtonSubmitStyled type='submit' form='login'>
               Login
            </ButtonSubmitStyled>
         </DivButtonPaddingStyled>
      </DivFlexStyled>
   );
}

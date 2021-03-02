import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { path } from '../Routes/routes';
import { DivFlexStyled, DivFlexGrowStyled, DivToggleFormStyled, LinkStyled, H1TitleStyled, DivFieldsetStyled, LabelStyled, InputStyled, DivButtonPaddingStyled, ButtonSubmitStyled, PRedStyled } from './SharedStyles';
import schema from '../yupSchema/loginSchema';

const initialValues = {
  username: '',
  password: '',
}

const initialFocus = {
  username: false,
  password: false,
}

export default function LoginPage({submit}){
  const [ values, setValues ] = useState(initialValues);
  const [ focus, setFocus ] = useState(initialFocus);
  const [ errors, setErrors ] = useState([]);

  function onChange(evt){
    const { name, value } = evt.target;
    setValues({...values, [name]: value});
  }

  function onFocus(evt){
    const { name } = evt.target;
    setFocus({...initialFocus, [name]: true});
  }

  function onBlur(evt){
    setFocus(initialFocus);
  }

  function onSubmit(evt){
    evt.preventDefault();

    try {
      schema.validateSync(values, { abortEarly: false });
      setErrors([]);
    } catch(err) {
      console.log(err.inner);
      const list = err.inner.map( error => error.errors[0] );
      console.log(list);
      setErrors(list);
    }

    axios.post('url', values)
      .then( respones => {
        //login user
      })
      .catch( err => {
        // assuming the error looks something like "username and password do not match"
        //setErrors(err.data);
      });
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
            <LabelStyled focus={focus.username} htmlFor='username' hasData={values.username === '' ? false : true}>Username</LabelStyled>
              <InputStyled
                id='username'
                type='text'
                name='username' 
                value={values.username}
                onChange={onChange} 
                onFocus={onFocus} 
                onBlur={onBlur}/>
          </DivFieldsetStyled>

          <DivFieldsetStyled>
            <LabelStyled htmlFor='password' focus={focus.password} hasData={values.password === '' ? false : true}>Password</LabelStyled>
            <InputStyled
              id='password'
              type='text'
              name='password'
              value={values.password}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}/>
          </DivFieldsetStyled>
        
        </form>
        {errors.map( (error, i) => <PRedStyled key={i}>{error}</PRedStyled>)}
      </DivFlexGrowStyled>

      <DivButtonPaddingStyled>
        <ButtonSubmitStyled type='submit' form='login'>Login</ButtonSubmitStyled>
      </DivButtonPaddingStyled>
    </DivFlexStyled>
  )
}
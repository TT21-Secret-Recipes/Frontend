import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { path } from '../Routes/routes';
import { DivFlexStyled, DivFlexGrowStyled, DivToggleFormStyled, LinkStyled, H1TitleStyled, DivFieldsetStyled, LabelStyled, InputStyled, DivButtonPaddingStyled, ButtonSubmitStyled } from './SharedStyles';

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
  const [ error, setError ] = useState('');

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
    axios.post('url', values)
      .then( respones => {
        //login user
      })
      .catch( err => {
        // assuming the error looks something like "username and password do not match"
        setError(err.data);
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
            <LabelStyled focus={focus.username} htmlFor='username'>Username</LabelStyled>
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
            <LabelStyled focus={focus.password} htmlFor='password'>Password</LabelStyled>
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

        <p>{error}</p>
      </DivFlexGrowStyled>

      <DivButtonPaddingStyled>
        <ButtonSubmitStyled type='submit' form='login'>Login</ButtonSubmitStyled>
      </DivButtonPaddingStyled>
    </DivFlexStyled>
  )
}
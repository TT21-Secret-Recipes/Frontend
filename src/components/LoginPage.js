import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { path } from '../Routes/routes';
import { DivFlexStyled, DivFlexGrowStyled, DivToggleFormStyled, LinkStyled, DivButtonPaddingStyled, ButtonSubmitStyled } from './SharedStyles';


const InputStyled = styled.input`
  border: none;
  display: inline-block;
  font-size: 20px;
  outline: none;
  width: 250px;
`
// Thank you Chris from css tricks for giving me the css to make the "fieldset" work, ready to copy and paste
// https://css-tricks.com/snippets/css/non-form-fieldset-look/
const DivFieldsetStyled = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  position: relative;
  margin: 10px auto;
  padding: 10px;
  width: 300px;
`

const LabelStyled = styled.label`
  background: #fff;
  font-size: ${props => props.focus ? '18px' : '24px'};
  line-height: 1;
  margin-top: ${props => props.focus ? '-9px' : '8px'}; /* negative margin half of fontsize */
  padding: 0 3px;
  position: absolute;
  top: 0;
  transition: margin-top 0.15s, font-size 0.15s;
`


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

        <h1>Login</h1>

        <form onSubmit={onSubmit} id='login'>
          
          <DivFieldsetStyled>
            <LabelStyled focus={focus.username} htmlFor='username'>Username</LabelStyled>
            {/* <LabelStyled>{focus.username ? 'Username' : undefined}</LabelStyled> */}
              <InputStyled
                id='username'
                type='text'
                name='username' 
                // placeholder={!focus.username ? 'Username...' : undefined}
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
              // placeholder={!focus.password ? 'Password...' : undefined}
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
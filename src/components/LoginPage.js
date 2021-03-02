import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { path } from '../Routes/routes';

// const DivElementContainerStyled = styled.div`
//   border: 2px solid black;
// `

// const DivElementTitleStyled = styled.div`
//   background: white;
//   display: inline-block;
//   padding: 0 2px;
//   margin-left: 20px;
// `

// const DivElementContensStyled = styled.div`
//   padding: 0 3px;
// `

const FieldSetStyled = styled.fieldset`
  border: ${props => props.focus ? undefined : '1px solid black'};
  height: 44px;
  margin-top: -3px;
`

const LegendStyled = styled.legend`
  margin-left: -100px;
`

const InputStyled = styled.input`
  border: none;
  display: inline-block;
  font-size: 20px;
  margin-top: ${props => props.focus ? undefined : '19px'};
  outline: none;
  width: 250px;
`

const DivFieldsetStyled = styled.div`
  position: relative;
  border: 1px solid black;
  padding: 10px;
`

const LabelStyled = styled.label`
  position: absolute;
  top: 0;
  font-size: 18px;
  line-height: 1;
  margin: -9px 0 0; /* half of font-size */
  background: #fff;
  padding: 0 3px;
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
    console.log(evt);
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
    <div>
      <div>
        <Link to={path.signup}>Register</Link>
      </div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <FieldSetStyled focus={focus.username}>
          <legend></legend>
          {focus.username && <LegendStyled>Username</LegendStyled>}
            <InputStyled focus={focus.username}
              type='text'
              name='username' 
              placeholder={!focus.username ? 'Username...' : undefined}
              value={values.username}
              onChange={onChange} 
              onFocus={onFocus} 
              onBlur={onBlur}/>
        </FieldSetStyled>

        <DivFieldsetStyled>
          <LabelStyled>{focus.password ? 'Password' : undefined}</LabelStyled>
          <InputStyled
            type='text'
            name='password'
            placeholder={!focus.password ? 'Password...' : undefined}
            value={values.password}
            onChange={onChange} 
            onFocus={onFocus} 
            onBlur={onBlur}/>
        </DivFieldsetStyled>

        <p>{error}</p>

        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}
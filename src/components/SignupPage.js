import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { path } from '../Routes/routes';
import { DivFlexStyled, DivFlexGrowStyled, DivToggleFormStyled, LinkStyled, H1TitleStyled, DivFieldsetStyled, LabelStyled, InputStyled, DivButtonPaddingStyled, ButtonSubmitStyled } from './SharedStyles';

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConf: '',
}

const initialFocus = {
  username: false,
  email: false,
  password: false,
  passwordConf: false,
}

export default function SignupPage(){
  const [ values, setValues ] = useState(initialValues);
  const [ focus, setFocus ] = useState(initialFocus)
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
        setError(err.data);
      });
  }

  return (
    // <div>
    //   <div>
    //     <Link to={path.login}>Login</Link>
    //   </div>
    //   <h1>Register</h1>

    //   <form onSubmit={onSubmit}>
    //     <label>
    //         <input type='text' name='username' placeholder='Username...' value={values.username} onChange={onChange} />
    //     </label>

    //     <label>
    //       <input type='email' name='email' placeholder='Email...' value={values.email} onChange={onChange}/>
    //     </label>

    //     <label>
    //       <input type='text' name='password' placeholder='Password...' value={values.password} onChange={onChange}/>
    //     </label>

    //     <label>
    //       <input type='text' name='passwordConf' placeholder='Confirm Password...' value={values.passwordConf} onChange={onChange}/>
    //     </label>

    //     <p>{error}</p>

    //     <div>
    //       <button type='submit'>Login</button>
    //     </div>
    //   </form>
    // </div>

  <DivFlexStyled>
        
    <DivFlexGrowStyled>

      <DivToggleFormStyled>
        <LinkStyled to={path.login}>Login</LinkStyled>
      </DivToggleFormStyled>

      <H1TitleStyled>Register</H1TitleStyled>

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
          <LabelStyled focus={focus.email} htmlFor='email'>Email</LabelStyled>
          <InputStyled
            id='email'
            type='text'
            name='email'
            // placeholder={!focus.email ? 'email...' : undefined}
            value={values.email}
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

        <DivFieldsetStyled>
          <LabelStyled focus={focus.passwordConf} htmlFor='passwordConf'>Confirm Password</LabelStyled>
          <InputStyled
            id='passwordConf'
            type='text'
            name='passwordConf'
            // placeholder={!focus.passwordConf ? 'PasswordConf...' : undefined}
            value={values.passwordConf}
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
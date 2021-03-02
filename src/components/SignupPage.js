import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { path } from '../Routes/routes'

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConf: '',
}

export default function SignupPage(){
  const [ values, setValues ] = useState(initialValues);
  const [ error, setError ] = useState('');

  function onChange(evt){
    const { name, value } = evt.target;
    setValues({...values, [name]: value});
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
    <div>
      <div>
        <Link to={path.login}>Login</Link>
      </div>
      <h1>Register</h1>

      <form onSubmit={onSubmit}>
        <label>
            <input type='text' name='username' placeholder='Username...' value={values.username} onChange={onChange} />
        </label>

        <label>
          <input type='email' name='email' placeholder='Email...' value={values.email} onChange={onChange}/>
        </label>

        <label>
          <input type='text' name='password' placeholder='Password...' value={values.password} onChange={onChange}/>
        </label>

        <label>
          <input type='text' name='passwordConf' placeholder='Confirm Password...' value={values.passwordConf} onChange={onChange}/>
        </label>

        <p>{error}</p>

        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}
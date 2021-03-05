import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string()
    .required('Name is required'),
  email: yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string()
    .required('Password is required'),
  passwordConf: yup.string()
    .test('match', 'The entered passwords do not match', function(passwordConf) {
      if( this.parent !== undefined){
        return passwordConf === this.parent.password;
      }
  }),
})

export default loginSchema;
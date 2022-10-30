import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });

  // useMutation hook creates and prepares a JS function
  // that wraps around the mutation code and returns it
  // in this case it returns the form of the addUser function
  // also has the ability to check for errors
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // function passes the data from the form state obj as
  // variables for addUser mutation function.
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // user try/catch instaed of promises (.then and .catch) to handle erros
    // when successful the data obj is destructured from
    // response of the mutation 
    try {
      // executes addUser mutation and pass in variable date from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      console.log(data);
    }
    catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
              {/* if there's an error a div will appear with error message */}
              {error && <div>Sign up failed</div>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;

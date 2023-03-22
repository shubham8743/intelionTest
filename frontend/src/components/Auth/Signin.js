import React, { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';

import "./auth.css";

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
      });

    useEffect(() =>{
      isAuth() && window.location.replace('/dashboard');
    },[]);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const { email, password, error, loading, message } = values;

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, loading: true, error: false});
        const user = {email, password};
        signin(user)
          .then(data => {
            if(data.error){
              setValues({ ...values, error: data.error, loading: false })
            }else{
              authenticate(data, () => {
                if(isAuth()){
                    window.location.replace('/dashboard');
                }
              });
            }
          })
      };

    const showLoading = () => (loading ? <div>Loading...</div> : '');
    const showError = () => (error ? <div>{error}</div> : '');
    const showMessage = () => (message ? <div>{message}</div> : '');

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {showLoading()}
                {showError()}
                {showMessage()}
                <input className="formInput" onChange={handleChange('email')} name="email" value={email} type="email" placeholder="Email"/>
                <input className="formInput" onChange={handleChange('password')} name="password" value={password} type="password" placeholder="Password"/>
                <button>Sign In</button>
                <p>New user? <a href="/signup">Sign Up</a> here...</p>
            </form>
        </div>
    )
}

export default Signin;

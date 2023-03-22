import React, { useState, useEffect } from 'react';
import { signup, isAuth } from '../../actions/auth';

import "./auth.css";

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        role: '',
        loading: false,
        message: '',
        showForm: true
      });

    useEffect(() => {
      isAuth() && window.location.replace('/dashboard');
    },[]);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const {name, email, password, error, loading, message, showForm, role} = values;

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, loading: true, error: false});
        const user = {name, email, password, role};
        signup(user)
          .then(data => {
            if(data.error){
              setValues({ ...values, error: data.error, loading: false })
            }else{
              setValues({ ...values, name:'', email:'', password:'', error: '', loading: false, message: data.message, showForm: false})
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
                <input className="formInput" onChange={handleChange('name')} name="name" value={name} type="text" placeholder="Name"/>
                <input className="formInput" onChange={handleChange('email')} name="email" value={email} type="email" placeholder="Email"/>
                <input className="formInput" onChange={handleChange('password')} name="password" value={password} type="password" placeholder="Password"/>
                <select onChange={handleChange('role')} name="role" value={role} className="formInput">
                    <option>Admin</option>
                    <option>User</option>
                </select>
                <button>Sign Up</button>
                <p>Already Signed Up? <a href="/">Sign In</a> here...</p>
            </form>
        </div>
    )
}

export default Signup;
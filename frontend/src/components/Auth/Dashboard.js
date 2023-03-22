import React, { useEffect } from 'react';
import { admin, isAuth } from '../../actions/auth';

import "./auth.css";

const Dashboard = () => {
    useEffect(() =>{
        !isAuth() && window.location.replace('/');
      },[]);

    const checkAdmin = (event) => {
        event.preventDefault();
        const userId = {"id":isAuth()._id};
        admin(userId)
          .then(data => {
            if(data.error){
              alert(data.error);
            }else{
              alert(data.message);
            }
          })
    }

    return (
        <div className="container">
            <form>
                <p>Do you have admin access? <button onClick={checkAdmin}>Check</button> here...</p>
            </form>
        </div>
    )
}

export default Dashboard;

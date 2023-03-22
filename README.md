This folder is divided into 2 sub-folders.
Folder 1: backend
Folder 2: frontend
-----------------------------------------------------------

Steps for running backend:
1- npm install
2- npm start //backend runs on port defined in .env file

Steps for running frontend:
1- npm install
2- npm start

-----------------------------------------------------------

Task:
Create a sign-up and login application using MERN stack. #Check
Use authentication method for session expiration. #Check
Save encrypted password in Database #Check
Add 2-type of roles for login – Admin and User #Check

-----------------------------------------------------------

In backend, 
I have used JWT token to authenticate the user and the token is set to expire in 1 day.
I have stored the hashed password in the dB, which I have performed in models>user.js

I have created role for the user, which can be defined during signup.
In dashboard, there is a button, when clicked, it goes into backend to check whether the current user is admin or not and alerts the user accordingly.

-------------------------------------------------------------
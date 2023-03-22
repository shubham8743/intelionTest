import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Auth/Dashboard';

const RouteList = () => {
return(
    <Suspense fallback={<div />}>
        <Routes>
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Suspense>
)}

export default RouteList;

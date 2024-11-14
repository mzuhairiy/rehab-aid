import React from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Psychiatrists from "../pages/Psychiatrists/Psychiatrists";
import PsychiatristsDetails from "../pages/Psychiatrists/PsychiatristsDetails";

import { Routes, Route } from "react-router-dom";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/psychiatrist" element={<Psychiatrists />} />
            <Route path="/psychiatrist/:id" element={<PsychiatristsDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
        </Routes>
    );
};

export default Routers;
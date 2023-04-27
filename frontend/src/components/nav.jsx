import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import axios from "axios";

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.get("http://localhost:5000/home/logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      
      window.location.href = "/login";
    }
  } catch (e) {
    if (e.response.status === 401) {
      window.location.href = "/login";
    }
  }
};



const Navbar = (date,to_loc,from_loc) => {
  return (
    //a scrollable dates bar with dates from today to 30 days later and 7 days before which on clicking go to home/date/to_loc/from_loc
    <div className="navbar">
      <div className="navbar__left">


     
  );
};

export default Navbar;

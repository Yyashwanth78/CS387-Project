import React, { useState } from "react";

import "./login.css";


const Login = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    //to home with date and arrivalstring and departure string
    window.location.href = "/home/" + date + "/" + arrival + "/" + departure;


  };
  const [date, setDate] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");



  return (
    //form with date and arrivalstring and departure string
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />


      </div>
      <div>
        <label htmlFor="arrival">Arrival:</label>
        <input
          type="text"
          id="arrival"
          value={arrival}
          onChange={(event) => setArrival(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="departure">Departure:</label>
        <input
          type="text"
          id="departure"
          value={departure}
          onChange={(event) => setDeparture(event.target.value)}
        />
      </div>

      <button type="submit">Submit</button>


    </form>
  );
};

export default Login;

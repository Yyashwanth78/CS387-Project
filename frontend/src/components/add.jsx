import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Add() {
    const [to_loc, setTo_loc] = useState("");
    const [to_time, setTo_time] = useState("");
    const [from_loc, setFrom_loc] = useState("");
    const [from_time, setFrom_time] = useState("");
    const [price, setPrice] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/add", { from_loc, from_time, to_loc, to_time, price, capacity }, { withCredentials: true });
            if (response.status === 200) {
                window.location.href = "/chome/" + Date() + "/" + "Vistara";
            }
        } catch (e) {
            console.log(e);
        }
    };








    return (

        <Fragment>
            <h1>add</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="to_loc">To Location:</label>
                    <input
                        type="text"
                        id="to_loc"
                        value={to_loc}
                        onChange={(event) => setTo_loc(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="to_time">To Time:</label>
                    <input
                        type="time"
                        id="to_time"
                        value={to_time}
                        onChange={(event) => setTo_time(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="from_loc">From Location:</label>
                    <input
                        type="text"
                        id="from_loc"
                        value={from_loc}
                        onChange={(event) => setFrom_loc(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="from_time">From Time:</label>
                    <input
                        type="timestamp with time zone"
                        id="from_time"
                        value={from_time}
                        onChange={(event) => setFrom_time(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        value={capacity}
                        onChange={(event) => setCapacity(event.target.value)}
                    />
                </div>
                <button type="submit">Confirm</button>
            </form>
        </Fragment>






    )
}



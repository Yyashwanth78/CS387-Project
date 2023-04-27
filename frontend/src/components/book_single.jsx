import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Book_single() {
    const { sid } = useParams();
    const [seats, setseats] = useState(0);
    const [data, setdata] = useState([]);
    const handlesingle = (sid) => {
        const result = axios.post('http://localhost:5000/book_singles/' + sid+'/'+ seats , { withCredentials: true })
            .then(res => {
                console.log('book_single success');
            }
            )
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('http://localhost:5000/book_single/' + sid, { withCredentials: true })
            .then(res => {
                setdata(res.data);
            }
            )
            .catch(err => console.log(err));
    }
    , []);

    return (
        <Fragment>
            <h1>book_single</h1>
            //show data in data table
            <table>
                <thead>
                    <tr>
                        <th>sid</th>
                        <th>from_loc</th>
                        <th>from_time</th>
                        <th>to_loc</th>
                        <th>to_time</th>
                        <th>available</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr>
                            <td>{item.sid}</td>
                            <td>{item.from_loc}</td>
                            <td>{item.from_time}</td>
                            <td>{item.to_loc}</td>
                            <td>{item.to_time}</td>
                            <td>{item.capacity - item.filled}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <label>Seats</label>
                <input type="number" value={seats} onChange={(e) => setseats(e.target.value)} />

            </div>

            <p>
                <button onClick={() => handlesingle(sid)}>book_single</button>
            </p>

        </Fragment>
    )
}

            


        
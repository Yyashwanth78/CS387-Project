import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Book_multi() {
    const { sid1, sid2 } = useParams();
    const [seats, setseats] = useState(0);
    const [data, setdata] = useState([]);
    const handlebook_multi = (sid1, sid2) => {
        const res = axios.post('http://localhost:5000/book_multis/' + sid1 + '/' + sid2, { withCredentials: true })
            .then(res => {
                console.log('book_multi success');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('http://localhost:5000/book_multi/' + sid1 + '/' + sid2, { withCredentials: true })
            .then(res => {
                setdata(res.data);
            }
            )
            .catch(err => console.log(err));
    }

    , []);

    return (
        <Fragment>
            <h1>book_multi</h1>
            //show data in data table
            <table>
                <thead>
                    <tr>
                        <th>sid1</th>
                        <th>sid2</th>
                        <th>from_loc</th>
                        <th>from_time</th>
                        <th>mid_loc</th>
                        <th>mid_time</th>
                        <th>to_loc</th>
                        <th>to_time</th>
                        <th>available</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr>
                            <td>{item.sid1}</td>
                            <td>{item.sid2}</td>
                            <td>{item.from_loc}</td>
                            <td>{item.from_time}</td>
                            <td>{item.mid_loc}</td>
                            <td>{item.mid_time}</td>
                            <td>{item.to_loc}</td>
                            <td>{item.to_time}</td>
                            
                            <td>{Math.min(item.aval1,item.aval2)}</td>
                            <td>{item.price}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <label>seats</label>
                <input type="number" value={seats} onChange={(e) => setseats(e.target.value)} />
            </div>

            <p>
                <button onClick={() => handlebook_multi(sid1, sid2)}>book_multi</button>
            </p>

        </Fragment>
    )
}

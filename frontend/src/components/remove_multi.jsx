import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Remove_multi() {
    const { sid1, sid2 } = useParams();
    const [data, setdata] = useState([]);
    const handleremove_multi = (sid1, sid2) => {
        const res = axios.post('http://localhost:5000/remove_multis/' + sid1 + '/' + sid2, { withCredentials: true })
            .then(res => {
                console.log('remove_multi success');
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        axios.get('http://localhost:5000/remove_multi/' + sid1 + '/' + sid2, { withCredentials: true })
            .then(res => {
                setdata(res.data);
            }
            )
            .catch(err => console.log(err));
    }, []);

    return (
        <Fragment>
            <h1>remove_multi</h1>
            //show data in data table
            <table>
                <thead>
                    <tr>
                        <th>sid1</th>
                        <th>sid2</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr>
                            <td>{item.sid1}</td>
                            <td>{item.sid2}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p>
                <button onClick={() => handleremove_multi(sid1, sid2)}>remove_multi</button>
            </p>

        </Fragment>
    )
}







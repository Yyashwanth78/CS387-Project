import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function Remove_single() {
    const { sid } = useParams();
    const [single, setsingle] = useState([]);
    const [multi, setmulti] = useState([]);
    const handleremove_single = (sid) => {
        const res = axios.post('http://localhost:5000/remove_singles/' + sid, { withCredentials: true })
            .then(res => {
                console.log('remove_single success');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('http://localhost:5000/remove_single/' + sid, { withCredentials: true })
            .then(res => {
                setsingle(res.data.single);
                setmulti(res.data.multi);
            }
            )
            .catch(err => console.log(err));
    }, []);
    

    return (
        <Fragment>
            <h1>remove_single</h1>
            <h2>single</h2>
            <table>
                <thead>
                    <tr>
                        <th>sid</th>
                        <th>from_loc</th>
                        <th>from_time</th>
                        <th>to_loc</th>
                        <th>to_time</th>
                        <th>price</th>
                        <th>filled</th>
                    </tr>
                </thead>
                <tbody>
                    {single.map((item) => (
                        <tr>
                            <td>{item.sid}</td>
                            <td>{item.from_loc}</td>
                            <td>{item.from_time}</td>
                            <td>{item.to_loc}</td>
                            <td>{item.to_time}</td>
                            <td>{item.price}</td>
                            <td>{item.filled}</td>
                        </tr>
                    ))}
                </tbody>


            </table>

            <h2>multi</h2>
            <table>
                <thead>
                    <tr>
                        <th>sid1</th>
                        <th>sid2</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {multi.map((item) => (
                        <tr>
                            <td>{item.sid1}</td>
                            <td>{item.sid2}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                        
            <p>
                <button onClick={() => handleremove_single(sid)}>remove_single</button>
            </p>

        </Fragment>
    )
}

            


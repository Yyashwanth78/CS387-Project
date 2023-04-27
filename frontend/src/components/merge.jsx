import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Merge() {
    const {sid1, sid2} = useParams();
    const [data, setdata] = useState([]);
    const [newprice, setnewprice] = useState(0);
    const handlemerge = (sid1, sid2) => {
        const res = axios.post('http://localhost:5000/merges/' + sid1 + '/' + sid2+'/'+newprice, { withCredentials: true })
            .then(res => {
                console.log('merge success');
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        axios.get('http://localhost:5000/merge/' + sid1 + '/' + sid2, { withCredentials: true })
            .then(res => {
                setdata(res.data);
                console.log(res.data);
            }
            )
            .catch(err => console.log(err));
    }, []);
    return (
        <Fragment>
            <h1>merge</h1>
            

            <table>
                <thead>
                    <tr>
                        <th>sid</th>
                        <th>from_loc</th>
                        <th>from_time</th>
                        <th>to_loc</th>
                        <th>to_time</th>
                        <th>price</th>
                        <th>available</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.sid}>
                            <td>{item.sid}</td>
                            <td>{item.from_loc}</td>

                            <td>{item.from_time}</td>
                            <td>{item.to_loc}</td>
                            <td>{item.to_time}</td>
                            <td>{item.price}</td>
                            <td>{item.capacity - item.filled}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            

            <p>
            <input type = 'text' placeholder = 'new price' onChange = {(e) => setnewprice(e.target.value)}></input>
            </p>




            
            
            <p>
            <button type = 'submit' onClick = {() => handlemerge(sid1, sid2)}>merge</button>
            </p>





                        
        </Fragment>
    )
};



    
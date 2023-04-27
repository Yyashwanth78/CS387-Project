import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import "./nav.css";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Chome() {
    const { date } = useParams();
    const [date_new, setdate_new] = useState(date);
    const [company, setcompany] = useState([]);
    const [single_s, setsingle_s] = useState([]);
    const [multi_s, setmulti_s] = useState([]);
    const [merge_s, setmerge_s] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            window.location.href = "/chome/" + date_new;
        } catch (err) {
            console.log(err);
        }
    }


    const handlemerge = (sid1, sid2) => {
        //got to merge page
        try {
            window.location.href = "/merge/" + sid1 + "/" + sid2;
        } catch (err) {
            console.log(err);
        }
    }
    const handlemulti = (sid1, sid2) => {
        //got to multi page
        try {
            window.location.href = "/remove_multi/" + sid1 + "/" + sid2;
        } catch (err) {
            console.log(err);
        }
    }
    const handlesingle = (sid) => {
        //got to single page
        try {
            window.location.href = "/remove_single/" + sid;
        } catch (err) {
            console.log(err);
        }
    }
    const handleadd = () => {
        //got to add page
        try {
            window.location.href = "/add";
        } catch (err) {
            console.log(err);
        }
    }









    useEffect(() => {
        axios.get('http://localhost:5000/chome/' + date, { withCredentials: true })
            .then(res => {
                setcompany(res.data.company);
                setsingle_s(res.data.single_s);
                setmerge_s(res.data.merge_s);
                setmulti_s(res.data.multi_s);


            })
            .catch(err => console.log(err));
    }, []);



    return (
        
        <Fragment>
            //add sidebar
            <Sidebar/>


            <h1>{company}</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    height: '60px',
                    flexDirection: 'row',
                    gap: '16px',

                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '1',

                    padding: '16px',
                    zIndex: '100',
                }}
            >
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date_new}
                        onChange={(event) => setdate_new(event.target.value)}
                    />
                </div>
                
                
                <button type="submit">Change</button>
            </form>
            <h2>single</h2>
            <table>
                <thead>
                    <tr>
                        <th>sid</th>
                        <th>from_loc</th>
                        <th>to_loc</th>
                        <th>from_time</th>
                        <th>to_time</th>
                        <th>price</th>
                        <th>available</th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody>
                    {single_s.map((item) => (
                        <tr key={item.sid}>
                            <td>{item.sid}</td>
                            <td>{item.from_loc}</td>
                            <td>{item.to_loc}</td>
                            <td>{item.from_time}</td>
                            <td>{item.to_time}</td>
                            <td>{item.price}</td>
                            <td>{item.capacity - item.filled}</td>
                            <td><button type='submit' onClick={() => handlesingle(item.sid)}>remove</button></td>
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
                        <th>remove</th>

                    </tr>
                </thead>
                <tbody>
                    {multi_s.map((item) => (
                        //no key
                        <tr>
                            <td>{item.sid1}</td>
                            <td>{item.sid2}</td>
                            <td>{item.price}</td>
                            <td><button type='submit' onClick={() => handlemulti(item.sid1, item.sid2)}>remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>add</h2>
            <p>
                <button type='submit' onClick={() => handleadd()}>add</button>
            </p>



            <h2>merge</h2>
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
                        <th>merge
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {merge_s.map((item) => (

                        <tr>
                            <td>{item.sid1}</td>
                            <td>{item.sid2}</td>
                            <td>{item.from_loc}</td>
                            <td>{item.from_time}</td>
                            <td>{item.mid_loc}</td>
                            <td>{item.mid_time}</td>
                            <td>{item.to_loc}</td>
                            <td>{item.to_time}</td>


                            <td><button type='submit' onClick={() => handlemerge(item.sid1, item.sid2)}>merge</button></td>

                        </tr>
                    ))}
                </tbody>





            </table>
















        </Fragment>
    );
}




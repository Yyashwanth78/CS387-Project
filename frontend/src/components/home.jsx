import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";




export default function Home() {
  const { date, arrival, departure } = useParams();
  const [single_s, setsingle_s] = useState([]);
  const [multi_s, setmulti_s] = useState([]);
  const [to_loc_new, setto_loc_new] = useState(departure);
  const [from_loc_new, setfrom_loc_new] = useState(arrival);
  const [date_new, setdate_new] = useState(date);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      window.location.href = "/home/" + date_new + "/" + from_loc_new + "/" + to_loc_new;
    } catch (err) {
      console.log(err);
    }
  }
  const handlesingle = (sid) => {
    try{
      window.location.href = "/book_single/" + sid;
    }
    catch(err){
      console.log(err);
    }
  }
  const handlemulti = (sid1, sid2) => {
    try{
      window.location.href = "/book_multi/" + sid1 + "/" + sid2;
    }
    catch(err){
      console.log(err);
    }
  }






  console.log(date);
  useEffect(() => {
    axios.get('http://localhost:5000/home/' + date + '/' + arrival + '/' + departure, { withCredentials: true })
      .then(res => {

        setsingle_s(res.data.single);
        setmulti_s(res.data.multi);
        console.log(res.data);


      })
      .catch(err => {
        if (err.response.status === 401) {
        }
      })
  }, [])







  return (
    <Fragment>
      
      <form
    onSubmit={handleSubmit}
    style={{
      display: 'flex',
      height:'60px',
      flexDirection: 'row',
      gap: '16px',
      
      top: '0',
      left: '0',
      right: '0',
      bottom:'1',
      
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
    <div>
      <label htmlFor="arrival">Arrival:</label>
      <input
        type="text"
        id="arrival"
        value={from_loc_new}
        onChange={(event) => setfrom_loc_new(event.target.value)}
      />
    </div>
    <div>
      <label htmlFor="departure">Departure:</label>
      <input
        type="text"
        id="departure"
        value={to_loc_new}
        onChange={(event) => setto_loc_new(event.target.value)}
      />
    </div>
    <button type="submit">Submit</button>
  </form>
      <h2  >single</h2>
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
            <th>book</th>
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
              <td><button type = 'submit' onClick = {() => handlesingle(item.sid)}>book</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 >multi</h2>
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
            <th>price</th>
            <th>available</th>
            <th>book</th>
          </tr>
        </thead>
        <tbody>
          {multi_s.map((item) => (
            <tr>
              <td>{item.sid1}</td>
              <td>{item.sid2}</td>
              <td>{item.from_loc}</td>
              <td>{item.from_time}</td>
              <td>{item.mid_loc}</td>
              <td>{item.mid_time}</td>
              <td>{item.to_loc}</td>
              <td>{item.to_time}</td>
              <td>{item.price}</td>
            
              <td>{Math.min(item.aval1,   item.aval2)}</td>
              <td><button type = 'submit' onClick = {() => handlemulti(item.sid1, item.sid2)}>book</button></td>

            </tr>
          ))}
        </tbody>
      </table>


    </Fragment>
  );
}












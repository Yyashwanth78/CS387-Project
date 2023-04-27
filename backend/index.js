const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const session = require("express-session");
const bcrypt = require('bcrypt');

app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true
  }

));
app.use(express.json());


app.use(session({
  secret: "abcd",
  resave: true,
  saveUninitialized: true,

}));
const checkLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};


app.post("/login", async (req, res) => {
  // Replace this with your actual authentication logic
  const { username, password } = req.body;
  console.log(username, password);
  const result = await pool.query(
    'select password from user_password where user_id = $1', [username]
  );
  console.log(username, password)
  if (result.rows.length > 0) {
    if (password == result.rows[0].password) {
      req.session.user = username;
      console.log("username ", req.session.user)
      res.status(200).send({ username });
    } else {
      res.status(401).send("Unauthorized");
    }
  }
});


app.post("/clogin", async (req, res) => {
  // Replace this with your actual authentication logic
  const { username, password } = req.body;
  console.log(username, password);
  const result = await pool.query(
    'select password from company_auth where company = $1', [username]
  );

  if (result.rows.length > 0) {
    if (password == result.rows[0].password) {
      req.session.user = username;
      res.status(200).send({ username });
    } else {
      res.status(401).send("Unauthorized");
    }
  }
});



app.get('/home/:date/:from/:to', async (req, res) => {
  try {
    console.log('shvfh');
    const { date, from, to } = req.params;
    const result = await pool.query('SELECT * FROM single WHERE from_time::date = $1 and from_loc = $2 and to_loc = $3', [date, from, to]);
    const multi = await pool.query('with a as (select * from single where from_time::date = $1 and (from_loc = $2 or to_loc = $3)) select a.sid as sid1 ,b.sid as sid2, a.from_loc as from_loc, a.from_time as from_time , a.to_loc as mid_loc, a.to_time as mid_time, b.to_loc as to_loc,b.to_time as to_time,a.capacity-a.filled as aval1 , b.capacity-b.filled as aval2,multi.price  from (a join  a as b on a.to_loc=b.from_loc),multi where a.to_loc = b.from_loc and a.to_time<b.from_time and multi.sid1=a.sid and multi.sid2=b.sid', [date, from, to]);
    
    res.json({ single: result.rows, multi: multi.rows });
  }
  catch (err) {
    console.error(err.message);
  }
});




app.get('/chome/:date', async (req, res) => {
  try {
    const {date} = req.params;
    const company = req.session.user;
    const single_s = await pool.query('SELECT * FROM single WHERE from_time::date = $1 and company = $2 ', [date, company]);
    const multi_s = await pool.query('select * from multi'); 
    const merge_s = await pool.query('with a as (select * from single where from_time::date = $1 and company = $2)   select a.sid as sid1 ,b.sid as sid2, a.from_loc as from_loc , a.from_time as from_time , a.to_loc as mid_loc, a.to_time as mid_time, b.to_loc as to_loc,b.to_time as to_time from a, a b where a.to_loc = b.from_loc and a.to_time<b.from_time and not exists(select * from multi where sid1=a.sid and sid2=b.sid)', [date, company]);
    res.json({company:company, single_s: single_s.rows, multi_s: multi_s.rows, merge_s: merge_s.rows });

  }
  catch (err) {
    console.error(err.message);
  }
});

app.get('/merge/:sid1/:sid2', async (req, res) => {
  try {
    const { sid1, sid2 } = req.params;
    const result = await pool.query('select * from single where sid = $1 or sid = $2', [sid1, sid2]);
    console.log("jasjdhfjsdf");
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});


app.post('/merges/:sid1/:sid2/:newprice', async (req, res) => {
  try {
    const { sid1, sid2,newprice } = req.params;
    //need to insert into multi table
    const result = await pool.query('insert into multi values($1,$2,$3)', [sid1, sid2, newprice]);
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});


app.get('/remove_multi/:sid1/:sid2', async (req, res) => {
  try {
    const { sid1, sid2 } = req.params;
    const result = await pool.query('select * from multi where sid1 = $1 and sid2 = $2', [sid1, sid2]);
    console.log("jasjdhfjsdf");
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});

app.post('/remove_multis/:sid1/:sid2', async (req, res) => {
  try {
    const { sid1, sid2 } = req.params;
    const result = await pool.query('delete from multi where sid1 = $1 and sid2 = $2', [sid1, sid2]);
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});

app.get('/remove_single/:sid', async (req, res) => {
  try {
    const { sid } = req.params;
    const single = await pool.query('select * from single where sid = $1', [sid]);
    const multi = await pool.query('select * from multi where sid1 = $1 or sid2 = $1', [sid]);
    res.json({ single: single.rows, multi: multi.rows });
  }
  catch (err) {
    console.error(err.message);
  }
});


app.post('/remove_singles/:sid', async (req, res) => {
  try {
    const { sid } = req.params;
    const result = await pool.query('delete from single where sid = $1', [sid]);
    const result1 = await pool.query('delete from multi where sid1 = $1 or sid2 = $1', [sid]);
    res.json({ result: result.rows, result1: result1.rows});
  }
  catch (err) {
    console.error(err.message);
  }
});


app.get('/book_single/:sid', async (req, res) => {
  try {
    const { sid } = req.params;
    const result = await pool.query('select * from single where sid = $1', [sid]);
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});

app.post('/book_singles/:sid/:seats', async (req, res) => {
  try {
    const { sid,seats } = req.params;
    //filled= filled+1
    const result = await pool.query ('update single set filled = filled+$2 where sid = $1', [sid,seats]);
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});

app.get('/book_multi/:sid1/:sid2', async (req, res) => {
  try {
    const { sid1,sid2 } = req.params;
    console.log(sid1,sid2);
    const result = await pool.query('with a as (select * from single where sid = $1), b as (select * from single where sid = $2), c as (select * from multi where sid1 = $1 and sid2 = $2) select sid1 ,sid2, a.from_loc as from_loc , a.from_time as from_time , a.to_loc as mid_loc, a.to_time as mid_time, b.to_loc as to_loc,b.to_time as to_time, a.capacity-a.filled as aval1,b.capacity-b.filled as aval2    ,c.price as price from a,b,c', [sid1,sid2]);
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});

app.post('/book_multis/:sid1/:sid2/:seats', async (req, res) => {
  try {
    const { sid1,sid2,seats } = req.params;
    //filled= filled+1
    const result = await pool.query ('update single set filled = filled+$3 where sid = $1 or sid = $2', [sid1,sid2,seats]);
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});













// app.get('/home/logout', async (req, res) => {
//   req.session.destroy();
//   res.status(200).json('Logged out');
// });






app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
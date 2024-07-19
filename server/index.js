import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'manish',
  database: 'pisc',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database');
    return;
  }
  console.log('Connected to the database');
});

app.get('/', (req, res) => {
  res.json('Hello This is backend');
});

app.get('/users', (req, res) => {
  const q = 'SELECT * FROM employee;';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete('/users/:id', (req, res) => {
  const q = `DELETE FROM employee WHERE id = ${req.params.id};`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json('User Deleted');
  });
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const q =
    'UPDATE employee SET `firstname` = ?,`lastname`=?,`email`=?,`phone`=?,`address`=? WHERE id = ?';
  const { firstname, lastname, email, phone, address } = req.body;
  const values = [firstname, lastname, email, phone, address];
  db.query(q, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json('User Updated');
  });
});

app.post('/users', (req, res) => {
  const q =
    'INSERT INTO employee (`firstname`, `lastname`, `email`, `phone`, `address`) VALUES (?)';
  const { firstname, lastname, email, phone, address } = req.body;
  const values = [firstname, lastname, email, phone, address];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err.sqlMessage);
    return res.json('User registered successfully!');
  });
});

app.listen(8800, () => {
  console.log('Connected');
});

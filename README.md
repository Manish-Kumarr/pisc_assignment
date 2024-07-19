1. Open the folder after cloning
2. in Terminal    cd/client -> npm i -> npm run dev
3.                 cd/server -> npm i -> npm start

Change the crendential according to yours in server index.js file
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',         //change
  password: 'manish',    //cahnge
  database: 'pisc',      //change
});

Inside this we have employee table with coloumn
![image](https://github.com/user-attachments/assets/cac9c623-0d71-4813-9c53-01592e5ce0d8)

Enjoy


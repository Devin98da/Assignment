const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const path = require('path');

const AuthRoutes = require('./routes/auth');
const AdminRoutes = require('./routes/admin');

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);
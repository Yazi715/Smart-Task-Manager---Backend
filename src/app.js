require('dotenv').config();
console.log(process.env.MONGODB_URI)
const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const taskRoutes = require('./routes/taskRoutes');


const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

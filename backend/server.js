const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "https://softseekers-akash.herokuapp.com/"],
        credentials: true,
    })
);
app.use('/api/user', userRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server is Running on PORT ${PORT}`) });
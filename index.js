const express = require('express');
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8800;
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const charactersRoute = require("./routes/characters");
const clansRoute = require("./routes/clans");
const dojutsuRoute = require("./routes/dojutsu");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/api/characters", charactersRoute);
app.use("/api/clans", clansRoute);
app.use("/api/dojutsus", dojutsuRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const userRoute = require('./routes/users');
const pinRoute = require('./routes/pins');

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((error) => console.log(error));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

//console.log(process.env);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log("Backend rodando. Server hospedado na porta " + PORT);
});

const express = require('express');
const serverConfig = require('./config/serverConfig');
const mainPageRouter = require('./routes/view/main.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use('/', mainPageRouter);

app.listen(PORT, () => console.log(`Server has been start on port: ${PORT}`));

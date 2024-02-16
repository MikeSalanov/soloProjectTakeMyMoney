const express = require('express');
const serverConfig = require('./config/serverConfig');
const mainPageRouter = require('./routes/view/main.routes');
const signInRouterFrontend = require('./routes/view/signIn.routes');
const signUpRouterApi = require('./routes/api/register.routes');
const signInRouterApi = require('./routes/api/signIn.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use('/', mainPageRouter);
app.use('/signUp', signUpRouterApi);
app.use('/signIn', signInRouterFrontend, signInRouterApi);

app.listen(PORT, () => console.log(`Server has been start on port: ${PORT}`));

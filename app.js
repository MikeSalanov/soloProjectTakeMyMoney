const express = require('express');
const serverConfig = require('./config/serverConfig');
const mainPageRouter = require('./routes/view/main.routes');
const signInRouterFrontend = require('./routes/view/signIn.routes');
const signUpRouterFrontend = require('./routes/view/signUp.routes');
const signUpRouterApi = require('./routes/api/register.routes');
const signInRouterApi = require('./routes/api/signIn.routes');
const accountRouter = require('./routes/view/account.routes');
const routerOfChangeNameOfProject = require('./routes/api/project.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use('/', mainPageRouter);
app.use('/signUp', signUpRouterFrontend, signUpRouterApi);
app.use('/signIn', signInRouterFrontend, signInRouterApi);
app.use('/account', accountRouter);
app.use('/project', routerOfChangeNameOfProject);

app.listen(PORT, () => console.log(`Server has been start on port: ${PORT}`));

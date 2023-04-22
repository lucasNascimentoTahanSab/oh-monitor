const express = require('express');
const path = require('path');
const codeXRouter = require('./routes/codeX/codeXRouter');
const strapiRouter = require('./routes/strapi/strapiRouter');
const { gitHubRouter } = require('./routes/gitHub/gitHubRouter');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/code', codeXRouter);
app.use('/api/content', strapiRouter);
app.use('/api/repo', gitHubRouter);

app.listen(process.env.PORT);
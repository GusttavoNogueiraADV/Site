const express = require('express');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas API
const equipeRouter = require('./routes/equipe');
const deskCardsRouter = require('./routes/deskCards');
const servicesRouter = require('./routes/services');
const imagesInfoRouter = require('./routes/imagesInfo');

// Colocamos as rotas antes do history() para não sobrepor com o React Router
app.use('/equipe', equipeRouter);
app.use('/desk-cards', deskCardsRouter);
app.use('/services', servicesRouter);
app.use('/images-info', imagesInfoRouter);

app.use(history());

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

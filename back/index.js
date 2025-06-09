const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas API
const imagemRouter = require('./routes/imagens');
const deskCardsRouter = require('./routes/deskCards');
const servicesRouter = require('./routes/services');

app.use('/imagem', imagemRouter);
app.use('/desk-cards', deskCardsRouter);
app.use('/services', servicesRouter);

// Serve frontend React build (após rotas API)
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

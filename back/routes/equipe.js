// routes/equipe.js
const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('doctors')
    .select('name, url');

  if (error) {
    console.error('Erro ao buscar equipe:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar equipe' });
  }

  return res.json(data);
});

module.exports = router;

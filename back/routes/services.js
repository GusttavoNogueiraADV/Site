const express = require('express');
const router = express.Router();
const supabase = require('../supabase'); // verifica se esse caminho está certo

// GET /services
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('titulo');

  if (error) return res.status(500).json({ error: error.message });

  return res.json(data);
});

module.exports = router;

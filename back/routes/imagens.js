const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/:nome', async (req, res) => {
  const { nome } = req.params;

  const { data, error } = supabase
    .storage
    .from('images')
    .getPublicUrl(nome); 

  if (error) return res.status(500).json({ error: error.message });

  return res.json({ url: data.publicUrl });
});

module.exports = router;

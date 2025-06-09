const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// GET desk-cards
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('desk_cards')
    .select('*')
    .order('titulo');

  if (error) return res.status(500).json({ error: error.message });

  return res.json(data);
});

module.exports = router;

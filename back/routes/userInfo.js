const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Criação do cliente Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Rota para obter as informações do usuário
router.get('/user-info', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_info')  // Nome da tabela no Supabase
      .select('id, name, avatar_url, checked_icon_url, like_icon_url, comment_icon_url, share_icon_url, save_icon_url');
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Base URL do Supabase Storage
    const baseURL = `https://${process.env.SUPABASE_URL.split('//')[1]}/storage/v1/object/public/instagram/`;

    // Garantindo que as URLs das imagens estão corretas
    const userInfoWithFullUrls = data.map(user => ({
      ...user,
      avatar_url: `${baseURL}${user.avatar_url}`,
      checked_icon_url: `${baseURL}${user.checked_icon_url}`,
      like_icon_url: `${baseURL}${user.like_icon_url}`,
      comment_icon_url: `${baseURL}${user.comment_icon_url}`,
      share_icon_url: `${baseURL}${user.share_icon_url}`,
      save_icon_url: `${baseURL}${user.save_icon_url}`,
    }));

    res.json(userInfoWithFullUrls);  // Retorna os dados com as URLs completas
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do Supabase' });
  }
});

module.exports = router;

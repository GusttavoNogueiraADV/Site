// routes/imagesInfo.js
const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/', async (req, res) => {
  try {
    // Consulta as imagens na tabela 'images_info'
    const { data, error } = await supabase
      .from('images_info')
      .select('name, url');  // Seleciona o nome e URL das imagens

    if (error) {
      console.error('Erro ao buscar imagens:', error.message);
      return res.status(500).json({ error: 'Erro ao buscar imagens' });
    }

    // Verifica se as imagens foram encontradas
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Nenhuma imagem encontrada' });
    }

    // Retorna as imagens encontradas
    return res.json(data);
  } catch (error) {
    console.error('Erro inesperado:', error);
    return res.status(500).json({ error: 'Erro inesperado ao processar a requisição' });
  }
});

module.exports = router;

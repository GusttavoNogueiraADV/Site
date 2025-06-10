import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const missao = `No nosso escritório, as pessoas estão no centro de tudo o que fazemos. Sabemos que por trás de cada processo jurídico há histórias, necessidades e direitos que merecem atenção única.

Nossa missão é oferecer suporte jurídico humanizado e eficiente, atuando nas áreas do Direito do Trabalho, Cível, de Família e Previdenciário. Desde o primeiro contato até a solução do caso, trabalhamos com clareza, estratégia e transparência, garantindo que nossos clientes se sintam ouvidos, orientados e representados com excelência.

Investimos em cada detalhe para construir soluções jurídicas inteligentes e personalizadas — porque acreditamos que o direito só cumpre seu papel quando coloca as pessoas em primeiro lugar.`;

const descricaoPorNome = {
  'Gusttavo Nogueira': 'Sócio Fundador e gestor do Escritório Nogueira & Advogado Associados. Pós-graduado em direito do trabalho...',
  'Vinicius Meneses': 'Advogado atuante há três anos nas áreas do direito do trabalho, cível e imobiliário...',
  'Juliana Andrade': 'Advogada atuante há três anos nas áreas de direito previdenciário, cível e família...',
};

const API_URL = process.env.REACT_APP_API_URL;

const About = ({ open, onClose, type }) => {
  const [equipe, setEquipe] = useState([]);

  useEffect(() => {
    if (type === 'equipe' && open) {
      const fetchEquipe = async () => {
        try {
          // Fazendo a requisição para obter os membros da equipe, incluindo nome e URL da imagem
          const { data } = await axios.get(`${API_URL}/equipe`);

          // Mapeando os membros recebidos para adicionar as descrições e as imagens
          const membros = data.map((item) => {
            // Extraímos o nome da imagem (com base no nome da API e no formato do nome)
            const nomeCompleto = item.name.replace('.jpeg', '').replace('.jpg', '').replace(/Dr\.|Dra\./g, '').trim();
            
            return {
              nome: nomeCompleto,
              descricao: descricaoPorNome[nomeCompleto] || 'Descrição não disponível',
              foto: item.url, // URL da imagem que foi retornada pela API
            };
          });

          setEquipe(membros); // Atualiza o estado com os membros da equipe
        } catch (error) {
          console.error('Erro ao carregar equipe:', error);
        }
      };

      fetchEquipe();
    }
  }, [type, open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      centered
      closeIcon={<CloseCircleOutlined style={{ fontSize: 28, color: '#ff4d4f' }} />}
      bodyStyle={{
        fontFamily: 'Questrial, sans-serif',
        color: '#333',
        padding: 24,
        lineHeight: 1.6,
        backgroundColor: '#fff',
      }}
      destroyOnClose
      getContainer={false}
    >
      {type === 'missao' && (
        <div>
          <h2 style={{ color: '#d4af37', marginBottom: 20, fontWeight: 'bold' }}>Missão</h2>
          {missao.split('\n\n').map((p, i) => (
            <p key={i} style={{ marginBottom: 16, fontSize: '1rem' }}>
              {p}
            </p>
          ))}
        </div>
      )}

      {type === 'equipe' && (
        <div>
          <h2 style={{ color: '#d4af37', marginBottom: 20, fontWeight: 'bold' }}>Sobre a equipe</h2>
          {equipe.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            equipe.map(({ nome, descricao, foto }, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: 16,
                  marginBottom: 24,
                  alignItems: 'flex-start',
                }}
              >
                <img
                  src={foto}
                  alt={nome}
                  style={{
                    width: 100,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 8,
                    flexShrink: 0,
                    border: '2px solid #d4af37',
                  }}
                />
                <div>
                  <h3 style={{ margin: 0, marginBottom: 6, color: '#333', fontWeight: '600' }}>{nome}</h3>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#555' }}>{descricao}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Modal>
  );
};

export default About;

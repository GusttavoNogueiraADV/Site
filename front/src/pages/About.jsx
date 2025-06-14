import React from 'react';
import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const missao = `No nosso escritório, as pessoas estão no centro de tudo o que fazemos. Sabemos que por trás de cada processo jurídico há histórias, necessidades e direitos que merecem atenção única.

Nossa missão é oferecer suporte jurídico humanizado e eficiente, atuando nas áreas do Direito do Trabalho, Cível, de Família e Previdenciário. Desde o primeiro contato até a solução do caso, trabalhamos com clareza, estratégia e transparência, garantindo que nossos clientes se sintam ouvidos, orientados e representados com excelência.

Investimos em cada detalhe para construir soluções jurídicas inteligentes e personalizadas — porque acreditamos que o direito só cumpre seu papel quando coloca as pessoas em primeiro lugar.`;

const descricaoPorNome = {
  'Dr. Gusttavo Nogueira': 'Sócio Fundador e gestor do Escritório Nogueira & Advogado Associados. Pós-graduado em direito do trabalho...',
  'Dr. Vinicius Meneses': 'Advogado atuante há três anos nas áreas do direito do trabalho, cível e imobiliário...',
  'Dra. Juliana Andrade': 'Advogada atuante há três anos nas áreas de direito previdenciário, cível e família...',
};

const equipeFixa = [
  {
    nome: 'Dr. Gusttavo Nogueira',
    imagem: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dr.%20Gusttavo%20Nogueira.jpg',
  },
  {
    nome: 'Dr. Vinicius Meneses',
    imagem: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dr.%20Vinicius%20Meneses.jpeg',
  },
  {
    nome: 'Dra. Juliana Andrade',
    imagem: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dra.%20Juliana%20Andrade.jpeg',
  },
];

const About = ({ open, onClose, type }) => {
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
          {equipeFixa.map(({ nome, imagem }, idx) => (
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
                src={imagem}
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
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#555' }}>
                  {descricaoPorNome[nome] || 'Descrição não disponível'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default About;

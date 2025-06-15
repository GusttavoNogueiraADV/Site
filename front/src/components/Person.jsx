import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const descricaoPorNome = {
  'Dr. Gusttavo Nogueira':
    'Sócio Fundador e gestor do Escritório Nogueira & Advogado Associados. Pós-graduado em direito do trabalho. Atua com dedicação em causas trabalhistas complexas, além de coordenar a atuação estratégica do time jurídico.',
  'Dr. Vinicius Meneses':
    'Advogado atuante há três anos nas áreas do direito do trabalho, cível e imobiliário. Reconhecido por sua abordagem comprometida e orientação clara para seus clientes.',
  'Dra. Juliana Andrade':
    'Advogada atuante há três anos nas áreas de direito previdenciário, cível e família. Conduz seus atendimentos com empatia, buscando sempre as melhores soluções jurídicas.',
};

const imagemPorNome = {
  'Dr. Gusttavo Nogueira':
    'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dr.%20Gusttavo%20Nogueira.jpg',
  'Dr. Vinicius Meneses':
    'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dr.%20Vinicius%20Meneses.jpeg',
  'Dra. Juliana Andrade':
    'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dra.%20Juliana%20Andrade.jpeg',
};

const Person = ({ open, onClose, personName }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!personName) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={window.innerWidth < 640 ? '90%' : 600}
      centered
      closeIcon={
        <CloseCircleOutlined style={{ fontSize: 28, color: '#ff4d4f' }} />
      }
      bodyStyle={{
        fontFamily: 'Questrial, sans-serif',
        color: '#333',
        padding: 24,
        lineHeight: 1.6,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        animation: 'fadeIn 0.3s ease',
      }}
      destroyOnClose
      getContainer={false}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: window.innerWidth < 640 ? 'column' : 'row',
          gap: 24,
          alignItems: window.innerWidth < 640 ? 'center' : 'flex-start',
        }}
      >
        <img
          src={imagemPorNome[personName]}
          alt={personName}
          style={{
            width: 140,
            height: 160,
            objectFit: 'cover',
            borderRadius: 12,
            border: '3px solid #d4af37',
            flexShrink: 0,
            transition: 'transform 0.3s ease',
          }}
        />
        <div style={{ textAlign: window.innerWidth < 640 ? 'center' : 'left' }}>
          <h2
            style={{
              color: '#d4af37',
              marginBottom: 10,
              fontWeight: 600,
              fontSize: '1.4rem',
            }}
          >
            {personName}
          </h2>
          <p style={{ fontSize: '1rem', color: '#555', margin: 0 }}>
            {descricaoPorNome[personName] || 'Descrição não disponível.'}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .ant-modal-content {
          border-radius: 12px !important;
        }

        @media (max-width: 640px) {
          img {
            width: 100px !important;
            height: 120px !important;
          }
        }
      `}</style>
    </Modal>
  );
};

export default Person;

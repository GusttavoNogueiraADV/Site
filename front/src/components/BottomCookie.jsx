import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';

const BottomCookie = () => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false); // controla renderização para animação

  useEffect(() => {
    if (window.innerWidth > 768) {
      setVisible(true);
      setShouldRender(true);
    }
  }, []);

  const handleClose = () => {
    // inicia animação sumindo
    setVisible(false);
    // remove do DOM após animação (400ms)
    setTimeout(() => setShouldRender(false), 400);
  };

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0A203A', // fundo azul escuro
        color: '#FEDC96',           // texto amarelo claro
        padding: '18px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Questrial, sans-serif',
        fontSize: '1rem',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '90%' }}>
        Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de cookies.
      </div>
      <button
        onClick={handleClose}
        style={{
          backgroundColor: '#FEDC96', // botão amarelo claro
          border: 'none',
          color: '#0A203A',           // texto azul escuro no botão
          padding: '8px 12px',
          cursor: 'pointer',
          fontWeight: 'bold',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Fechar aviso de cookies"
      >
        <CloseOutlined style={{ fontSize: '16px' }} />
      </button>
    </div>
  );
};

export default BottomCookie;

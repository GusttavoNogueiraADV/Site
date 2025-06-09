import React from 'react';

const CardBox = ({ title, subtitle }) => {
  const handleWhatsAppClick = () => {
    const phone = '5513992102893'; // DDI + DDD + número
    const message = encodeURIComponent(
      'Olá, vi os serviços no site e gostaria de saber mais informações.'
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="card-box" style={cardContainer}>
      <div className="card-content" style={cardContent}>
        <h3 style={cardTitle}>{title}</h3>
        <div style={cardLine}></div>
        <div className="card-details" style={cardHidden}>
          <p style={cardText}>
            {subtitle || 'Descrição não disponível no momento.'}
          </p>
          <div
            className="saber-mais shine-text"
            style={saberMais}
            onClick={handleWhatsAppClick}
          >
            SABER+
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================
// 💅 Estilos
// ======================

const cardContainer = {
  width: '32%',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  borderRadius: '16px',
  padding: '20px',
  color: '#FFF',
  position: 'relative',
  height: '120px',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  cursor: 'pointer',
};

const cardContent = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'all 0.4s ease',
};

const cardTitle = {
  fontSize: '22px',
  marginBottom: '10px',
};

const cardLine = {
  width: '60px',
  height: '3px',
  backgroundColor: '#FEDC96',
  margin: '0 auto',
};

const cardHidden = {
  opacity: 0,
  maxHeight: 0,
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  paddingBottom: '40px',
};

const cardText = {
  color: '#FFF',
  fontSize: '15px',
  marginTop: '20px',
  lineHeight: '1.5',
  textAlign: 'left',
};

const saberMais = {
  position: 'absolute',
  bottom: '30px',
  left: '20px',
  fontWeight: 'bold',
  fontSize: '14px',
  color: 'transparent',
  textAlign: 'left',
  zIndex: 1,
  overflow: 'hidden',
  display: 'inline-block',
  WebkitTextStroke: '0.5px #FEDC96',
  transition: 'color 0.3s ease',
  cursor: 'pointer',
};

export default CardBox;

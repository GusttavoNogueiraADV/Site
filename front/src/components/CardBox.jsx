import React from 'react';

const CardBox = ({ title, subtitle }) => {
  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const phone = '5513992102893';
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
            className="saber-mais"
            style={saberMais}
            onClick={handleWhatsAppClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0A203A';
              e.currentTarget.style.backgroundColor = '#FEDC96';
              e.currentTarget.style.webkitTextStroke = '0';
              e.currentTarget.style.transition = 'all 0.3s ease';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'transparent';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.webkitTextStroke = '0.5px #FEDC96';
              e.currentTarget.style.transition = 'all 0.3s ease';
            }}
          >
            SABER+
          </div>
        </div>
      </div>
    </div>
  );
};

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
  padding: '3px 20px',
  left: '20px',
  fontWeight: 'bold',
  fontSize: '14px',
  color: 'transparent',
  textAlign: 'left',
  zIndex: 1,
  overflow: 'hidden',
  borderRadius: '10px',
  display: 'inline-block',
  WebkitTextStroke: '0.5px #FEDC96',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

export default CardBox;

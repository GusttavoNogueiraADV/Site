import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import CardBox from '../components/CardBox';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Desk = () => {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${API_URL}/desk-cards`);
      setCards(res.data);
    } catch (err) {
      console.error('Erro ao carregar cards:', err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .cards-container {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 80px;
            flex-wrap: nowrap;
            min-height: 340px;
            overflow: visible;
            position: relative;
          }

          .card-box {
            position: relative;
            transition: height 0.3s ease;
            z-index: 1;
            overflow: hidden;
          }

          .card-box:hover {
            height: 300px !important;
            z-index: 10;
            overflow: visible;
          }

          .card-box:hover .card-details {
            opacity: 1 !important;
            max-height: 200px !important;
          }

          .shine-text::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              120deg,
              transparent,
              rgba(255, 255, 255, 0.6),
              transparent
            );
            z-index: 2;
            transform: skewX(-20deg);
            pointer-events: none;
          }

          .shine-text:hover::before {
            animation: shine-text 1s forwards;
          }

          @keyframes shine-text {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          .shine-text:hover {
            color: #ffffff !important;
          }

          @media (max-width: 960px) {
            .cards-container {
              flex-wrap: wrap !important;
              justify-content: center !important;
              gap: 16px !important;
              min-height: auto;
            }

            .card-box {
              width: 100% !important;
              height: auto !important;
              margin-bottom: 20px;
            }

            .card-box:hover {
              height: auto !important;
              overflow: visible;
            }
          }

          @media (max-width: 768px) {
            .desk-button-wrapper {
              display: flex;
              justify-content: center;
            }

            .shine-button {
              width: 100% !important;
              max-width: 90vw !important;
              padding: 12px 24px !important;
              font-size: 14px !important;
            }
          }
        `}
      </style>

      <section
        style={{
          minHeight: '80vh',
          position: 'relative',
          fontFamily: 'Questrial, sans-serif',
          padding: '60px 20px 100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          overflow: 'hidden',
          background: `linear-gradient(270deg, #123359, #0A203A, #1C3B70, #0A203A)`,
          backgroundSize: '800% 800%',
          animation: 'gradientShift 15s ease infinite',
        }}
      >
        {/* Overlay escuro para contraste */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 32, 58, 0.6)',
            zIndex: 0,
          }}
        />

        {/* Conteúdo principal */}
        <div style={{ zIndex: 1, maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          <div className="cards-container">
            {cards.map((card) => (
              <CardBox key={card.id} title={card.titulo} subtitle={card.subtitulo} />
            ))}
          </div>

          {/* Botão com responsividade */}
          <div className="desk-button-wrapper" style={{ marginTop: '20px', position: 'relative', zIndex: 20 }}>
            <Button
              text="Conhecer Escritório"
              onClick={() =>
                window.open(
                  'https://www.google.com/maps/place/Av.+Santos+Dumont,+1331+-+S%C3%ADtio+Paecara,+Guaruj%C3%A1+-+SP,+11460-003',
                  '_blank'
                )
              }
              style={{
                borderRadius: '6px',
                padding: '22px 180px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#FEDC96',
                border: 'none',
                color: '#0A203A',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
              type="default"
            />

          </div>
        </div>
      </section>
    </>
  );
};

export default Desk;

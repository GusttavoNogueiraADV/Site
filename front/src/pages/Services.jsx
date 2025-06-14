import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from 'antd';

const { Title } = Typography;
const API_URL = process.env.REACT_APP_API_URL;

const Services = () => {
  const [cards, setCards] = useState([]);
  const wrapperRef = useRef(null);
  const animationFrameId = useRef(null);
  const [cardWidthPx, setCardWidthPx] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

 useEffect(() => {
    const fetchLocalCards = async () => {
      try {
        const res = await fetch('/json/services.json'); 
        const data = await res.json();
        const sortedCards = data.sort((a, b) => a.id - b.id);
        setCards(sortedCards);
      } catch (error) {
        console.error('Erro ao carregar cards do JSON local:', error);
      }
    };

    fetchLocalCards();
  }, []);


  const cardsCount = cards.length;
  const duplicatedCards = [...cards, ...cards, ...cards];

  useEffect(() => {
    const updateCardWidth = () => {
      if (wrapperRef.current) {
        const isMobile = window.innerWidth <= 768;
        const width = wrapperRef.current.offsetWidth * (isMobile ? 0.9 : 0.4);
        setCardWidthPx(width);
      }
    };
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const resetScrollIfNeeded = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper || cardWidthPx === 0 || cardsCount === 0) return;

    const slideSize = cardWidthPx + 20;
    const totalScroll = slideSize * duplicatedCards.length;
    const third = slideSize * cardsCount;

    if (wrapper.scrollLeft <= third / 2) {
      wrapper.scrollLeft += third;
    } else if (wrapper.scrollLeft >= totalScroll - third / 2) {
      wrapper.scrollLeft -= third;
    }
  };

  const updateActiveIndex = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper || cardWidthPx === 0 || cardsCount === 0) return;

    const slideSize = cardWidthPx + 20;
    const base = slideSize * cardsCount;

    let rawIndex = Math.round((wrapper.scrollLeft - base) / slideSize);
    if (rawIndex < 0) rawIndex += cardsCount;
    if (rawIndex >= cardsCount) rawIndex -= cardsCount;

    setActiveIndex(rawIndex);
  };

  useEffect(() => {
    if (cardsCount === 0) return;

    const wrapper = wrapperRef.current;
    if (!wrapper || cardWidthPx === 0) return;

    const slideSize = cardWidthPx + 20;
    const speed = 0.5;

    wrapper.scrollLeft = slideSize * cardsCount;

    let lastTimestamp = performance.now();

    const step = (timestamp) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      wrapper.scrollLeft += speed * (delta / 16.67);

      resetScrollIfNeeded();
      updateActiveIndex();

      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [cardWidthPx, cardsCount]);

  useEffect(() => {
    if (cardsCount === 0) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.pageX || (e.touches && e.touches[0].pageX);
      scrollStart = wrapper.scrollLeft;
      cancelAnimationFrame(animationFrameId.current);
      wrapper.style.scrollBehavior = 'auto';
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX || (e.touches && e.touches[0].pageX);
      const dx = startX - x;
      wrapper.scrollLeft = scrollStart + dx;

      resetScrollIfNeeded();
      updateActiveIndex();
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;

      wrapper.style.scrollBehavior = 'smooth';

      let lastTimestamp = performance.now();
      const speed = 0.5;

      const step = (timestamp) => {
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        wrapper.scrollLeft += speed * (delta / 16.67);

        resetScrollIfNeeded();
        updateActiveIndex();

        animationFrameId.current = requestAnimationFrame(step);
      };

      animationFrameId.current = requestAnimationFrame(step);
    };

    wrapper.addEventListener('mousedown', onPointerDown);
    wrapper.addEventListener('touchstart', onPointerDown, { passive: true });
    wrapper.addEventListener('mousemove', onPointerMove);
    wrapper.addEventListener('touchmove', onPointerMove, { passive: true });
    wrapper.addEventListener('mouseup', onPointerUp);
    wrapper.addEventListener('mouseleave', onPointerUp);
    wrapper.addEventListener('touchend', onPointerUp);

    return () => {
      wrapper.removeEventListener('mousedown', onPointerDown);
      wrapper.removeEventListener('touchstart', onPointerDown);
      wrapper.removeEventListener('mousemove', onPointerMove);
      wrapper.removeEventListener('touchmove', onPointerMove);
      wrapper.removeEventListener('mouseup', onPointerUp);
      wrapper.removeEventListener('mouseleave', onPointerUp);
      wrapper.removeEventListener('touchend', onPointerUp);
    };
  }, [cardWidthPx, cardsCount]);

  const onDotClick = (index) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const slideSize = cardWidthPx + 20;
    const targetScroll = slideSize * cardsCount + slideSize * index;

    wrapper.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section style={sectionStyle}>
      <Title level={2} style={titleStyle}>
        Nossos <span style={highlightStyle}>Serviços</span>
      </Title>

      <div ref={wrapperRef} style={carouselWrapper} className="custom-scrollbar">
        {duplicatedCards.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            style={{
              ...cardStyle,
              maxWidth: window.innerWidth <= 768 ? '90%' : '40%',
              marginRight: '20px',
            }}
          >
            <div style={cardContent}>
              <h3 style={cardTitle}>{card.titulo}</h3>
              <p style={cardText}>{card.texto}</p>

              <div className="divider" style={divider}></div>
              <div
                className="saber-mais"
                style={saberMais}
                onClick={() => {
                  const message = "Olá, gostaria de saber mais sobre os serviços jurídicos oferecidos.";
                  const phone = "5513992102893"; // número com DDI +55
                  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                  window.open(url, "_blank");
                }}
              >
                SABER MAIS
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={dotsWrapper}>
        {cards.map((_, idx) => (
          <div
            key={idx}
            onClick={() => onDotClick(idx)}
            style={{
              ...dotStyle,
              width: activeIndex === idx ? 40 : 24,
              backgroundColor: activeIndex === idx ? '#FEDC96' : 'rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}
      </div>

      <style>{`
        .saber-mais {
          position: relative;
          display: inline-block;
          font-size: 12px;
          font-weight: bold;
          color: #FEDC96;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.4s ease;
        }
        .saber-mais::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(254, 220, 150, 0.4),
            transparent
          );
          transition: all 0.6s ease;
        }
        .saber-mais:hover::before {
          left: 100%;
        }
        .saber-mais:hover {
          color: #fff;
          text-shadow: 0 0 6px #FEDC96;
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #FEDC96;
          border-radius: 3px;
        }

        /* MOBILE AJUSTES */
        @media (max-width: 768px) {
          .divider, .saber-mais {
            display: none !important;
          }

          section {
            padding: 40px 10px;
          }

          h2 {
            font-size: 28px !important;
            text-align: center !important;
          }

          .ant-typography {
            text-align: center !important;
          }

          div[style*="max-width: 40%"] {
            max-width: 90% !important;
            height: auto !important;
            min-height: 280px;
            padding: 16px !important;
          }

          p {
            font-size: 14px !important;
          }

          div[style*="width: 40px"] {
            width: 30px !important;
            height: 8px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

// 🎨 ESTILOS
const sectionStyle = {
  padding: '80px 20px',
  background: '#0A203A',
  fontFamily: 'Questrial, sans-serif',
};

const titleStyle = {
  color: '#fff',
  marginBottom: '45px',
  fontSize: '42px',
  fontWeight: 400,
  textAlign: 'left',
  paddingLeft: '20px',
};

const highlightStyle = {
  fontSize: '48px',
  fontWeight: 'bold',
};

const carouselWrapper = {
  display: 'flex',
  overflowX: 'hidden',
  paddingLeft: '20px',
  paddingRight: '20px',
  userSelect: 'none',
  WebkitOverflowScrolling: 'touch',
};

const cardStyle = {
  flexShrink: 0,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px',
  padding: '20px 18px',
  color: '#FFF',
  height: '320px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const cardContent = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
};

const cardTitle = {
  fontSize: '20px',
  fontWeight: 600,
  marginBottom: '10px',
};

const cardText = {
  fontSize: '14px',
  width: '100%',
  lineHeight: '1.4',
  color: '#DDD',
  marginBottom: '20px',
};

const divider = {
  height: '1px',
  backgroundColor: '#FEDC96',
  opacity: 0.4,
  marginBottom: '10px',
};

const saberMais = {
  position: 'relative',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#FEDC96',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'color 0.4s ease',
};

const dotsWrapper = {
  marginTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  paddingLeft: '20px',
  paddingRight: '20px',
};

const dotStyle = {
  height: '8px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
};

export default Services;

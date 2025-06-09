import { Button as AntButton } from 'antd';
import { useEffect } from 'react';

const Button = ({ text, onClick, style, type = 'default' }) => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .shine-button {
        position: relative !important;
        overflow: hidden !important;
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
      }

      .shine-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -75%;
        width: 50%;
        height: 100%;
        background: linear-gradient(
          120deg,
          rgba(255, 255, 255, 0.05) 0%,
          rgba(255, 255, 255, 0.5) 50%,
          rgba(255, 255, 255, 0.05) 100%
        );
        transform: skewX(-20deg);
        z-index: 2;
        pointer-events: none;
      }

      .shine-button:hover::before {
        animation: shine 0.8s ease;
      }

      @keyframes shine {
        0% {
          left: -75%;
        }
        100% {
          left: 125%;
        }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Handlers para efeito de "aproximação"
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.03)';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 215, 0, 0.4)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <AntButton
      onClick={onClick}
      type={type}
      className="shine-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: '24px',
        padding: '10px 28px',
        backgroundColor: 'transparent',
        border: '2px solid #000',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '16px',
        position: 'relative',
        zIndex: 1,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ...style,
      }}
    >
      {text}
    </AntButton>
  );
};

export default Button;

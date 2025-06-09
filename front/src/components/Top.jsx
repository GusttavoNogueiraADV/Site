import { useEffect, useState } from 'react';

const Top = ({ chatOpen }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !chatOpen) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chatOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '67px',
        right: '34px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out',
        zIndex: 100,
        cursor: 'pointer',
        fontSize: '50px',
        color: '#FEDC96',
        borderRadius: '8px',
        fontWeight: 'bold',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onClick={scrollToTop}
      title="Voltar ao topo"
    >
      ^
    </div>
  );
};

export default Top;

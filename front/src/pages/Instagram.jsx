import React, { useEffect, useState, useRef } from 'react';
import { Typography } from 'antd';
import PolaroidCard from '../components/PolaroidCard';

const { Title } = Typography;

const desktopCardWidth = 280;
const desktopCardHeight = 400;

const mobileCardWidth = 160;
const mobileCardHeight = 220;

const margin = 15;

const getRandomOffsetMobile = () => Math.floor(Math.random() * 20 - 10); 

const getRandomRotation = () => Math.floor(Math.random() * 20 - 10); 

const Instagram = () => {
  const [posts, setPosts] = useState([]);
  const [cardStyles, setCardStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch('/json/instagram.json')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar JSON');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateStylesDesktop = () => {
    return posts.map(() => {
      const top = margin + Math.random() * (window.innerHeight - desktopCardHeight - margin);
      const left = margin + Math.random() * (window.innerWidth - desktopCardWidth - margin);
      const rotate = getRandomRotation();
      return {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: `${desktopCardWidth}px`,
        height: `${desktopCardHeight}px`,
        transform: `rotate(${rotate}deg)`,
        transition: 'top 8s ease-in-out, left 8s ease-in-out, transform 8s ease-in-out',
        cursor: 'pointer',
        zIndex: 1,
      };
    });
  };

  const generateStylesMobile = () => {
    const w = mobileCardWidth;
    const h = mobileCardHeight;

    return posts.map(() => {
      const offsetTop = getRandomOffsetMobile();
      const offsetLeft = getRandomOffsetMobile();
      const rotate = getRandomRotation();

      return {
        position: 'absolute',
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        width: `${w}px`,
        height: `${h}px`,
        transform: `rotate(${rotate}deg)`,
        transition: 'top 8s ease-in-out, left 8s ease-in-out, transform 8s ease-in-out',
        cursor: 'pointer',
        zIndex: 1,
      };
    });
  };

  useEffect(() => {
    if (posts.length === 0) return;

    if (isMobile) {
      setCardStyles(generateStylesMobile());
    } else {
      setCardStyles(generateStylesDesktop());
    }

    intervalRef.current = setInterval(() => {
      if (isMobile) {
        setCardStyles(generateStylesMobile());
      } else {
        setCardStyles(generateStylesDesktop());
      }
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, [posts, isMobile]);

  if (loading) {
    return (
      <div
        style={{
          ...styles.wrapper,
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        Carregando posts...
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.titleWrapper}>
        <Title
          level={2}
          style={{
            fontFamily: 'Questrial, sans-serif',
            color: '#fff',
            marginBottom: '55px',
            fontSize: isMobile ? '22px' : '42px', 
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          No{' '}
          <span style={{ fontSize: isMobile ? '24px' : '48px', fontWeight: 'bold' }}>
            Instagram
          </span>
        </Title>
      </div>

      {isMobile ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '12px',
            width: '100%',
            padding: '0 10px',
            position: 'relative', 
            minHeight: 'calc(220px * ' + Math.ceil(posts.length / 2) + ' + 20px)',
          }}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              style={{
                position: 'relative',
                width: `${mobileCardWidth}px`,
                height: `${mobileCardHeight}px`,
                overflow: 'visible', 
              }}
            >
              <a
                href="https://www.instagram.com/advgusttavonogueira/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <PolaroidCard
                  post={post}
                  isMobile={isMobile}
                  style={cardStyles[index]}
                />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: '600px',
            overflow: 'hidden',
          }}
        >
          {posts.map((post, index) => (
            <a
              key={post.id}
              href="https://www.instagram.com/advgusttavonogueira/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <PolaroidCard
                post={post}
                isMobile={isMobile}
                style={cardStyles[index]}
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    background: '#0A203A',
    overflow: 'hidden',
    fontFamily: 'Questrial, sans-serif',
    paddingBottom: 40,
  },
  titleWrapper: {
    position: 'relative',
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: 'center',
    zIndex: 10,
  },
};

export default Instagram;

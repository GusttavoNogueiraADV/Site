import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import PolaroidCard from '../components/PolaroidCard';
const { Title } = Typography;

const posts = [
  {
    id: 1,
    src: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram-cards//card1.mp4',
    caption: '🎯 Sabia que o aviso prévio pode passar de 30 dias?',
  },
  {
    id: 2,
    src: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram-cards//card2.mp4',
    caption: 'A rescisão indireta ocorre quando o funcionário pede o desligamento do contrato de trabalho, como se estivesse “demitindo” o empregador, devido ao descumprimento de obrigações ou falhas graves que tornam o ambiente de trabalho insus.mp4',
  },
  {
    id: 3,
    src: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram-cards//card3.mp4',
    caption: '🕢💸Você sabe o que acontece com o saldo do Banco de Horas quando há uma rescisão contratual É simples, mas requer atenção. Se na rescisão o empregado tiver horas a compensar',
  },
  {
    id: 4,
    src: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram-cards//card4.jpg',
    caption: 'a Justiça já decidiu que ter tatuagem não pode ser motivo de exclusão em concursos públicos – exceto em casos muito específicos, como apologia ao crime ou preconceito.Se você foi eliminado por esse motivo, você pode recorrer!Neste',
  }, 
   {
    id: 5,
    src: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram-cards//card5.jpg',
    caption: 'Honra, coragem e princípios. Pressupostos de toda conquista.',
  },
   {
    id: 6,
    src: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram-cards//card6.mp4',
    caption: 'Vínculo empregatício com babá de bebê reborn? Pode parecer inusitado',
  },
   {
    id: 7,
    src: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram-cards//card7.jpg',
    caption: 'Veículo apreendido por erro do DETRAN? Você pode ter direito à indenização!',
  },
  {
    id: 8,
    src: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/instagram-cards//card8.mp4',
    caption: 'Você sabia que pode ter o dia e até o DSR descontados se não entregar o atestado no prazo?',
  },
];

const cardWidth = 300; 
const cardHeight = 400; 

const getRandomRotation = () => Math.floor(Math.random() * 20 - 10);

const getRandomPosition = () => {
  const maxTop = window.innerHeight - cardHeight;
  const maxLeft = window.innerWidth - cardWidth;
  const topPx = Math.random() * maxTop;
  const leftPx = Math.random() * maxLeft;

  return {
    top: topPx,
    left: leftPx,
  };
};

const Instagram = () => {
  const [cardStyles, setCardStyles] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const generated = posts.map(() => {
        const { top, left } = getRandomPosition();
        const rotate = getRandomRotation();
        return {
          top: `${top}px`,
          left: `${left}px`,
          transform: `rotate(${rotate}deg)`,
        };
      });
      setCardStyles(generated);
    };

    handleResize(); // gera posições iniciais

    window.addEventListener('resize', handleResize); // atualiza no resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.titleWrapper}>
        <Title
          level={2}
          style={{
            fontFamily: 'Questrial, sans-serif',
            color: '#fff',
            marginBottom: '55px',
            fontSize: '42px',
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          No <span style={{ fontSize: '48px', fontWeight: 'bold' }}>Instagram</span>
        </Title>
      </div>

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
            style={{ ...styles.card, ...cardStyles[index] }}
          />
        </a>
      ))}
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    background: '#0A203A',
    overflow: 'hidden',
    fontFamily: 'Questrial, sans-serif',
  },
  titleWrapper: {
    position: 'absolute',
    top: 30,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 5,
    width: '100%',
  },
  card: {
    position: 'absolute',
    cursor: 'pointer', // deixa cursor de link
  },
};

export default Instagram;

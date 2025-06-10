import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import axios from 'axios';

const { Title } = Typography;
const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const [bgUrl, setBgUrl] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_URL}/images-info`);
        console.log('Resposta da API:', response.data);  // Verificando os dados

        if (response.data && response.data.length > 0) {
          // Encontrando as imagens pelo nome correto
          const logo = response.data.find(image => image.name === 'logo');
          const background = response.data.find(image => image.name === 'background');

          console.log('Logo encontrado:', logo);
          console.log('Fundo encontrado:', background);

          // Atualizando os estados com as URLs das imagens encontradas
          if (logo) {
            setLogoUrl(logo.url);
          }
          if (background) {
            setBgUrl(background.url);
          }
        } else {
          console.error('Nenhuma imagem encontrada');
        }
      } catch (error) {
        console.error('Erro ao carregar imagens:', error.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <TopBar />

      <style>{`
        .home-section {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        @media (max-width: 1024px) {
          .home-title {
            font-size: 4.5rem !important;
          }
        }

        @media (max-width: 600px) {
          .home-section {
            padding-top: 80px !important;
            padding-bottom: 40px !important;
          }

          .home-logo {
            width: 85vw !important;
            max-width: none !important;
            margin-bottom: 16px !important;
          }

          .home-title {
            font-size: 3rem !important;
            margin-bottom: 12px !important;
            padding: 0 10px;
          }

          .home-divider {
            width: 80% !important;
            height: 2px !important;
            margin: 8px 0 20px 0 !important;
          }
        }
      `}</style>

      <section
        className="home-section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '120px 20px 60px',
          backgroundImage: bgUrl
            ? `linear-gradient(rgba(10, 32, 58, 0.8), rgba(10, 32, 58, 0.37)), url(${bgUrl})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          textAlign: 'center',
          transition: 'background-image 0.3s ease-in-out',
          overflow: 'auto',
        }}
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            className="home-logo"
            style={{ width: '80%', marginBottom: '24px' }}
          />
        )}

        <Button
          text="Fale Conosco"
          onClick={() => {
            const numero = '13992102893';
            const mensagem = encodeURIComponent('Olá, gostaria de ser atendido(a) por um profissional.');
            window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
          }}
          className="home-button"
          style={{
            borderRadius: '10px',
            padding: '20px 35px',
            backgroundColor: 'transparent',
            border: '2px solid #fff',
            color: 'white',
            fontSize: '1rem',
            fontFamily: 'Questrial, sans-serif',
            marginTop: '20px',
          }}
        />
      </section>
    </>
  );
};

export default Home;

import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import CardEquipe from '../components/CardEquipe';

const { Title } = Typography;
const API_URL = process.env.REACT_APP_API_URL;

const Equipe = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const nomes = [
          'Dr. Gusttavo Nogueira.jpg',
          'Dr. Vinicius Meneses.jpeg',
          'Dra. Juliana Andrade.jpeg',
        ];

        const responses = await Promise.all(
          nomes.map((nome) => axios.get(`${API_URL}/imagem/${nome}`))
        );

        const membros = responses.map((res, index) => {
          const nomeCompleto = nomes[index]
            .replace('.jpeg', '')
            .replace('.jpg', '')
            .replace(/-/g, ' ')
            .trim();

          return {
            nome: nomeCompleto,
            imagem: res.data.url,
          };
        });

        setMembers(membros);
      } catch (error) {
        console.error('Erro ao carregar imagens da equipe:', error);
      }
    };

    fetchImages();
  }, []);
    return (
        <section
            style={{
                backgroundColor: '#0A203A',
                padding: '80px 40px',
                textAlign: 'center',
                color: '#fff',
                minHeight: '100vh',
            }}
        >
            <Title
                level={2}
                style={{
                    fontFamily: 'Questrial, sans-serif',
                    color: '#fff',
                    marginBottom: '55px',
                    marginTop: '0',
                    fontSize: '42px',
                    fontWeight: 400,
                }}
            >
                Nossa{' '}
                <span
                    style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                    }}
                >
                    Equipe
                </span>
            </Title>


            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '60px',
                }}
            >
                {members.map((member) => (
                    <CardEquipe
                        key={member.nome}
                        nome={member.nome}
                        imagemUrl={member.imagem}
                    />
                ))}
            </div>
        </section>
    );
};

export default Equipe;

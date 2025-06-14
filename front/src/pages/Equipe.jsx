import { Typography } from 'antd';
import CardEquipe from '../components/CardEquipe';

const { Title } = Typography;

const membros = [
  {
    nome: 'Dr. Gusttavo Nogueira',
    imagem: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dr.%20Gusttavo%20Nogueira.jpg',
  },
  {
    nome: 'Dr. Vinicius Meneses',
    imagem: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dr.%20Vinicius%20Meneses.jpeg',
  },
  {
    nome: 'Dra. Juliana Andrade',
    imagem: 'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dra.%20Juliana%20Andrade.jpeg',
  },
];

const Equipe = () => {
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
        {membros.map((member) => (
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

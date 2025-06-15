import { Typography } from 'antd';
import CardEquipe from '../components/CardEquipe';
import Person from '../components/Person';
import { useState } from 'react';

const { Title } = Typography;

const membros = [
  {
    nome: 'Dr. Gusttavo Nogueira',
    imagem:
      'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dr.%20Gusttavo%20Nogueira.jpg',
  },
  {
    nome: 'Dr. Vinicius Meneses',
    imagem:
      'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dr.%20Vinicius%20Meneses.jpeg',
  },
  {
    nome: 'Dra. Juliana Andrade',
    imagem:
      'https://zxqgsxwwkfqsawhkvspn.supabase.co/storage/v1/object/public/images//Dra.%20Juliana%20Andrade.jpeg',
  },
];

const Equipe = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

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
          <div key={member.nome} onClick={() => setSelectedPerson(member.nome)} style={{ cursor: 'pointer' }}>
            <CardEquipe nome={member.nome} imagemUrl={member.imagem} />
          </div>
        ))}
      </div>

      <Person
        open={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
        personName={selectedPerson}
      />
    </section>
  );
};

export default Equipe;

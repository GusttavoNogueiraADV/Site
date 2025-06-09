const CardEquipe = ({ nome, imagemUrl }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '300px',
        height: '500px', 
        margin: '10px',
        borderRadius: '12px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 215, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-25px',
          left: '-35px',
          width: '97%',
          height: '97%',
            borderRadius: '12px',
          border: '3px solid #d4af37',
          borderRadius: '12px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          position: 'relative',
          fontFamily: 'Questrial, sans-serif',
          borderRadius: '12px',
          zIndex: 1,
          backgroundColor: '#000',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src={imagemUrl}
          alt={nome}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '12px',
            objectFit: 'cover', 
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            padding: '10px 0',
            fontWeight: 'bold',
            fontSize: '22px',
            textAlign: 'center',
          }}
        >
          {nome}
        </div>
      </div>
    </div>
  );
};

export default CardEquipe;

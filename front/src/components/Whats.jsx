import { useEffect, useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const Whats = () => {
  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: '👋 Olá! Como podemos te ajudar?', sender: 'bot' },
    { text: 'Escolha uma opção:', sender: 'bot' },
  ]);

  const options = [
    '📦 Saber sobre produtos',
    '🕒 Horário de atendimento',
    '💬 Falar com atendente',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setMessages((prev) => [
      ...prev,
      { text: option, sender: 'user' },
      { text: '✅ Obrigado! Em breve um atendente falará com você.', sender: 'bot' },
    ]);
  };

  return (
    <>
      {/* Botão flutuante */}
      <div
        style={{
          position: 'fixed',
          bottom: chatOpen ? '80px' : '20px',
          right: visible ? '20px' : '-100px',
          opacity: visible && !chatOpen ? 1 : 0,
          transform: visible && !chatOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.3s ease',
          zIndex: 1000,
        }}
      >
        <button
          onClick={toggleChat}
          style={{
            backgroundColor: '#25D366',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <FaWhatsapp size={30} color="#fff" />
        </button>
      </div>

      {/* Janela de chat */}
      <div
        style={{
          position: 'fixed',
          bottom: chatOpen ? '20px' : '-500px',
          right: '20px',
          width: '320px',
          maxWidth: '90vw',
          height: '420px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
          color: '#000',
          transition: 'bottom 0.5s ease, opacity 0.5s ease',
          opacity: chatOpen ? 1 : 0,
        }}
      >
        {/* Topo */}
        <div
          style={{
            backgroundColor: '#25D366',
            padding: '12px',
            color: '#fff',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaWhatsapp size={20} />
            <span>WhatsApp</span>
          </div>
          <FaTimes style={{ cursor: 'pointer' }} onClick={toggleChat} title="Fechar" />
        </div>

        {/* Conteúdo - Chat */}
        <div
          style={{
            flex: 1,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            overflowY: 'auto',
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#e0e0e0',
                padding: '10px 14px',
                borderRadius: '18px',
                maxWidth: '80%',
                fontSize: '14px',
                lineHeight: 1.4,
              }}
            >
              {msg.text}
            </div>
          ))}

          {/* Opções interativas - só aparecem se ainda não foi clicado */}
          {messages.length <= 2 &&
            options.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => handleOptionClick(opt)}
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#dcf8c6',
                  padding: '10px 14px',
                  borderRadius: '18px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: 1.4,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cdebb0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dcf8c6')}
              >
                {opt}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Whats;

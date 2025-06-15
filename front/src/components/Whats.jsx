import { useEffect, useState, useRef } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const finalMessages = [
  'As informações foram armazenadas e em breve entraremos em contato. Até logo!',
  'Obrigado por entrar em contato! Logo retornaremos sua mensagem.',
  'Recebemos seus dados com sucesso. Aguarde nosso retorno.',
  'Seu contato foi registrado, estaremos falando com você em breve.',
  'Informações salvas! Obrigado pelo seu tempo, logo estaremos em contato.',
];

const Whats = () => {
  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [fluxo, setFluxo] = useState(null);
  const [currentNodeKey, setCurrentNodeKey] = useState('menuPrincipal');
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [chatBlocked, setChatBlocked] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch('/json/whats.json')
      .then((res) => res.json())
      .then((data) => {
        setFluxo(data);
        setMessages([{ text: '👋 Olá! Como podemos te ajudar?', sender: 'bot' }]);
        setCurrentNodeKey('menuPrincipal');
        setChatBlocked(false);
        setSelectedOptions([]);
        setShowPhoneInput(false);
        setPhoneNumber('');
      })
      .catch(() => {
        setMessages([
          { text: '👋 Olá! Como podemos te ajudar?', sender: 'bot' },
          { text: 'Escolha uma opção:', sender: 'bot' },
        ]);
      });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showPhoneInput]);

  useEffect(() => {
    console.log('Opções selecionadas:', selectedOptions);
  }, [selectedOptions]);

  const toggleChat = () => {
    setChatOpen((prev) => {
      if (prev) {
        if (fluxo) {
          setMessages([{ text: '👋 Olá! Como podemos te ajudar?', sender: 'bot' }]);
        } else {
          setMessages([
            { text: '👋 Olá! Como podemos te ajudar?', sender: 'bot' },
            { text: 'Escolha uma opção:', sender: 'bot' },
          ]);
        }
        setCurrentNodeKey('menuPrincipal');
        setHistory([]);
        setSelectedOptions([]);
        setChatBlocked(false);
        setShowPhoneInput(false);
        setPhoneNumber('');
      }
      return !prev;
    });
  };

  const sendBotMessage = (text, cb) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text, sender: 'bot' }]);
      setIsTyping(false);
      if (cb) cb();
    }, 1200);
  };

  const handleOptionClick = (key) => {
    if (!fluxo || chatBlocked) return;

    const node = fluxo[currentNodeKey];
    const option = node.options[key];
    if (!option) return;

    setMessages((prev) => [...prev, { text: option.text, sender: 'user' }]);
    setSelectedOptions((prev) => [...prev, option.text]);

    if (option.conclusao) {
      const randomMsg = finalMessages[Math.floor(Math.random() * finalMessages.length)];

      sendBotMessage(randomMsg, () => {
        setChatBlocked(true);
        setShowPhoneInput(true);
        setCurrentNodeKey('menuPrincipal');
        setHistory([]);
      });
    } else if (option.next) {
      sendBotMessage(fluxo[option.next].label, () => {
        setHistory((prev) => [...prev, currentNodeKey]);
        setCurrentNodeKey(option.next);
      });
    }
  };

  const handleBack = () => {
    if (history.length === 0 || chatBlocked) return;

    const prevNodeKey = history[history.length - 1];
    const prevNode = fluxo[prevNodeKey];

    sendBotMessage(prevNode.label, () => {
      setCurrentNodeKey(prevNodeKey);
      setHistory((prev) => prev.slice(0, -1));
    });
  };

  const handlePhoneSubmit = async (e) => {
  e.preventDefault();
  if (!phoneNumber.trim()) return alert('Por favor, insira um número válido.');

  console.log('Número de telefone/WhatsApp enviado:', phoneNumber);

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/send-email`, {
      selectedOptions: selectedOptions,
      phoneNumber: phoneNumber,
    });

    if (response.status === 200) {
      console.log('E-mail enviado com sucesso');
      setMessages((prev) => [
        ...prev,
        { text: 'Obrigado! Entraremos em contato em breve.', sender: 'bot' },
      ]);
      setShowPhoneInput(false);
    } else {
      console.error('Erro ao enviar o e-mail');
      alert('Ocorreu um erro ao enviar o e-mail.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro de comunicação com o servidor.');
  }
};

const renderOptions = () => {
  if (!fluxo || chatBlocked) return null;

  const node = fluxo[currentNodeKey];
  if (!node) return null;

  return Object.entries(node.options).map(([key, option]) => {
    if (key === 'back') return null;
    return (
      <button
        key={key}
        onClick={() => handleOptionClick(key)}
        style={{
          alignSelf: 'flex-end',
          backgroundColor: '#25D366',
          color: '#fff',
          padding: '10px 14px',
          borderRadius: '18px',
          maxWidth: '80%',
          fontSize: '14px',
          lineHeight: 1.4,
          cursor: 'pointer',
          border: 'none',
          marginTop: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1ebe57')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
        disabled={isTyping}
      >
        {option.text}
      </button>
    );
  });
};

return (
  <>
    {/* Estilos do scroll customizados para esse componente apenas */}
    <style>
      {`
          .whats-scroll::-webkit-scrollbar {
            width: 8px !important;
          }
          .whats-scroll::-webkit-scrollbar-thumb {
            background-color: #25D366 !important;
            border-radius: 4px !important;
          }
          .whats-scroll::-webkit-scrollbar-track {
            background-color: #e5ddd5 !important;
          }
          /* Firefox */
          .whats-scroll {
            scrollbar-width: thin !important;
            scrollbar-color: #25D366 #e5ddd5 !important;
          }
        `}
    </style>

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
          cursor: chatBlocked ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        aria-label="Abrir chat WhatsApp"
        disabled={chatBlocked}
        title={chatBlocked ? 'Chat encerrado, feche para reiniciar' : 'Abrir chat WhatsApp'}
      >
        <FaWhatsapp size={30} color="#fff" />
      </button>
    </div>

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
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#000',
        transition: 'bottom 0.5s ease, opacity 0.5s ease',
        opacity: chatOpen ? 1 : 0,
      }}
      role="region"
      aria-live="polite"
      aria-label="Chat WhatsApp"
    >
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

      {/* Aqui aplicamos a classe exclusiva para o scroll */}
      <div
        className="whats-scroll"
        style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          overflowY: 'auto',
          backgroundColor: '#e5ddd5',
          borderRadius: '0 0 12px 12px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#fff',
              color: '#000',
              padding: '10px 16px',
              borderRadius: '20px',
              maxWidth: '75%',
              fontSize: '15px',
              lineHeight: 1.5,
              boxShadow:
                msg.sender === 'user'
                  ? '0 2px 6px rgba(0, 128, 0, 0.3)'
                  : '0 2px 6px rgba(0,0,0,0.1)',
              fontWeight: msg.sender === 'bot' ? '500' : '400',
              userSelect: 'none',
            }}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#fff',
              padding: '10px 16px',
              borderRadius: '20px',
              maxWidth: '75%',
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#888',
              userSelect: 'none',
            }}
          >
            Digitando...
          </div>
        )}

        {!isTyping && !chatBlocked && renderOptions()}

        {!isTyping && history.length > 0 && !chatBlocked && (
          <button
            onClick={handleBack}
            style={{
              marginTop: 10,
              padding: '10px 18px',
              fontSize: '14px',
              backgroundColor: '#fff',
              border: '2px solid #25D366',
              borderRadius: '24px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              color: '#25D366',
              fontWeight: '600',
              boxShadow: '0 4px 8px rgba(37, 211, 102, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#25D366';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(37, 211, 102, 0.6)';
              e.currentTarget.style.borderColor = '#1ebe57';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#25D366';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(37, 211, 102, 0.3)';
              e.currentTarget.style.borderColor = '#25D366';
            }}
          >
            ← Voltar
          </button>
        )}


        {showPhoneInput && !isTyping && (
          <form onSubmit={handlePhoneSubmit} style={{ marginTop: 12, alignSelf: 'flex-start', width: '100%' }}>
            <label htmlFor="phone" style={{ fontSize: '14px', marginBottom: 4, display: 'block' }}>
              Favor nos envie seu WhatsApp ou número de telefone:
            </label>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="(xx) xxxxx-xxxx"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginBottom: 6,
                boxSizing: 'border-box',
              }}
              disabled={isTyping}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#25D366',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '18px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                width: '100%',
              }}
              disabled={isTyping}
            >
              Enviar
            </button>
          </form>
        )}

        <div ref={scrollRef} />
      </div>
    </div>
  </>
);
};

export default Whats;

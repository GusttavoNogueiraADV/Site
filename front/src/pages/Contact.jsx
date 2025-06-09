// src/pages/Contact.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import Cookies from './Cookies';
import Politics from './Politics';
import About from './About';


const { Title } = Typography;
const API_URL = process.env.REACT_APP_API_URL;

const Contact = ({ onShowDesk }) => {
    const [bgUrl, setBgUrl] = useState('');
    const [logotipoUrl, setLogoTipoUrl] = useState('');
    const [isCookiesModalOpen, setIsCookiesModalOpen] = useState(false);
    const [isPoliticsModalOpen, setIsPoliticsModalOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [iframeHeight, setIframeHeight] = useState('90vh');
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [aboutType, setAboutType] = useState('missao');


    useEffect(() => {
        const updateIframeHeight = () => {
            if (window.innerWidth <= 768) {
                setIframeHeight('60vh'); // altura menor no mobile
            } else {
                setIframeHeight('90vh'); // altura maior no desktop
            }
        };
        updateIframeHeight();
        window.addEventListener('resize', updateIframeHeight);
        return () => window.removeEventListener('resize', updateIframeHeight);
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const [bgRes, logoRes] = await Promise.all([
                    axios.get(`${API_URL}/imagem/fundo.jpg`),
                    axios.get(`${API_URL}/imagem/Logotipo.png`)
                ]);
                setBgUrl(bgRes.data.url);
                setLogoTipoUrl(logoRes.data.url);
            } catch (error) {
                console.error('Erro ao carregar imagens de contato:', error);
            }
        };
        fetchImages();
    }, []);

    const openPoliticsModal = (policy) => {
        setSelectedPolicy(policy);
        setIsPoliticsModalOpen(true);
    };

    const openAbout = (tipo) => {
        setAboutType(tipo);
        setIsAboutModalOpen(true);
    };


    const sectionFlexStyle = {
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '100%',
        width: '100%',
    };

    return (
        <>
            <section
                style={{
                    height: '70vh',
                    backgroundImage: bgUrl
                        ? `linear-gradient(rgba(10, 32, 58, 0.8), rgba(10, 32, 58, 0.37)), url(${bgUrl})`
                        : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 20px',
                    boxSizing: 'border-box',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        ...sectionFlexStyle,
                        flexDirection: 'row',
                        color: '#fff',
                        fontFamily: 'Questrial, sans-serif',
                        fontSize: '1.5rem',
                        fontWeight: '500',
                    }}
                    className="contact-main-container"
                >
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: '40px',
                            boxSizing: 'border-box',
                            position: 'relative',
                            height: '100%',
                        }}
                        className="contact-left"
                    >
                        <Title
                            level={2}
                            style={{
                                fontFamily: 'Questrial, sans-serif',
                                color: '#fff',
                                marginBottom: '0',
                                fontSize: '42px',
                                fontWeight: 400,
                                textAlign: 'center',
                                lineHeight: 1.1,
                                zIndex: 2,
                            }}
                        >
                            Fale{' '}
                            <span style={{ fontSize: '48px', fontWeight: 'bold' }}>
                                Conosco
                            </span>
                        </Title>

                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: 0,
                                width: '2px',
                                height: '70%',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                transform: 'translateY(-50%)',
                                zIndex: 1,
                            }}
                            className="vertical-line"
                        />
                    </div>

                    <div
                        style={{
                            flex: 2.5,
                            paddingLeft: '40px',
                            boxSizing: 'border-box',
                            lineHeight: '1.8',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                        className="contact-right"
                    >
                        <p><strong>Telefone :</strong> (13) 98875-4509</p>
                        <p><strong>Email :</strong> advgusttavonogueira@gmail.com</p>
                        <p><strong>Endereço :</strong> Av. Santos Dumont, n.1.331, sala 02, Guarujá/SP</p>
                    </div>
                </div>
            </section>

            <section
                style={{
                    backgroundColor: '#123359',
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontFamily: 'Questrial, sans-serif',
                    padding: '30px 20px',
                    boxSizing: 'border-box',
                    minHeight: '220px',
                }}
            >
                <div
                    style={{
                        ...sectionFlexStyle,
                        flexDirection: 'row',
                    }}
                    className="blue-section-container"
                >
                    <div
                        style={{
                            flex: 1,
                            paddingRight: '40px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            height: '100%',
                        }}
                        className="blue-left"
                    >
                        <img
                            src={logotipoUrl}
                            alt="Logo"
                            style={{ width: '180px', marginBottom: '12px' }}
                        />
                        <p
                            style={{
                                fontWeight: '500',
                                textAlign: 'left',
                                maxWidth: '180px',
                                lineHeight: 1.3,
                                fontSize: '0.7rem',
                            }}
                        >
                            Não trabalhamos com processos.
                            <br />
                            Trabalhamos com pessoas.
                        </p>

                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: 0,
                                width: '2px',
                                height: '100%',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                transform: 'translateY(-50%)',
                                zIndex: 1,
                            }}
                            className="line"
                        />
                    </div>

                    <div
                        style={{
                            flex: 2.5,
                            display: 'flex',
                            gap: '40px',
                            justifyContent: 'space-between',
                            paddingLeft: '40px',
                            boxSizing: 'border-box',
                            fontSize: '0.95rem',
                        }}
                        className="blue-right"
                    >
                        <div>
                            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Políticas</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.4 }}>
                                <li onClick={() => openPoliticsModal('privacidade')} style={{ cursor: 'pointer', textDecoration: 'underline', textDecoration: 'none' }}>
                                    Privacidade
                                </li>
                                <li onClick={() => openPoliticsModal('termos')} style={{ cursor: 'pointer', textDecoration: 'underline', textDecoration: 'none' }}>
                                    Termos de Uso
                                </li>
                                <li
                                    style={{ textDecoration: 'underline', cursor: 'pointer', textDecoration: 'none' }}
                                    onClick={() => setIsCookiesModalOpen(true)}
                                >
                                    Cookies
                                </li>
                            </ul>

                        </div>

                        <div>
                            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Sobre</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.4 }}>
                                <li
                                    style={{ cursor: 'pointer', color: '#FEDC96', textDecoration: 'underline', textDecoration: 'none', color: '#fff' }}
                                    onClick={() => openAbout('equipe')}
                                >
                                    Equipe
                                </li>
                                <li
                                    style={{ cursor: 'pointer', color: '#FEDC96', textDecoration: 'underline', textDecoration: 'none', color: '#fff' }}
                                    onClick={() => openAbout('missao')}
                                >
                                    Missão
                                </li>
                                <li
                                    style={{ cursor: 'pointer', color: '#FEDC96', textDecoration: 'underline', textDecoration: 'none', color: '#fff' }}
                                    onClick={() => {
                                        if (onShowDesk) onShowDesk();
                                    }}
                                >
                                    Valores
                                </li>
                            </ul>
                        </div>

                        <div>
                            <iframe
                                title="Localização"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.716848876934!2d-46.20516238448599!3d-23.9979142675612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cefaed9dfe5e09%3A0xd0c96579be3e1c1b!2sAv.%20Santos%20Dumont%2C%201331%20-%20S%C3%ADtio%20Paecara%2C%20Guaruj%C3%A1%20-%20SP%2C%2011460-003!5e0!3m2!1spt-BR!2sbr!4v1686595340000!5m2!1spt-BR!2sbr"
                                width="180"
                                height="140"
                                style={{ border: 0, borderRadius: '8px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <footer
                style={{
                    backgroundColor: '#d4af37',
                    color: '#0A203A',
                    padding: '12px 16px',
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: 'center',
                    fontFamily: 'Questrial, sans-serif',
                }}
            >
                © 2025 - Desenvolvido com por{' '}
                <a
                    href="https://wa.me/13974085309"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontWeight: 'bold',
                        color: '#0A203A',
                        textDecoration: 'none',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Victor Lima
                </a>
            </footer>
            <Cookies
                open={isCookiesModalOpen}
                onCancel={() => setIsCookiesModalOpen(false)}
                closeIcon={<CloseCircleOutlined style={{ fontSize: 28, color: '#ff4d4f' }} />}
            />

            <Politics
                policy={selectedPolicy}
                iframeHeight={iframeHeight}
                open={isPoliticsModalOpen}
                onCancel={() => setIsPoliticsModalOpen(false)}
                closeIcon={<CloseCircleOutlined style={{ fontSize: 28, color: '#ff4d4f' }} />}
            />


            <About
                open={isAboutModalOpen}
                onClose={() => setIsAboutModalOpen(false)}
                type={aboutType}
            />



            <style>{`
        @media (max-width: 768px) {
          .contact-main-container {
            flex-direction: column !important;
            font-size: 1.2rem !important;
          }
          .contact-left {
            padding-right: 0 !important;
            padding-bottom: 20px;
            height: auto !important;
          }
          .contact-right {
            padding-left: 0 !important;
            font-size: 1rem !important;
          }
          .contact-left .vertical-line {
            display: none !important;
          }

          .blue-section-container {
            flex-direction: column !important;
            font-size: 1rem !important;
            min-height: auto !important;
          }
          .blue-left {
            padding-right: 0 !important;
            margin-bottom: 25px;
            height: auto !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .blue-left div.vertical-line {
            display: none !important;
          }
          .blue-right {
            flex-direction: column !important;
            gap: 20px !important;
            padding-left: 0 !important;
            font-size: 0.9rem !important;
          }
          .blue-right > div {
            max-width: 100% !important;
          }
          .blue-right iframe {
            width: 100% !important;
            height: 200px !important;
          }
          .line {
            display: none !important;
          }
        }
      `}</style>
        </>
    );
};

export default Contact;

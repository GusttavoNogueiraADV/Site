import React from 'react';
import { Modal, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Cookies = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={650}
      centered
      closeIcon={<CloseCircleOutlined style={{ fontSize: 28, color: '#ff4d4f' }} />}
      bodyStyle={{
        fontFamily: 'Questrial, sans-serif',
        color: '#333', // texto cinza escuro
        padding: 24,
        lineHeight: 1.6,
        backgroundColor: '#fff', // fundo branco
      }}
      destroyOnClose
      getContainer={false}
    >
      <div>
        <Title level={2} style={{ color: '#d4af37', marginBottom: 20, fontWeight: 'bold' }}>
          Política de Cookies
        </Title>
        <Paragraph>
          Utilizamos cookies para melhorar a sua experiência em nosso site. Cookies são pequenos arquivos de texto que são armazenados no seu navegador.
        </Paragraph>
        <Paragraph>
          Eles nos ajudam a entender como você utiliza o site, permitindo personalizar conteúdos e anúncios, oferecer funcionalidades de redes sociais e analisar nosso tráfego.
        </Paragraph>
        <Paragraph>
          Você pode controlar e/ou excluir cookies como desejar. Para mais detalhes, consulte as configurações do seu navegador.
        </Paragraph>
      </div>
    </Modal>
  );
};

export default Cookies;

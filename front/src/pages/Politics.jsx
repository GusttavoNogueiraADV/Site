import React from 'react';
import { Modal } from 'antd';

const Politics = ({ open, onCancel, closeIcon, policy, iframeHeight }) => {
  const pdfPrivacidade = '/files/politica_de_privacidade.pdf';
  const pdfTermosUso = '/files/termos_de_uso.pdf';

  let src = '';

  if (policy === 'privacidade') {
    src = pdfPrivacidade;
  } else if (policy === 'termos') {
    src = pdfTermosUso;
  }

  if (!src) return null;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={closeIcon}
      centered
      width="90vw"
      style={{ maxWidth: 650 }}
      bodyStyle={{ padding: 0, height: iframeHeight }}
      getContainer={false}
    >
      <iframe
        src={src}
        title={policy === 'privacidade' ? 'Política de Privacidade' : 'Termos de Uso'}
        style={{ width: '100%', height: '100%', border: 'none', boxSizing: 'border-box' }}
      />
    </Modal>
  );
};

export default Politics;

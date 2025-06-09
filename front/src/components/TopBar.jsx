import { Row, Col } from 'antd';

const TopBar = () => {
  return (
    <div
      style={{
        backgroundColor: '#d4af37',
        color: '#0A203A', 
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
      }}
    >
      <Row justify="start" align="middle">
        <Col>
          (13) 98875-4509 | advgusttavonogueira@gmail.com
        </Col>
      </Row>
    </div>
  );
};

export default TopBar;

import React, { useState } from 'react';
import PurchaseDeviceForm from './PurchaseDeviceForm';
import { useNavigate } from 'react-router-dom';
import { SeeMore } from '../../components';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { purchaseDevice } from '../../api';
import Loader from '../../components/loader';

function PurchaseDevice() {
  const { t } = useTranslation('PurchaseDevice');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    try {
      setLoading(true);
      const response = await purchaseDevice(form);
      console.log(`Received response: ${response.data}`);
      navigate('/submitted');
    } catch (error) {
      setLoading(false);
      console.log('handleSubmit error');
      console.log(error);
    }
  };

  return (
    <section className="content-section">
      <Container>
        <Row className="justify-content-center">
          <Col className="form-col">
            <div className="form-holder">
              <h2 className="form-title">{t('Title')}</h2>
              <PurchaseDeviceForm onSubmit={handleSubmit} />
              <Loader visible={loading} />
            </div>
          </Col>
          <SeeMore title={t('SeeMore.Title')} text={t('SeeMore.Text')} />
        </Row>
      </Container>
    </section>
  );
}

export default PurchaseDevice;

import Progress from '@paljs/ui/ProgressBar';
import { Status } from '@paljs/ui/types';
import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui/Card';
import { Actions } from '@paljs/ui/Actions';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
// import SEO from '../../components/SEO';
import UserRating from '../components/UserRatingForm/UserRating'

export default function StudentList() {
  const [value, setValue] = useState(25);
  const [status, setStatus] = useState<Status>('Danger');

  useEffect(() => {
    if (value <= 25) {
      setStatus('Danger');
    } else if (value <= 50) {
      setStatus('Warning');
    } else if (value <= 75) {
      setStatus('Info');
    } else {
      setStatus('Success');
    }
  }, [value]);

  const setProgressValue = (newValue: number) => {
    setValue(Math.min(Math.max(newValue, 0), 100));
  };

  return (
    <>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <UserRating />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

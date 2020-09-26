import { Card, CardBody } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Application from '../components/MentorList/Application'

export default function MentorList() {

  return (
    <>
      {/* <SEO title="Progress" keywords={['OAH', 'application', 'react']} /> */}
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <Application />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

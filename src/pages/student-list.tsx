import { Card, CardBody } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import styled from 'styled-components';
import React from 'react';
// import SEO from '../../components/SEO';
import Students from '../components/StudentList/Application'
import useApplicationData from "../hooks/useApplicationData";

export default function StudentList() {
  const { state, setSelectedUser } = useApplicationData();

  const students = state.student_points;
  return (
    <>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <Students 
                students={students}
                setSelectedUser={setSelectedUser}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

import { Card, CardBody } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Application from '../components/MentorList/Application'
import useApplicationData from '../hooks/useApplicationData'


export default function MentorList() {
  
  const { state } = useApplicationData()
  console.log("state in mentor-list: ", state);
  
  // const getUserByID = (state: any, userID: number) => {
  //   let userObj = {};
  //   if (!userID) {
  //     return userID;
  //   }
  //   console.log("state in mentor-list: ", state);
    
  //   const student = user;
  //   const userer = state.users[user.userer];
  //   userObj.student = student;
  //   userObj.userer = userer;
  //   return userObj;
  // };
  
  // getUser(state, user)
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

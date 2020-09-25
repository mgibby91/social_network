import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";

// interface IUserInfo {
//   user: IUser;
// }

// interface IUser {
//   active: boolean;
//   avatar: string;
//   dob: Date;
//   id: number;
//   is_mentor: boolean;
//   is_student: boolean;
//   location: string;
//   user_id: number;
// }

function UserInfo(props) {
  console.log("userInfo", props);
  return (
    <Row>
      <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <img src={props.avatar} />
      </Col>
      <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
        <div>
          <p>{props.is_mentor ? "Mentor" : ""}</p>
          <p>{props.is_student ? "Student" : ""}</p>
          <p>{props.username}</p>
          <p>{props.location}</p>
        </div>
      </Col>
      <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}></Col>
    </Row>
  );
}

export default UserInfo;

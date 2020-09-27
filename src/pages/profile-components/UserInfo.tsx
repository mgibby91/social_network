import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Progress from "@paljs/ui/ProgressBar";
import axios from "axios";
import { constants } from "buffer";
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
  return (
    <Row>
      <h1>{props.username}</h1>

      <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <img src={props.avatar} alt="avatar" />
      </Col>
      <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}></Col>
      <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}></Col>
    </Row>
  );
}

export default UserInfo;

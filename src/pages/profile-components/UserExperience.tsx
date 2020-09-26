import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Progress from "@paljs/ui/ProgressBar";
import axios from "axios";
import { constants } from "buffer";

function Experience(props) {
  const loop = props.mentor.map((person) => {
    console.log(person);
  });
  return (
    <Row>
      <h4>Mentor Level</h4>
      {/* {props.mentor} */}
      <p>{props.location}</p>
    </Row>
  );
}

export default Experience;

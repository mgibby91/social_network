import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import CommentList from "../components/Comments/CommentList";
import useApplicationData from "../hooks/useApplicationData";

interface IProps {
	value: object,
	submitPost: (username: string) => void,
	username: "string",
	onChange: void;
}

export default function Comments() {
  const { state } = useApplicationData();

  const comments = state.comments;
	
  return (
    <>
      <Row>
        {/* <Col breakPoint={{ xs: 12 }}> */}
              <CommentList 
                comments={comments}
                // setSelectedUser={setSelectedUser}
              />
        {/* </Col> */}
      </Row>
    </>
  );
}

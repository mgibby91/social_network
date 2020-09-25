import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Tabs, Tab } from "@paljs/ui/Tabs";
import Col from "@paljs/ui/Col";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";

function Post() {
  return (
    <Col breakPoint={{ xs: 12, md: 6 }}>
      <Card accent="Info">
        <CardHeader>Card with accent</CardHeader>
        <CardBody>Hello Card component this body of card</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    </Col>
  );
}

export default Post;

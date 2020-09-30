import React from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Link } from "@reach/router";
import { Button } from "@paljs/ui/Button";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { getStack } from '../../helpers/profileHelpers';

export default function MentorListItem(props) {


  console.log("props in mentor item: ", props.userId, props.mentor_stack);
  
  const mentor_stack = getStack(props.mentor_stack, props.userId);
  console.log("mentor stack in item: ", mentor_stack);
  
  console.log("mentor stack in list item: ", mentor_stack);
    

  return (
    <div>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <Link 
                to={`/messages/`}
                state={{username: props.username}}  
              >
              </Link>
              <Link to={`/user-profiles/${props.username}`}>
                <h2>{props.username}</h2>
                <img src={props.avatar} alt="avatar"></img>
                  </Link>
                <div>
                {props.active ? 
                  <h6>User is online</h6>
                  : <h6>User is offline</h6>}
                </div>
                  {/* <ul>
                    {mentor_stack.map((tech_stack) => {
                      console.log("in stack: ", tech_stack);
                      
                      return <li>{tech_stack}</li>;
                    })}
                  </ul> */}
                  <Button>Message User</Button>
                <div>
                  <ProgressBar experience={props.experience} />
                </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

import React from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Link } from "@reach/router";
import { Button } from "@paljs/ui/Button";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { getStack } from '../../helpers/profileHelpers';

export default function MentorListItem(props) {
  
  const stack = props.mentor_stack.map((stack, index) => {
    if (stack.user_id === props.userId) {
      return <li key={index}>{stack.name}</li>
    }

  })
      
  return (
    <div>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <Link to={`/user-profiles/${props.username}`}>
                <h2>{props.username}</h2>
                <img src={props.avatar} alt="avatar"></img>
                  </Link>
                <div>
                {props.active ? 
                  <h6>User is online</h6>
                  : <h6>User is offline</h6>}
                </div>
                <Link 
                  to={`/messages/`}
                  state={{username: props.username}}  
                  >
                  <Button>Message User</Button>
                </Link>
                <ul> Mentor Stack:
                  {stack}
                </ul>
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

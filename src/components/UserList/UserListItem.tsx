import React from "react";
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Button } from "@paljs/ui/Button";
import { Link } from "@reach/router";

export default function UserListItem(props) {	
	const stack = props.mentor_stack.map((stack, index) => {
		// console.log("user id in stack: ", stack.user_id);
		// console.log("user id in props: ", props.userId);
		
    if (stack.user_id === props.userId) {
			console.log("stack name: ", stack.name);
			
      return <li key={index}>{stack.name}</li>
    }
	})
	console.log("props stack: ", stack);
	
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
							{props.mentor_stack !== null ?
							<ul>
                  {stack}
							</ul>
							: ""     

							} 
							{props.mentorExperience ? 
								<h4>Mentor Level</h4>
							: ""}
							{props.mentorExperience ? 
								<ProgressBar 
									experience={Number(props.mentorExperience)}
								/>
							: ""}
							{props.studentExperience ? 
								<h4>Student Level</h4>
							: ""}
							{props.studentExperience ? 
								<ProgressBar
									experience={Number(props.studentExperience)}
								/>
							: ""}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
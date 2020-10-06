import React from "react";
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Button } from "@paljs/ui/Button";
import { Link } from "@reach/router";
import "../Posts/PostListItem.scss";
const classNames = require("class-names");

const postBody = classNames("post_body");
const userLink = classNames("post_body__item-user_link");
const messageButton = classNames("post_body__item-message_button");
const userCard = classNames("post_body__item-user_card");
const circle = classNames("post_body__item-circle");
const inline = classNames("post_body__item-inline");
const list = classNames("post_body__item-list")

export default function UserListItem(props) {	
	const stack = props.mentor_stack.map((stack, index) => {
    if (stack.user_id === props.userId) {
			console.log("stack name: ", stack.name);
			
      return <li className="list" key={index}>{stack.name}&nbsp;</li>
    }
	})
	console.log("props stack: ", stack);
	
  return (
    <div>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody className="post-body">
              {/* USERS DETAILS */}
              <Link
                className="user-link"
                to={`/user-profiles/${props.username}`}
              >
                <div className="inline">
                  <div className="circle">
                    <img src={props.avatar} alt="avatar"></img>
                  </div>

                  <div className="user-card">
                    <h3>{props.username}</h3>
                    <span>
                      {props.active ? (
                        <h6>User is online</h6>
                      ) : (
                        <h6>User is offline</h6>
                      )}
                    </span>
                  </div>
                </div>
              </Link>

              {/* MESSAGE BUTTON */}
              <div className="message-button">
                <Link
                  to={`/messages/`}
                  state={{ username: props.username }}
                >
                      <div className="blue-button button-transition">Message User</div>
                </Link>
              </div>
              {/* POST STACK LIST */}
              <h5 className="stack">Stack:</h5>
              <ul>{stack}</ul>
              {/* EXPERIENCE BARS */}
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
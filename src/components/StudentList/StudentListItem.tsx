import React from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Link } from "@reach/router";
import { Button } from "@paljs/ui/Button";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { getStack } from '../../helpers/profileHelpers';
import "../Posts/PostListItem.scss";
const classNames = require("class-names");

export default function MentorListItem(props) {
  
  // const stack = props.mentor_stack.map((stack, index) => {
  //   if (stack.user_id === props.userId) {
  //     return <li key={index}>{stack.name}</li>
  //   }
  // })
      
  const postBody = classNames("post_body");
  const userLink = classNames("post_body__item-user_link");
  const messageButton = classNames("post_body__item-message_button");
  const userCard = classNames("post_body__item-user_card");
  const circle = classNames("post_body__item-circle");
  const inline = classNames("post_body__item-inline");

  return (
    <div>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody className={postBody}>
              {/* USERS DETAILS */}
              <Link
                className={userLink}
                to={`/user-profiles/${props.username}`}
              >
                <div className={inline}>
                  <div className={circle}>
                    <img src={props.avatar} alt="avatar"></img>
                  </div>

                  <div className={userCard}>
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
              <div className={messageButton}>
                <Link
                  to={`/messages/`}
                  state={{ username: props.username }}
                >
                  <Button>Message User</Button>
                </Link>
              </div>

              {/* POST STACK LIST */}
              {/* <h5>Stack: {stack}</h5> */}
              
              {/* EXPERIENCE BAR */}
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

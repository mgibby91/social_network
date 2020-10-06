import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function Experience(props) {
  // console.log("props in experience: ", props);

  if (!props.user) return {};
  console.log("user in experience: ", props.user.studentrating);

  return (
    <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
      <div className="profile-progress">
        <div className="mentor-progress">
          <div>{props.user.mentorrating ? <p>Mentor Level</p> : ""}</div>
          <div>
            {props.user.mentorrating ? (
              <ProgressBar experience={Number(props.user.mentorrating)} />
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="student-progress">
          <div>{props.user.studentrating ? <p>Student Level</p> : ""}</div>
          <div></div>
          {props.user.studentrating ? (
            <ProgressBar experience={Number(props.user.studentrating)} />
          ) : (
            ""
          )}
        </div>
      </div>
    </Col>
  );
}

export default Experience;

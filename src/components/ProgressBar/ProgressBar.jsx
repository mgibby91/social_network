import React from "react";
import "./ProgressBar.scss";
const classNames = require("class-names");
const ProgressBar = (props) => {
  let { experience } = props;

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  let level = 1;
  let experiencePoints = 0;
  let width;
  let fullExperience;
  function calculateLevel(points) {
    if (points < 10) {
      fullExperience = 10;
      width = 10 * points;
      return fullExperience, width, (experiencePoints += points);
    }
    if (points < 26) {
      level = 2;
      fullExperience = 16;
      width = ((points - 10) * 100) / 16;
      experiencePoints += points - 10;
      return fullExperience, width, level, experiencePoints;
    }
    if (points < 52) {
      level = 3;
      fullExperience = 26;
      width = ((points - 26) * 100) / 26;
      experiencePoints += points - 26;
      return fullExperience, width, level, experiencePoints;
    }
    if (points < 100) {
      level = 4;
      fullExperience = 48;
      width = ((points - 52) * 100) / 48;
      experiencePoints += points - 52;
      return fullExperience, width, level, experiencePoints;
    }
    if (points < 168) {
      level = 5;
      fullExperience = 68;
      width = ((points - 100) * 100) / 68;
      experiencePoints += points - 100;
      return fullExperience, width, level, experiencePoints;
    }
    if (points >= 168) {
      level = "MAX";
      width = 100;
      fullExperience = 68;
      experiencePoints = 68;
      return fullExperience, width, level, experiencePoints;
    }
  }

  calculateLevel(experience * 5);

  const fillerStyles = {
    height: "100%",
    width: `${width}%`,
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div className="progress-bars">
      <div className="container-styles">
        <div style={fillerStyles} className="bg-color">
          <span class="label-styles">{`${experiencePoints}/${fullExperience}`}</span>
        </div>
      </div>
      <span>Level {level}</span>
    </div>
  );
};

export default ProgressBar;

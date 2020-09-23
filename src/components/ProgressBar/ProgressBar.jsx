import React from "react";
import Button from '../../components/Button'
const ProgressBar = (props) => {
  let { bgcolor, points } = props;

  const containerStyles = {
    height: 20,
    width: '90%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50
  }

  
  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }
  
  function add() {
    props
    .addPoints(points)
    .catch((err) => console.log("error: ", err));
  }
  
  let level = 1;
  let experiencePoints = 0;
  let width;
  let fullpoints
  function calculateLevel(points) {
    if (points < 10) {
      fullpoints = 10;
      width = (10 * points);
      return (fullpoints, width, experiencePoints += points);
    }
    if (points < 26) {
      level = 2;
      fullpoints = 16;
      width = ((points - 10) * 100 / 16)
      experiencePoints += points - 10
      return (fullpoints, width, level, experiencePoints)
    } 
    if (points < 52) {
      level = 3;
      fullpoints = 26;
      width = (((points - 26) * 100) / 26)
      experiencePoints += points - 26
      return (fullpoints, width, level, experiencePoints)
    }
    if (points < 100) {
      level = 4;
      fullpoints = 48;
      width = (((points - 52) * 100) / 48)
      experiencePoints += points - 52
      return (fullpoints, width, level, experiencePoints)
    }
    if (points < 168) {
      level = 5;
      fullpoints = 68;
      width = (((points - 100) * 100) / 68)
      experiencePoints += points - 100
      return (fullpoints, width, level, experiencePoints)
    }
    if (points >= 168) {
      level = 'MAX';
      width = 100;
      fullpoints = 168
      experiencePoints = 168;
      return (fullpoints, width, level, experiencePoints)
    }

  }
  
  calculateLevel(points)
  
  const fillerStyles = {
    height: '100%',
    width: `${width}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  console.log("points: ", points);
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${experiencePoints}/${fullpoints}`}</span>
      </div>
    <span>Level {level}</span>
        <Button onClick={add}>add xp</Button>
    </div>
  );
};

export default ProgressBar;
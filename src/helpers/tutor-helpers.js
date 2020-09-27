

export function sortFilterAllTutorData(tutorData, loggedInUserID) {

  const userTutorData = tutorData.filter(session => {
    return session.mentor_id === loggedInUserID || session.student_id === loggedInUserID;
  });;

  const pendingData = userTutorData.filter(data => data.status === 'pending').sort((a, b) => {
    return new Date(b.date_initiated) - new Date(a.date_initiated);
  });
  const progressData = userTutorData.filter(data => data.status === 'in-progress').sort((a, b) => {
    return new Date(b.date_accepted) - new Date(a.date_accepted);
  });
  const completedData = userTutorData.filter(data => data.status === 'completed').sort((a, b) => {
    return new Date(b.date_completed) - new Date(a.date_completed);
  });

  return [...pendingData, ...progressData, ...completedData];
}

export function getDateStatus(props) {
  let dateStatus;

  if (props.dateCompleted) dateStatus = 'Completed';
  else if (props.dateAccepted) dateStatus = 'Accepted';
  else dateStatus = 'Initiated';

  return dateStatus;
}

export function getTimeAgo(props) {
  let currentDate;

  if (props.dateCompleted) currentDate = props.dateCompleted;
  else if (props.dateAccepted) currentDate = props.dateAccepted;
  else currentDate = props.dateInitiated;

  return currentDate;

}

export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export function getMentorUsername(props) {
  let mentorUsername;

  for (let user of props.currentUserData) {
    if (user.id === props.mentorID) {
      mentorUsername = user.username;
    }
  }

  return mentorUsername;
}

export function getStudentUsername(props) {
  let studentUsername;

  for (let user of props.currentUserData) {
    if (user.id === props.studentID) {
      studentUsername = user.username;
    }
  }

  return studentUsername;
}
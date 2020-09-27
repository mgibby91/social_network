

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
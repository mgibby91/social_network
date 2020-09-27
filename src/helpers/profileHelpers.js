export default function getUser(users, senderId) {
  console.log("sender id", senderId);
  let specificUser = {};
  for (let user of users) {
    for (let key in user) {
      console.log(user["id"], user);
      if (user["id"] === parseInt(senderId)) {
        specificUser = user;
      }
    }
  }
  return specificUser;
}

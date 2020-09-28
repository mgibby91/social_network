export function getUser(users, senderId) {
  //console.log("sender id", senderId);
  let specificUser = {};
  for (let user of users) {
    for (let key in user) {
      // console.log(user["id"], user);
      if (user["id"] === parseInt(senderId)) {
        console.log("HELLO");
        specificUser = user;
        break;
      }
    }
  }
  return specificUser;
}

export function getUserPosts(posts, senderId) {
  let postsByUser = posts.filter((post) => {
    return post.id === parseInt(senderId, 10);
  });

  return postsByUser;
}

export function getStack(stack, senderId) {
  let currentStack = stack.filter((lang) => {
    return lang.user_id === parseInt(senderId, 10);
  });
  // console.log("stack", currentStack);
  return currentStack;
}

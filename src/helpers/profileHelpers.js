export function getUser(users, senderId) {
  //console.log("sender id", senderId);
  let specificUser = {};
  for (let user of users) {
    for (let key in user) {
      // console.log(user["id"], user);
      if (user["id"] === parseInt(senderId)) {
        specificUser = user;
        break;
      }
    }
  }
  return specificUser;
}

export function getUserPosts(posts, senderId) {
  console.log("in here!!!", posts);
  const seen = new Set();
  const postsByUser = posts
    .filter((post) => {
      return post.owner_id === parseInt(senderId, 10);
    })
    .filter((el) => {
      const duplicate = seen.has(el.text_body);
      seen.add(el.text_body);
      return !duplicate;
    });

  console.log("from helper", postsByUser);
  //go through the posts and posts by user
  for (let post of postsByUser) {
    post["stack"] = [];

    for (let stack of posts) {
      if (post["post_id"] === stack["post_id"]) {
        post["stack"].push(stack["name"]);
      }
    }
  }

  return postsByUser;
}

export function getDashboardPosts(posts) {
  console.log("in here!!!", posts);
  const seen = new Set();
  const postsByUser = posts.filter((el) => {
    const duplicate = seen.has(el.time_posted);
    seen.add(el.time_posted);
    return !duplicate;
  });

  console.log("from helper", postsByUser);
  for (let post of postsByUser) {
    post["stack"] = [];

    for (let stack of posts) {
      if (post["post_id"] === stack["post_id"]) {
        post["stack"].push(stack["name"]);
      }
    }
  }

  return postsByUser;
}

export function getStack(stack, senderId) {
  let currentStack = stack.filter((lang) => {
    return lang.user_id === parseInt(senderId, 10);
  });
  // console.log("stack", currentStack);
  return currentStack;
}

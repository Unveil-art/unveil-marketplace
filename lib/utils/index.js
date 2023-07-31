export const getUserName = (user) => {
  if (user?.firstName && user?.lastName) {
    return user.firstName + " " + user.lastName;
  } else if (user?.firstName) {
    return user.firstName;
  } else if (user?.email) {
    return user.email;
  } else {
    return "Unveil User";
  }
};

export const isVideo = (url) => {
  return url.match(/\.(mp4|webm|mov|mkv|avi)$/) != null;
};

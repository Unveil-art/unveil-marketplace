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
  return url?.match(/\.(mp4|webm|mov|mkv|avi)$/) != null;
}

export const formatDate = (dateString) => {
  const createdAt = new Date(dateString);
  const month = createdAt.toLocaleString("default", { month: "long" });
  const date = createdAt.getDate();
  const year = createdAt.getFullYear();
  const day = createdAt.toLocaleString("default", { weekday: "long" });

  return {
    month,
    date,
    year,
    day,
  };
};

export const extractDate = (date) => {
  const arr = date.split("-");
  return arr[1] + "-" + arr[0] + "-" + arr[2];
};

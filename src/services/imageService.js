export const imageSize = {
  SMALL: "50x50c",
  MEDIUM: "300x300",
  LARGE: "600x450",
};

export const getImageUrl = (id, size) => {
  return `https://images.craigslist.org/${id}_${size}.jpg`;
};

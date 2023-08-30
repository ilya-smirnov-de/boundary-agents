const getQFromLink = (url) => {
  const ret = url.split("/Q").pop();
  return ret;
};
export default getQFromLink;

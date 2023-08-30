const addLang = (url) => {
  const lang = "?&lang=" + localStorage.getItem("lang") || "de";
  return (url += lang);
};
export default addLang;

const accessToken = localStorage.getItem("accessToken");
const Url = "https://mynextfilm.ai";
// const Url = "http://115.245.192.138"
const config = { headers: { Authorization: `Bearer ${accessToken}` } };
// https://mynextfilm.com
export { config, Url, accessToken };

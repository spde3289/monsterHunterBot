const axios = require("axios");

const getData = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
    return error
  }
};

module.exports = getData;

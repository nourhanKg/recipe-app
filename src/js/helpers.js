// import { async } from "regenerator-runtime";
import { TIMEOUT } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function(url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT)]);
    const data = await response.json();
    // console.log(response, data);
    if(!response.ok) throw new Error(`${data.message}, ${response.status}`);
    return data;
  }
  catch(error) {
    throw error;
  }
}
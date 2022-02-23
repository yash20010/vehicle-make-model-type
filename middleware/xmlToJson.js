const xml2js = require('xml2js');

async function convertToJSON(xml) {
  try {
    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = convertToJSON;

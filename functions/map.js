const { processMapSpec } = require('./process-map-spec');
const { ModelMapperError } = require('../classes/model-mapper-error');

exports.map = async function (sourceObject, mapModel) {
  const result = {};
  let errors = 0;
  const resultT = {};

  for (key of Object.keys(mapModel)) {
    resultT[key] = processMapSpec(sourceObject, key, mapModel[key]);
  }

  for (key in resultT) {
    try { result[key] = await resultT[key] }
    catch (err) {
      errors++;
      result[key] = {
        error: err.message
      }
    }
  }
  
  if (errors > 0) {
    throw new ModelMapperError('Error mapping object. See the fields tagged as errors.', result);
  }

  return result
};
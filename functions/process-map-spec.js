const { ModelMapperFieldError } = require('../classes/model-mapper-error');
const { NotImplementedModelMapperError } = require('../classes/not-implemented-model-mapper-error');

const { processDirectSpec } = require('./process-direct-spec');
const { processCustomSpec } = require('./process-custom-spec');
const { processNumberSpec } = require('./process-number-spec');
const { processDateSpec } = require('./process-date-spec');

exports.processMapSpec = async function processMapSpec(sourceObject, key, mapModelSpec) {
  try {
    if (mapModelSpec && mapModelSpec.type) {
      switch (mapModelSpec.type) {
        case 'direct':
          return await processDirectSpec(sourceObject, key, mapModelSpec);
        case 'custom':
          return await processCustomSpec(sourceObject, key, mapModelSpec);
        case 'number':
          return await processNumberSpec(sourceObject, key, mapModelSpec);
        case 'date':
          return await processDateSpec(sourceObject, key, mapModelSpec);
        default:
          throw new NotImplementedModelMapperError(`The model mapper type '${mapModelSpec.type}' is not implemented.`);
      }
    }
  } catch (err) {
    if (err instanceof ModelMapperFieldError) throw err;

    throw new ModelMapperFieldError(err.message, key, mapModelSpec);
  }
}
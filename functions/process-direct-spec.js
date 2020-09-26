const { checkRequired } = require('./check-required');
const { checkRegExp } = require('./check-regexp');
const { checkLength } = require('./check-length');

async function processDirectSpec(sourceObject, key, mapModelSpec) {
  const preValue = sourceObject[
    (mapModelSpec.from && mapModelSpec.from.toString())
    || (key)];
  await checkRequired(preValue, key, mapModelSpec);
  await checkRegExp(preValue, key, mapModelSpec);
  await checkLength(preValue, key, mapModelSpec);

  if (preValue) return preValue.toString();
  
  return null;
}

exports.processDirectSpec = processDirectSpec;

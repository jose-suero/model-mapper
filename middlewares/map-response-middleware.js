const { map } = require('../functions/map');

exports.mapResponseMiddleware = function (mapModel, statusCode = 200, key = 'mappedBody') {
  return async (req, res, next) => {
    try {
      const sourceObject = res[key] || req[key] || req['mappedBody'];
      if (sourceObject) {
        return res.status(statusCode)
          .json(await map(sourceObject, mapModel));

      }

      throw new Error('No object to map from found.');
    } catch (err) {
      next(err);
    }
  }
};
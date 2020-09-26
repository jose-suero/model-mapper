const { map } = require('../functions/map');

exports.mapBodyMiddleware = function mapBodyMiddleware(mapModel) {
  return async (req, res, next) => {
    try {
      req.mappedBody = await map(req.body, mapModel);
      if (next) return next();

      return next(new Error('mapBodyMiddleware expect a next function to be defined.'));
    } catch (err) {
      next(err);
    }
  }
};
const { ModelMapperError } = require('../classes/model-mapper-error');

exports.errorMiddleware = (mapError) => async function (err, req, res, next) {
  if (err && err instanceof ModelMapperError) {
    if (mapError) {
      try {
        return await Promise.resolve(mapError(err, req, res, next));
      } catch (err) {
        return next(err);
      }
    } else {
      if (err.results) {
        const errors = {}
        Object.keys(err.results).forEach(key => {
          if (err.results[key].error) {
            errors[key] = err.results[key];
          }
        });
        return res.status(400).json({
          errors
        });
      }
    }
  }

  next(err);
}
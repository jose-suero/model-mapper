const { Router } = require('express');
const { mapBodyMiddleware } = require('../middlewares/map-body-middleware')
const { mapResponseMiddleware } = require('../middlewares/map-response-middleware')

exports.setupControllerMiddleware =
  function (inModel, outModel, middleware, defaultStatusCode = 200) {

    const router = Router();
    router.use('/',
      mapBodyMiddleware(inModel),
      middleware,
      mapResponseMiddleware(outModel, defaultStatusCode)
    );

    return router;
  }

exports.setupControllerServiceMiddleware =
  function (inModel, outModel, serviceCallback, defaultStatusCode = 200) {
    const router = Router();
    router.use('/',
      mapBodyMiddleware(inModel),
      async (req, res, next) => {
        try {
          res.mappedBody = await Promise.resolve(serviceCallback(req.mappedBody, req, res));
          next();
        } catch (err) {
          next(err);
        }
      },
      mapResponseMiddleware(outModel, defaultStatusCode)
    );

    return router;
  }
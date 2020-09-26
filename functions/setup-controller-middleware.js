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
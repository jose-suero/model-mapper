const { ModelMapperError, ModelMapperFieldError } = require('./classes/model-mapper-error');
const { NotImplementedModelMapperError } = require('./classes/not-implemented-model-mapper-error');
const { map } = require('./functions/map');
const { mapBodyMiddleware } = require('./middlewares/map-body-middleware');
const { mapResponseMiddleware } = require('./middlewares/map-response-middleware');
const { errorMiddleware } = require('./middlewares/error-middleware');
const { setupControllerMiddleware, setupControllerServiceMiddleware } = require('./functions/setup-controller-middleware');

exports.map = map;
exports.mapBodyMiddleware = mapBodyMiddleware;
exports.mapResponseMiddleware = mapResponseMiddleware;
exports.setupControllerMiddleware = setupControllerMiddleware;
exports.setupControllerServiceMiddleware = setupControllerServiceMiddleware;
exports.ModelMapperError = ModelMapperError;
exports.ModelMapperFieldError = ModelMapperFieldError;
exports.NotImplementedModelMapperError = NotImplementedModelMapperError;
exports.errorMiddleware = errorMiddleware;
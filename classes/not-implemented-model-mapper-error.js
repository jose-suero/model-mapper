const { ModelMapperError } = require("./model-mapper-error");
class NotImplementedModelMapperError extends ModelMapperError {
    constructor(message = 'Wrong type pass to the ModelMapper') {
        super(message);
    }
}
exports.NotImplementedModelMapperError = NotImplementedModelMapperError;

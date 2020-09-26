class ModelMapperError extends Error {
  constructor(message, results = null) {
    super(message);

    this.results = results;
  }

  getErrors() {
    const errorKeys = {}
    if (this.results) {
      Object.keys(this.results)
        .filter(key => this.results[key].error)
        .forEach(errorKey => {
          errorKeys[errorKey] = this.results[errorKey];
        });
    }

    return errorKeys;
  }

}

exports.ModelMapperError = ModelMapperError;

class ModelMapperFieldError extends ModelMapperError {
  constructor(message, key = null, mapModelSpec = null) {
    super(message);

    this.key = key;
    this.mapModelSpec = mapModelSpec;
  }

  static createFromModelSpec(key, mapModelSpec, message = null) {
    return new ModelMapperFieldError(
      (message && message.toString())
      || (mapModelSpec.errorMessage && mapModelSpec.errorMessage.toString())
      || `Model validation error at path '${key}'`,
      key,
      mapModelSpec
    );
  }
}

exports.ModelMapperFieldError = ModelMapperFieldError;
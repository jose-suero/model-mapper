exports.isDate = function (value) {
    const dtValue = new Date(value);

    return value && !isNaN(dtValue.getTime());
}
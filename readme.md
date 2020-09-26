# Model Mapper
A object mapper for use in my personal projects. With this project you can create a new object using a source object and a model specification.

## Basic usage

```javascript
const model = {
  id: { type: 'direct' },
  name: { type: 'direct', from: 'firstName' },
  amt: { type: 'number', from: 'amount' }
}

const sourceObject = {
  id: 7,
  firstName: 'John',
  amount: 123.75
}

const destObject = await map(sourceObject, model);
//or
map(sourceObject, model).then(result => {
  const destObject = result;
}).catch(err => {
  throw err
});
```

`destObject` will be an object like this:

```javascript
{ id: 7, name: 'John', amt: 123.75 }
```

## Defining Models
A model is defined which one key for each map you need to have int the final destination object.

For each key you have to define a `type` key with one of the following values: `"direct"`, `"number"`, `"date"` or `"custom"`.

### Using `{type = 'direct'}`

Use this type to extract a value directly from the a key of the sourceObject. If you specify a `from` key, the value will be retrieved from the key you specify in that `from` key. Otherwise the value the value will be retrieved from the same key you are defining.

see the keys `name` and `id` from the sample above.

> The value will be converted to string using the `.toString` javascript method. 

### Using `{type = 'number'}`

Use this type to extract a value and convert it to a number. You can specify a `from` key if you want to use a source key different to the key being defined.

This type of map uses javascript's `parseFloat` function to convert the value. It will throw a `ModelMapperFieldError` in case of a failed conversion to a number.

### Using `{type = 'date'}`

Use this type to extract a value and convert it to a Date. You can specify a `from` key if you want to use a source key different from the key being defined.

This type of map uses javascript's `new Date()` constructor to convert the value. It will throw a `ModelMapperFieldError` in case of a failed conversion to a Date.

### Using `{type = 'custom'}`

Use this type to extract a value using a custom function or object provided in the required `map` key. If you provide an object it will be returned as is.

In case you provide a function to the `map` key, the mapper will call with it with three arguments: 

1. `sourceObject`: to pass to the function the sourceObject.
2. `key`: the key triggering the map function.
3. `mapModelSpec`: the full map specification for the key triggering the function. You can use custom keys in this definition if you are going to need these custom keys in your map function.

### Other keys

1. `required`: used to ensure the value is not undefined or null or empty string. Applies to all types.
2. `min`: used to restrict the value to this minimum value. Applies to `number` and `date`.
3. `max`: used to restrict the value to this maximum value. Applies to `number` and `date`.
4. `minLength`: used to restrict the final value to a minimumLength. Applies to `direct` and `custom`.
5. `maxLength`: used to restrict the final value to a maximumLength. Applies to `direct` and `custom`.
6. `regExp`: used to check the final value towards a javascript's `RegExp.test`. Applies to `direct` and `custom`.

> All of the keys that apply to `type = 'custom'` will be checked after the evaluation of the `map` function or object.

## Advanced Examples

### 1. Using a custom map function and restricting number ranges.


```javascript
const model = {
  id: { type: 'direct' },
  name: { type: 'direct', from: 'firstName' },
  //amt is restricted to a minimum value of 100
  amt: { type: 'number', from: 'amount', min: 100 },
  //birth date is restricted to a minimum value of January 1st, 1900
  birthDate: { type: 'date', min: new Date('1900/01/01') }
}

const sourceObject = {
  id: 7,
  firstName: 'John',
  amount: 123.75,
  birthDate: '1800/03/01'
}

//Will throw because the provided BirthDate is older than January 1st, 1900

try {
  const destObject = await map(sourceObject, model);
} catch (err) {
  const errors = Object.keys(err.results)
    .filter(key => err.results[key].error)
    .map(errorKey => err.results[errorKey]);
  //errors array will contain all keys with their error message.
}
```

## Using with Express.js

This library provides Middlewares for mapping from a request and to a response. 

### mapBodyMiddleware

```javascript
const { mapBodyMiddleware } = request('@josesjs/model-mapper');

const model = {
  id: { type: 'direct' },
  name: { type: 'direct', from: 'firstName' },
  //amt is restricted to a minimum value of 100
  amt: { type: 'number', from: 'amount', min: 100 },
  //birth date is restricted to a minimum value of January 1st, 1900
  birthDate: { type: 'date', min: new Date('1900/01/01') }
}

expressApp.use('/endpoint', mapBodyMiddleware(model), (req, res) => {
  res.status(200).json(req.mappedBody);
});
```

When you provide this middleware in the endpoint, the req.body object will be used as a `sourceObject` to be mapped used the `model` provided. If no errors the mapped model will be available in the `req.mappedBody` variable for the following middlewares.

>if there is no subsequents middlewares provided, mapBodyMiddleware will throw an error with the message `'mapBodyMiddleware expect a next function to be defined.'`.

### mapResponseMiddleware

```javascript
const { mapResponseMiddleware } = require('@josesjs/model-mapper');

//expected a model to map the mappedBody
expressApp.use('/endpoint', mapBodyMiddleware(...), mapResponseMiddleware(
  model
));

```

When you provide this middleware to an endpoint. the `req.mappedBody` variable will be mapped with the `model` variable and returned to the response as a JSON with an status code = 200;

If you want to override the status code you can pass your customized number to the second parameter of this function. Also if you want to override the `req.mappedBody` with another variable you can provide a key as a third parameter. The function will look for this key first in the response, if not found there, in the request, if not found there will use the `req.mappedBody`.

### errorMiddleware

You can use this middleware to catch the errors thrown by the map function. It has a unique optional parameter to use if you want to override the default mapping for errors.
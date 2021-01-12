const {
    isEmpty, isBoolean, isNumber, isString, isSymbol, isFunction, isObject, isArray,
} = require('lodash');

function getTypeNameByType(type) {
    return {
        [Boolean]: 'boolean',
        [Number]: 'number',
        [String]: 'string',
        [Symbol]: 'symbol',
        [Function]: 'function',
        [Object]: 'object',
        [Array]: 'array',
    }[type];
}

function validateType(type, value) {
    return {
        [Boolean]: () => isBoolean(value),
        [Number]: () => isNumber(value),
        [String]: () => isString(value),
        [Symbol]: () => isSymbol(value),
        [Function]: () => isFunction(value),
        [Object]: () => isObject(value),
        [Array]: () => isArray(value),
    }[type]();
}
class Assert {
    constructor(params, constraints) {
        this.params = params;
        this.constraints = constraints;
        this.errors = {};
        this.valid = null;
        this.invalidMessage = 'Invalid data';
    }

    isValid() {
        const errors = {};

        Object.keys(this.constraints).forEach((name) => {
            const {
                required,
                requiredMessage,
                pattern,
                patternMessage,
                validate,
                validateMessage,
                type,
                maxLength,
            } = this.constraints[name];
            const value = this.params[name];

            if (required && (value === undefined || value === null || value === '')) {
                errors[name] = { errorMessage: requiredMessage || 'Required' };
            } else if (type && value !== undefined && !validateType(type, value)) {
                errors[name] = { errorMessage: `Must be of type '${getTypeNameByType(type)}'` };
            } else if (pattern && !pattern.test(value)) {
                errors[name] = { errorMessage: patternMessage || 'Invalid format' };
            } else if (validate && !validate(value)) {
                errors[name] = { errorMessage: validateMessage || 'Invalid' };
            } else if (
                value !== undefined && Number(maxLength) && String(value).length > maxLength
            ) {
                errors[name] = { errorMessage: `Max length: ${maxLength}` };
            }
        });

        this.errors = errors;
        this.valid = isEmpty(errors);

        return this.valid;
    }
}

module.exports = Assert;

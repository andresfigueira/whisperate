const { isEmpty } = require('lodash');

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
            } = this.constraints[name];
            const value = this.params[name];

            if (required && (value === undefined || value === null || value === '')) {
                errors[name] = {
                    errorMessage: requiredMessage || 'Required',
                };
            } else if (pattern && !pattern.test(value)) {
                errors[name] = {
                    errorMessage: patternMessage || 'Incorrect format',
                };
            } else if (validate && !validate(value)) {
                errors[name] = {
                    errorMessage: validateMessage || 'Invalid',
                };
            }
        });

        this.errors = errors;
        this.valid = isEmpty(errors);

        return this.valid;
    }
}

module.exports = Assert;

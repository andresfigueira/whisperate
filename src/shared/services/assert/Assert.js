const ObjectHelper = require('../../helpers/Object.helper');

class Assert {
    constructor(params, constraints) {
        this.params = params;
        this.constraints = constraints;
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
                errors[name].required = requiredMessage || 'Required';
            } else if (pattern && !pattern.test(value)) {
                errors[name].pattern = patternMessage || 'Incorrect format';
            } else if (validate && !validate(value)) {
                errors[name].validate = validateMessage || 'Invalid';
            }
        });

        return {
            errors,
            valid: ObjectHelper.isEmpty(errors),
        };
    }
}

module.exports = Assert;

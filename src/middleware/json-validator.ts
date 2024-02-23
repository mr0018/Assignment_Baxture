import { Validator } from "express-json-validator-middleware";

export default new Validator({
    removeAdditional: 'all',
    validateFormats: true,
    formats: {
        email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
        date: /^\d{2}\/\d{2}\/\d{4}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i
    },
    strictTuples: false,
    allowUnionTypes: true
});

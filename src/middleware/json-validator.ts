import { Validator } from "express-json-validator-middleware";

export default new Validator({
    removeAdditional: 'all',
    validateFormats: true,
    formats: {
        email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    },
    strictTuples: false,
    allowUnionTypes: true
});

export const gender = {
    enum: ["male", "female", "other"]
};

export const string = {
    type: 'string',
    maxLength: 100,
    minLength: 2,
};

export const id = {
    type: 'string',
    maxLength: 10,
    minLength: 10,
};

export const number = {
    type: 'number'
};

export const email = {
    type: 'string',
    maxLength: 80,
    minLength: 5,
    format: 'email',
};

export const boolean = {
    type: "boolean",
};

export const hobbies = {
    type: 'array',
    minItems: 0,
    maxItems: 10,
    items: [string]
};



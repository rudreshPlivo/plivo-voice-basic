const env = {
    PORT: process.env.PORT || 8088,
    NODE_ENV: process.env.NODE_ENV || `development`,
    AUTH_ID: "PLIVO_AUTH_ID",
    AUTH_TOKEN: "PLIVO_AUTH_TOKEN"
};

export default env;
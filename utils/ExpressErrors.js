/* eslint-disable no-unused-vars */
class ExpressErrors extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressErrors;

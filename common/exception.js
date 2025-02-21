class CustomException extends Error {
    constructor(code,message) {
        super(message);
        // this.message = message;
        this.code = code;
    }
}

module.exports = CustomException;
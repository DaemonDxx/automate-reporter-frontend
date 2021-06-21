export class APIError extends Error {

    constructor(title, message) {
        super();
        this.title = title;
        this.message = message;
    }

    toNotify() {
        return {
            title: this.title,
            text: this.message,
            type: 'error'
        }
    }

    toString() {
        return `${this.title}: ${this.message}`;
    }
}
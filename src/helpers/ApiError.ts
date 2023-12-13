export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number, name:string) {
        super(message);
        this.statusCode = statusCode;
        super.name = name;
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400, "BadRequestError");
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, 401, "UnauthorizedError");
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string) {
        super(message, 403, "ForbiddenError");
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404, "NotFoundError");
    }
}

export class ConflictError extends ApiError {
    constructor(message: string) {
        super(message, 409, "ConflictError");
    }
}

export class UnprocessableEntityError extends ApiError {
    constructor(message: string) {
        super(message, 422, "UnprocessableEntityError");
    }
}
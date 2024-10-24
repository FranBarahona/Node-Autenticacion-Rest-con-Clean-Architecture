import { Validators } from "../../../config";

interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
}

export class RegisterUserDto {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create(input: RegisterUserInput): [string | undefined, RegisterUserDto | undefined] {
        const { name, email, password } = input;

        if (!name) {
            return ['Missing name', undefined];
        }
        if (!email) {
            return ['Missing email', undefined];
        }
        if (!Validators.email.test(email)) {
            return ['Invalid email', undefined];
        }
        if (!password) {
            return ['Missing password', undefined];
        }
        if (password.length < 6) {
            return ['Password must be at least 6 characters', undefined];
        }

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}

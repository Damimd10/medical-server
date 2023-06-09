export class CreateUserDto {
  username: string;
  password: string;
  refresh_token: string;
  specialities?: number[];
  name?: string;
  surname?: string;
}

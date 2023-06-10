export class CreateUserDto {
  username: string;
  password: string;
  refreshToken?: string;
  specialities?: number[];
  name?: string;
  surname?: string;
}

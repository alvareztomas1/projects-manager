export interface IJwtToken {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}

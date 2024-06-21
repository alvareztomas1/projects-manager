export interface IJwtToken {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}

export interface ICookie {
  username: string;
  id: string;
}

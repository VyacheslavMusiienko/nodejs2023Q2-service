export interface JwtPayload {
  userId: string;
  login: string;
}

export interface JwtRefreshPayload extends JwtPayload {
  refreshToken: string;
}

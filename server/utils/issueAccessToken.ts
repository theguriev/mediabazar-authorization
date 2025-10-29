const issueAccessToken = (
  payload: JwtPayload,
  {
    secret,
    expiresIn = "15m",
  }: { secret: string; expiresIn?: number | StringValue },
) => jwt.sign(payload, secret, { expiresIn });

export default issueAccessToken;

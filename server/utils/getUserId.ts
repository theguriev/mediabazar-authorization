const getUserId = async (event: H3Event<EventHandlerRequest>) => {
  const accessToken = String(getCookie(event, "accessToken"));
  const { secret } = useRuntimeConfig();
  const { userId } = await verifyAccessToken(accessToken, secret);
  return userId;
};

export default getUserId;

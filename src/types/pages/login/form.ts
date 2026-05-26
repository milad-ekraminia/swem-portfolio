export type UserAccount = {
  username: string;
  password: string;
};

export type LoginRequestType = {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
  scope: string;
};

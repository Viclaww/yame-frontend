export type PostProps = {
  id: number;
  text: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  image?: string;
};

export type TUser = {
  email: string;
  id: number;
  username: string;
};

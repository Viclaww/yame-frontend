export type PostProps = {
  id: number;
  text: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  image?: string;
  media?: { src: string }[];
  user: {
    username: string;
    id: number;
    email: string;
  };
};

export type TUser = {
  email: string;
  id: number;
  username: string;
};

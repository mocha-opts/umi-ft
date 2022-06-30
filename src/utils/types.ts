export type User = {
  id: number;
  email: string;
  passwordHash: string;
  firstname: string;
  lastname: string;
  posts: Post[];
  avatarUrl?: string | null | undefined;
  gender: number;
  birthday: string;
  contacts: string;
  address: string;
};

export type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content?: string | null | undefined;
  author: User;
  authorId: number;
  imageUrl?: string | null | undefined;
  tags: string;
};

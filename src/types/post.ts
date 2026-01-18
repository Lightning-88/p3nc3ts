export type PostDataType = {
  id: string;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  content: string;
  published: boolean;
  _count: {
    likes: number;
  };
  author: {
    id: string;
    username: string;
    name: string;
    bio: string | null;
    location: string | null;
    photo: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  comments: {
    id: string;
    createdAt: Date;
    authorId: string;
    content: string;
    postId: string;
    author: {
      id: string;
      username: string;
      name: string;
      bio: string | null;
      location: string | null;
      photo: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};

export type CommentData = {
  id: string;
  createdAt: Date;
  authorId: string;
  content: string;
  postId: string;
  author: {
    id: string;
    username: string;
    name: string;
    bio: string | null;
    location: string | null;
    photo: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

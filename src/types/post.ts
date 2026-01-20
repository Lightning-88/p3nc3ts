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
    comments: number;
  };
  author: {
    id: string;
    username: string;
    name: string;
    photo: string | null;
    createdAt: Date;
  };
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
    photo: string | null;
  };
};

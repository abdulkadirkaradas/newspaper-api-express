export interface PostFlowResponse {
  id: number;
  title: string;
  content: string;
  categoryId: string;
  score: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    lastname: string;
    username: string;
  };
  images: {
    id: string;
    url: string;
  }[];
  category: {
    id: string;
    name: string;
  };
  counterPosts: PostFlowResponse[];
}

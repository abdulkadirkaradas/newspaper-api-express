import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { APIClient } from "@/lib/api/client";

interface Post {
  id: number;
  title: string;
  content: string;
  categoryId: string;
  score: {
    score: number;
    upvotes: number;
    downvotes: number;
  };
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
  counterPosts: Post[];
}

const fetchPostFlow = async () => {
  return await APIClient.fetchPostFlow();
};

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.content}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src="https://media.istockphoto.com/id/2149922267/vector/user-icon.jpg?s=612x612&w=0&k=20&c=i6jYPfB1pWjK8pll6YRxAK9fgBmf65-w5wbKH9R1dyQ="
              alt={post.author.name}
            />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <span>{post.author.name}</span>
        </div>
        <span>{(new Date(post.createdAt)).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  );
}

export async function PostGrid() {
  const postFlow: Post[] = await fetchPostFlow();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {postFlow.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

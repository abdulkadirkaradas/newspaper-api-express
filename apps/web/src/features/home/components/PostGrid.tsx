import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar?: string;
  date: string;
}

const mockPosts: Post[] = [
  { id: 1, title: "The Art of Minimalism", excerpt: "Exploring the beauty of less in modern design...", author: "Alice", date: "Jan 10, 2026" },
  { id: 2, title: "Science of Sleep", excerpt: "Why your brain needs quality rest to function...", author: "Bob", date: "Jan 9, 2026" },
  { id: 3, title: "Fun with Physics", excerpt: "5 experiments you can try at home today...", author: "Charlie", date: "Jan 8, 2026" },
  { id: 4, title: "Digital Art Trends", excerpt: "What's shaping the creative landscape in 2026...", author: "Diana", date: "Jan 7, 2026" },
  { id: 5, title: "Miscellaneous Thoughts", excerpt: "Random musings on life and technology...", author: "Eve", date: "Jan 6, 2026" },
  { id: 6, title: "The Joy of Coding", excerpt: "Finding happiness in building software...", author: "Frank", date: "Jan 5, 2026" },
  { id: 7, title: "Art & Technology", excerpt: "Where creativity meets innovation...", author: "Grace", date: "Jan 4, 2026" },
  { id: 8, title: "Science Breakthroughs", excerpt: "Recent discoveries that will change our world...", author: "Henry", date: "Jan 3, 2026" },
  { id: 9, title: "Fun Facts Friday", excerpt: "Did you know these 10 amazing things?", author: "Ivy", date: "Jan 2, 2026" },
];

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.authorAvatar} alt={post.author} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <span>{post.author}</span>
        </div>
        <span>{post.date}</span>
      </CardFooter>
    </Card>
  );
}

export function PostGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

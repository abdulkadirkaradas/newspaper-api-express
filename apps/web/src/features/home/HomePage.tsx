import { PostGrid } from "./components/PostGrid";

export function HomePage() {
  return (
    <main className="p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Recent Posts</h1>
      <PostGrid />
    </main>
  );
}

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { PostGrid } from "./components/PostGrid";

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Post Grid */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Recent Posts</h1>
          <PostGrid />
        </main>
      </div>
    </div>
  );
}

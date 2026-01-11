import { HomePage } from "@/features/home/HomePage";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Sidebar } from "@/shared/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <HomePage />
        </div>
      </div>
    </div>
  );
}

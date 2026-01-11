import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Award, FileText, Star } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r bg-muted/30 p-6">
      {/* Profile Image */}
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback className="text-2xl">JD</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">John Doe</h2>
        <p className="text-sm text-muted-foreground">@johndoe</p>
      </div>

      <Separator className="my-6" />

      {/* Personal Info */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">About</h3>
        <p className="text-sm">
          Tech enthusiast, writer, and community contributor. Sharing thoughts on art and science.
        </p>
      </div>

      <Separator className="my-6" />

      {/* Badges & Stats */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Achievements</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1">
            <Star className="h-3 w-3" /> Top Writer
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Award className="h-3 w-3" /> Verified
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span><strong>42</strong> Posts</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span><strong>1.2k</strong> Likes</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { Award, ChevronLeft, ChevronRight, FileText, Star } from "lucide-react";
import { cn } from "@/shared/utils";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative shrink-0 border-r bg-muted/30 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16 p-2" : "w-64 p-6"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Profile Image */}
      <div className={cn("flex flex-col items-center text-center", isCollapsed && "mt-8")}>
        <Avatar className={cn("mb-4 transition-all", isCollapsed ? "h-10 w-10" : "h-20 w-20")}>
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback className={cn(isCollapsed ? "text-sm" : "text-2xl")}>JD</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-sm text-muted-foreground">@johndoe</p>
          </>
        )}
      </div>

      {!isCollapsed && (
        <>
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
        </>
      )}

      {/* Collapsed state icons */}
      {isCollapsed && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Posts">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Achievements">
            <Award className="h-4 w-4" />
          </Button>
        </div>
      )}
    </aside>
  );
}

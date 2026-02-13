// components/project-actions.tsx
"use client";

import { Share2, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";

interface ProjectActionsProps {
  project: Project;
}

// Main component for top bar
export default function ProjectActions({ project }: ProjectActionsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = project.thumbnail;
    link.download = `${project.title}-preview.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = () => {
    const element = document.getElementById("project-media");
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    }
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-7 h-7 sm:w-8 sm:h-8"
        onClick={handleShare}
        title="Share"
      >
        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-7 h-7 sm:w-8 sm:h-8"
        onClick={handleDownload}
        title="Download"
      >
        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-7 h-7 sm:w-8 sm:h-8"
        onClick={handleFullscreen}
        title="Fullscreen"
      >
        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
}

// Footer actions component
export function ProjectFooterActions({ project }: ProjectActionsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = project.thumbnail;
    link.download = `${project.title}-preview.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <Button
        className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white text-xs sm:text-sm h-8 sm:h-9"
        onClick={handleShare}
      >
        <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-2" />
        Share
      </Button>
      <Button
        variant="outline"
        className="text-xs sm:text-sm h-8 sm:h-9"
        onClick={handleDownload}
      >
        <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-2" />
        Download
      </Button>
    </div>
  );
}

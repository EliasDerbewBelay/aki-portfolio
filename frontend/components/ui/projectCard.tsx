// Project Card Component (can be in same file or separate)
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { PlayCircle } from "lucide-react";

// Project Card Component - Smaller Version
const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    href={`/projects/${project.slug}`}
    className="group flex-none w-[200px] md:w-[240px] hover:scale-105 transition-transform duration-300"
  >
    {/* Card Container */}
    <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge - Smaller */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-1.5 py-0.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-[8px] font-medium text-gray-700 dark:text-gray-300 shadow-sm">
            {project.category_display}
          </span>
        </div>

        {/* Play Icon for Video Projects - Smaller */}
        {project.video_url && (
          <div className="absolute top-2 right-2 z-10">
            <div className="w-5 h-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
              <PlayCircle className="w-3 h-3 text-[#00D1FF]" />
            </div>
          </div>
        )}
      </div>

      {/* Card Content - More Compact */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm font-bold uppercase tracking-wide line-clamp-1">
            {project.title}
          </h3>

          {/* Arrow Indicator - Smaller */}
          <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#0047FF] group-hover:to-[#00D1FF] transition-all duration-300 flex-shrink-0 ml-1">
            <svg
              className="w-2.5 h-2.5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>

        {/* Project Meta - More Compact */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-gray-500 dark:text-gray-400">
            {new Date(project.created_at).toLocaleDateString("en-US", {
              year: "numeric",
            })}
          </span>
          <span className="w-0.5 h-0.5 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="text-gray-500 dark:text-gray-400 capitalize">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default ProjectCard;

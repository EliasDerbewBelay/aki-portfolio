// app/projects/[slug]/page.tsx (Server Component)
import Image from "next/image";
import { Project } from "@/types/project";
import { ArrowLeft, Calendar, Tag, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectActions, {
  ProjectFooterActions,
} from "@/components/project-actions";

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;

    const projects: Project[] = await res.json();
    return projects.find((p) => String(p.slug) === String(slug)) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10 pt-20">
        {" "}
        {/* Added pt-20 for header spacing */}
        <div className="text-center space-y-6 max-w-md px-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#0047FF]/20 to-[#00D1FF]/20 rounded-full flex items-center justify-center">
            <Eye className="w-12 h-12 text-[#0047FF]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Project Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white">
              Return to Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative z-10 bg-transparent pt-16">
      {" "}
      {/* Added pt-16 for header spacing */}
      <div className="h-full flex flex-col">
        {/* Top Navigation Bar - Now part of the content flow */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
          <Link
            href="/"
            className="inline-flex items-center text-xs sm:text-sm text-gray-500 hover:text-[#0047FF] dark:text-gray-400 dark:hover:text-[#00D1FF] group transition-colors"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Gallery
          </Link>

          {/* Client Component for interactive buttons */}
          <ProjectActions project={project} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Media */}
            <div className="space-y-3 sm:space-y-4">
              <div
                id="project-media"
                className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-gray-900 shadow-xl sm:shadow-2xl"
              >
                {project.video_url ? (
                  <iframe
                    src={project.video_url.replace("watch?v=", "embed/")}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Minimal overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Small badge */}
                    <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/50 backdrop-blur-sm text-white border-0 text-[10px] sm:text-xs">
                      Featured Project
                    </Badge>
                  </>
                )}
              </div>

              {/* Compact Project Info */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="truncate max-w-[100px] sm:max-w-none">
                      {project.category_display}
                    </span>
                  </div>
                  <div className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{new Date(project.created_at).getFullYear()}</span>
                  </div>
                </div>

                {/* Tools */}
                <div className="flex gap-1">
                  <Badge
                    variant="outline"
                    className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0 h-4 sm:h-5"
                  >
                    PS
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0 h-4 sm:h-5"
                  >
                    AI
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0 h-4 sm:h-5"
                  >
                    AE
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="flex flex-col h-full space-y-3 sm:space-y-4">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black line-clamp-2">
                <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                  {project.title}
                </span>
              </h1>

              {/* Description - Scrollable */}
              <div className="flex-1 overflow-y-auto max-h-[200px] sm:max-h-[300px] lg:max-h-[400px] pr-2 custom-scrollbar">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1 sm:gap-2">
                  {[
                    "Creative Direction",
                    "Visual Identity",
                    "Typography",
                    "Color Theory",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 sm:gap-2"
                    >
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-[#0047FF] to-[#00D1FF] rounded-full flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 truncate">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Component for footer action buttons */}
              <div className="pt-2 sm:pt-3">
                <ProjectFooterActions project={project} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

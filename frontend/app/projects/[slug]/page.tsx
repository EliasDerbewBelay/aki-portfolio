import Image from "next/image";
import { Project } from "@/types/project";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";

// We fetch all projects and find the one that matches the slug
async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const projects: Project[] = await res.json();
    // Use .find() and make sure we compare strings correctly
    return projects.find((p) => String(p.slug) === String(slug)) || null;
  } catch (error) {
    return null;
  }
}

// In the latest Next.js, 'params' should be awaited if you're using certain configurations
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <Link href="/" className="text-blue-500 mt-4 underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="flex items-center text-gray-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 capitalize">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-6 mb-12 text-gray-600 border-b pb-8">
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-2" /> {project.category_display}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />{" "}
            {new Date(project.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Video or Image Display */}
        <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden mb-12 relative shadow-2xl">
          {project.video_url ? (
            <iframe
              src={project.video_url.replace("watch?v=", "embed/")}
              className="w-full h-full"
              allowFullScreen
            />
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-contain"
            />
          )}
        </div>

        <div className="prose prose-xl max-w-none">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">
            Project Description
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </div>
      </div>
    </main>
  );
}

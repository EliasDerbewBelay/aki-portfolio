"use client"; // This allows for button clicks and state

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { PlayCircle, Image as ImageIcon } from "lucide-react";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL

  // Fetch data on the client side now that we're using 'use client'
  useEffect(() => {
    fetch(`${BASE_URL}/api/projects/`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      });
  }, []);

  const filterProjects = (category: string) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === category));
    }
  };

  return (
    <main className="min-h-screen bg-white p-8">
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter">
          SELECTED WORKS
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["all", "branding", "print", "motion", "video"].map((cat) => (
            <button
              key={cat}
              onClick={() => filterProjects(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {filteredProjects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.id}
            className="group"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-sm">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold uppercase">{project.title}</h2>
                <p className="text-gray-500 text-sm">
                  {project.category_display}
                </p>
              </div>
              {project.video_url && (
                <PlayCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

"use client"; // This allows for button clicks and state

import { useState, useEffect } from "react";
import ProjectCard from "@/components/ui/projectCard";
import { Project } from "@/types/project";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Layers,
  PenTool,
  Type,
  Palette,
  Camera,
  Video,
  Move,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroImage from "@/components/ui/heroImage";
import FloatingIcons from "@/components/ui/floating-icons";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch data on the client side now that we're using 'use client'
  useEffect(() => {
    fetch(`${BASE_URL}/api/projects/`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);

        // Preload images
        const imagePromises = data.map((project: Project) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = project.imageUrl || project.image; // Adjust based on your project type
            img.onload = resolve;
            img.onerror = resolve; // Resolve even on error to not block forever
          });
        });

        Promise.all(imagePromises).then(() => {
          setImagesLoaded(true);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
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

  // Loading skeleton for project cards
  const ProjectCardSkeleton = () => (
    <div className="relative group cursor-pointer w-[300px] flex-shrink-0 animate-pulse">
      <div className="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-[4/5]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  );

  // Loading state component
  if (isLoading) {
    return (
      <main className="min-h-screen">
        {/* Floating Icons Component */}
        <FloatingIcons />

        {/* Hero Section - Same as before but with loading state if needed */}
        <section className="relative z-10 px-8 py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="text-[#0047FF] border-[#0047FF]/30 mb-4"
              >
                Self-Taught Designer & Video Editor
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                  HOLA!
                </span>
                <span className="block">I am Aklilu.</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg">
                I'm a creative and hands-on Graphic Designer with a passion for
                bringing ideas to life through visual design. From social media
                posts to product packaging and websites, I love crafting designs
                that are both eye-catching and on-brand. I'm easy to work with,
                detail-oriented, and always up for a creative challenge.
              </p>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Badge className="bg-[#0047FF]/10 text-[#0047FF] hover:bg-[#0047FF]/20 border-0">
                  <PenTool className="w-3 h-3 mr-1" /> Photoshop
                </Badge>
                <Badge className="bg-[#00D1FF]/10 text-[#00D1FF] hover:bg-[#00D1FF]/20 border-0">
                  <Layers className="w-3 h-3 mr-1" /> Illustrator
                </Badge>
                <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-0">
                  <Type className="w-3 h-3 mr-1" /> InDesign
                </Badge>
                <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-0">
                  <Video className="w-3 h-3 mr-1" /> Video Editor
                </Badge>
              </div>

              <Button className="mt-4 bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:opacity-90 transition-opacity">
                Download Resume <Move className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full">
              <HeroImage />
            </div>
          </div>
        </section>

        {/* Selected Works Section with Loading State */}
        <section
          id="selected-works"
          className="relative z-10 px-8 py-16 md:py-24 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header with Decorative Elements */}
            <div className="text-center mb-16 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#0047FF]/20 to-[#00D1FF]/20 rounded-full blur-3xl -z-10" />

              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                SELECTED{" "}
                <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent relative">
                  WORKS
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,4 Q50,8 100,4 T200,4"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#0047FF" />
                        <stop offset="100%" stopColor="#00D1FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                A collection of my favorite projects spanning branding, print,
                motion, and video
              </p>
            </div>

            {/* Filter Buttons - Enhanced Design */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {["all", "branding", "print", "motion", "video"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => filterProjects(cat)}
                  disabled
                  className={`
                    relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                    text-gray-400 dark:text-gray-600 cursor-not-allowed
                  `}
                >
                  <span className="relative z-10">{cat.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Loading State with Skeleton Cards */}
            <div className="relative w-full overflow-hidden py-4">
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />

              {/* Loading indicator with text */}
              <div className="flex justify-center items-center mb-8">
                <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <Loader2 className="w-5 h-5 text-[#0047FF] animate-spin" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Loading amazing projects...
                  </span>
                </div>
              </div>

              {/* First Scrolling Row - Right to Left with Skeletons */}
              <div className="flex gap-4 mb-4 marquee-right-to-left">
                {[...Array(8)].map((_, index) => (
                  <ProjectCardSkeleton key={`skeleton-1-${index}`} />
                ))}
              </div>

              {/* Second Scrolling Row - Left to Right with Skeletons */}
              <div className="flex gap-4 marquee-left-to-right">
                {[...Array(8)].map((_, index) => (
                  <ProjectCardSkeleton key={`skeleton-2-${index}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about-me"
          className="relative z-10 px-8 py-16 md:py-24 bg-gradient-to-b from-transparent via-[#0047FF]/5 to-transparent"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Left Column - About Text */}
              <div className="space-y-6">
                <Badge
                  variant="outline"
                  className="text-[#0047FF] border-[#0047FF]/30"
                >
                  ABOUT ME
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Self-Taught <br />
                  <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                    Creative Mind
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  I'm a self-taught graphic designer and video editor with a
                  passion for visual storytelling. My journey started with
                  curiosity and grew into a profession through countless hours
                  of practice and experimentation.
                </p>

                {/* Skills with Icons */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#0047FF]/10 rounded-lg">
                        <PenTool className="w-5 h-5 text-[#0047FF]" />
                      </div>
                      <div>
                        <h4 className="font-bold">Photoshop</h4>
                        <p className="text-sm text-gray-500">Raster Editing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#00D1FF]/10 rounded-lg">
                        <Layers className="w-5 h-5 text-[#00D1FF]" />
                      </div>
                      <div>
                        <h4 className="font-bold">Illustrator</h4>
                        <p className="text-sm text-gray-500">Vector Design</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Type className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-bold">InDesign</h4>
                        <p className="text-sm text-gray-500">Layout Design</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Video className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-bold">Video Editing</h4>
                        <p className="text-sm text-gray-500">Premiere Pro</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats/Experience */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-3 text-[#0047FF]" />
                    <h3 className="text-3xl font-black">1+</h3>
                    <p className="text-sm text-gray-500">Years Experience</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Palette className="w-8 h-8 mx-auto mb-3 text-[#00D1FF]" />
                    <h3 className="text-3xl font-black">50+</h3>
                    <p className="text-sm text-gray-500">Projects Done</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl col-span-2">
                  <CardContent className="p-6 text-center">
                    <Camera className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                    <h3 className="text-3xl font-black">100%</h3>
                    <p className="text-sm text-gray-500">Client Satisfaction</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Hire Me Section with Form */}
        <section id="hire-me" className="relative z-10 px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="text-[#0047FF] border-[#0047FF]/30 mb-4"
              >
                LET'S WORK TOGETHER
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Hire{" "}
                <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Have a project in mind? Let's bring your ideas to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#0047FF]/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#0047FF]" />
                  </div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <p className="text-sm text-gray-500">
                    Jornalistaklilu@gmail.com
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00D1FF]/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#00D1FF]" />
                  </div>
                  <h3 className="font-bold mb-2">Phone</h3>
                  <p className="text-sm text-gray-500">+251 99 383 4681</p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-bold mb-2">Location</h3>
                  <p className="text-sm text-gray-500">Addis Ababa, Ethiopia</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="mt-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        placeholder="Your name"
                        className="bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Type</label>
                    <select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md">
                      <option>Branding</option>
                      <option>Print Design</option>
                      <option>Motion Graphics</option>
                      <option>Video Editing</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      className="min-h-[120px] bg-white dark:bg-gray-800"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:opacity-90 transition-opacity">
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    );
  }

  // Regular render when loading is complete
  return (
    <main className="min-h-screen">
      {/* Floating Icons Component */}
      <FloatingIcons />

      {/* Hero Section */}
      <section className="relative z-10 px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="text-[#0047FF] border-[#0047FF]/30 mb-4"
            >
              Self-Taught Designer & Video Editor
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="block bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                HOLA!
              </span>
              <span className="block">I am Aklilu.</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg">
              I'm a creative and hands-on Graphic Designer with a passion for
              bringing ideas to life through visual design. From social media
              posts to product packaging and websites, I love crafting designs
              that are both eye-catching and on-brand. I'm easy to work with,
              detail-oriented, and always up for a creative challenge.
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Badge className="bg-[#0047FF]/10 text-[#0047FF] hover:bg-[#0047FF]/20 border-0">
                <PenTool className="w-3 h-3 mr-1" /> Photoshop
              </Badge>
              <Badge className="bg-[#00D1FF]/10 text-[#00D1FF] hover:bg-[#00D1FF]/20 border-0">
                <Layers className="w-3 h-3 mr-1" /> Illustrator
              </Badge>
              <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-0">
                <Type className="w-3 h-3 mr-1" /> InDesign
              </Badge>
              <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-0">
                <Video className="w-3 h-3 mr-1" /> Video Editor
              </Badge>
            </div>

            <Button className="mt-4 bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:opacity-90 transition-opacity">
              Download Resume <Move className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full">
            <HeroImage />
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section
        id="selected-works"
        className="relative z-10 px-8 py-16 md:py-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Decorative Elements */}
          <div className="text-center mb-16 relative">
            {/* Background blur element */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#0047FF]/20 to-[#00D1FF]/20 rounded-full blur-3xl -z-10" />

            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              SELECTED{" "}
              <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent relative">
                WORKS
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,4 Q50,8 100,4 T200,4"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#0047FF" />
                      <stop offset="100%" stopColor="#00D1FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              A collection of my favorite projects spanning branding, print,
              motion, and video
            </p>
          </div>

          {/* Filter Buttons - Enhanced Design */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {["all", "branding", "print", "motion", "video"].map((cat) => (
              <button
                key={cat}
                onClick={() => filterProjects(cat)}
                className={`
                  relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    activeFilter === cat
                      ? "text-white shadow-lg shadow-[#0047FF]/25"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }
                `}
              >
                {activeFilter === cat && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0047FF] to-[#00D1FF] animate-pulse-slow" />
                )}
                <span
                  className={`relative z-10 ${activeFilter === cat ? "text-white" : ""}`}
                >
                  {cat.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* Infinite Looping Carousel */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />

            {/* First Scrolling Row - Right to Left */}
            <div className="flex gap-4 mb-4 marquee-right-to-left">
              {/* Quadruple the projects for smoother loop */}
              {[
                ...filteredProjects,
                ...filteredProjects,
                ...filteredProjects,
                ...filteredProjects,
              ].map((project, index) => (
                <ProjectCard
                  key={`${project.id}-${index}-1`}
                  project={project}
                />
              ))}
            </div>

            {/* Second Scrolling Row - Left to Right (opposite direction for visual interest) */}
            <div className="flex gap-4 marquee-left-to-right">
              {/* Quadruple the projects for smoother loop */}
              {[
                ...filteredProjects,
                ...filteredProjects,
                ...filteredProjects,
                ...filteredProjects,
              ].map((project, index) => (
                <ProjectCard
                  key={`${project.id}-${index}-2`}
                  project={project}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about-me"
        className="relative z-10 px-8 py-16 md:py-24 bg-gradient-to-b from-transparent via-[#0047FF]/5 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column - About Text */}
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="text-[#0047FF] border-[#0047FF]/30"
              >
                ABOUT ME
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Self-Taught <br />
                <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                  Creative Mind
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                I'm a self-taught graphic designer and video editor with a
                passion for visual storytelling. My journey started with
                curiosity and grew into a profession through countless hours of
                practice and experimentation.
              </p>

              {/* Skills with Icons */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#0047FF]/10 rounded-lg">
                      <PenTool className="w-5 h-5 text-[#0047FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold">Photoshop</h4>
                      <p className="text-sm text-gray-500">Raster Editing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#00D1FF]/10 rounded-lg">
                      <Layers className="w-5 h-5 text-[#00D1FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold">Illustrator</h4>
                      <p className="text-sm text-gray-500">Vector Design</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Type className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-bold">InDesign</h4>
                      <p className="text-sm text-gray-500">Layout Design</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Video className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold">Video Editing</h4>
                      <p className="text-sm text-gray-500">Premiere Pro</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats/Experience */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 text-[#0047FF]" />
                  <h3 className="text-3xl font-black">1+</h3>
                  <p className="text-sm text-gray-500">Years Experience</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Palette className="w-8 h-8 mx-auto mb-3 text-[#00D1FF]" />
                  <h3 className="text-3xl font-black">50+</h3>
                  <p className="text-sm text-gray-500">Projects Done</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl col-span-2">
                <CardContent className="p-6 text-center">
                  <Camera className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                  <h3 className="text-3xl font-black">100%</h3>
                  <p className="text-sm text-gray-500">Client Satisfaction</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hire Me Section with Form */}
      <section id="hire-me" className="relative z-10 px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="text-[#0047FF] border-[#0047FF]/30 mb-4"
            >
              LET'S WORK TOGETHER
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Hire{" "}
              <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Have a project in mind? Let's bring your ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#0047FF]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#0047FF]" />
                </div>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-sm text-gray-500">
                  Jornalistaklilu@gmail.com
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00D1FF]/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#00D1FF]" />
                </div>
                <h3 className="font-bold mb-2">Phone</h3>
                <p className="text-sm text-gray-500">+251 99 383 4681</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-bold mb-2">Location</h3>
                <p className="text-sm text-gray-500">Addis Ababa, Ethiopia</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="mt-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      placeholder="Your name"
                      className="bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Type</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md">
                    <option>Branding</option>
                    <option>Print Design</option>
                    <option>Motion Graphics</option>
                    <option>Video Editing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    className="min-h-[120px] bg-white dark:bg-gray-800"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:opacity-90 transition-opacity">
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

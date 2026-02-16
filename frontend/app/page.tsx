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
  ChevronRight,
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
            img.src = project.imageUrl || project.image;
            img.onload = resolve;
            img.onerror = resolve;
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

  // Handle resume download
  const handleDownloadResume = () => {
    // Path to your resume file in the public folder
    const resumePath = "/resume/aklilu_resume.pdf";

    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Aklilu_Resume.pdf"; // The filename that will be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loading skeleton for project cards
  const ProjectCardSkeleton = () => (
    <div className="relative group cursor-pointer w-[280px] sm:w-[300px] flex-shrink-0 animate-pulse">
      <div className="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-[4/5]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-4 space-y-2 px-1">
        <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 sm:h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  );

  // Loading state component
  if (isLoading) {
    return (
      <main className="min-h-screen overflow-x-hidden">
        {/* Floating Icons Component - Hidden on mobile for performance */}
        <div className="hidden md:block">
          <FloatingIcons />
        </div>

        {/* Hero Section - Mobile Optimized */}
        <section className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <Badge
                variant="outline"
                className="text-xs sm:text-sm text-[#0047FF] border-[#0047FF]/30 mb-2 sm:mb-4"
              >
                Self-Taught Designer & Video Editor
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                  HOLA!
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
                  I am Aklilu.
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                I'm a creative and hands-on Graphic Designer with a passion for
                bringing ideas to life through visual design. From social media
                posts to product packaging and websites, I love crafting designs
                that are both eye-catching and on-brand.
              </p>

              {/* Skills Pills - Scrollable on mobile */}
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Badge className="bg-[#0047FF]/10 text-[#0047FF] hover:bg-[#0047FF]/20 border-0 text-xs sm:text-sm">
                  <PenTool className="w-3 h-3 mr-1" /> Photoshop
                </Badge>
                <Badge className="bg-[#00D1FF]/10 text-[#00D1FF] hover:bg-[#00D1FF]/20 border-0 text-xs sm:text-sm">
                  <Layers className="w-3 h-3 mr-1" /> Illustrator
                </Badge>
                <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-0 text-xs sm:text-sm">
                  <Type className="w-3 h-3 mr-1" /> InDesign
                </Badge>
                <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-0 text-xs sm:text-sm">
                  <Video className="w-3 h-3 mr-1" /> Video Editor
                </Badge>
              </div>

              <Button
                onClick={handleDownloadResume}
                className="mt-2 sm:mt-4 bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Download Resume <Move className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full max-w-md mx-auto md:max-w-none">
              <HeroImage />
            </div>
          </div>
        </section>

        {/* Selected Works Section - Mobile Optimized */}
        <section
          id="selected-works"
          className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-[#0047FF]/20 to-[#00D1FF]/20 rounded-full blur-3xl -z-10" />

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 tracking-tighter">
                SELECTED{" "}
                <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent relative block sm:inline">
                  WORKS
                  <svg
                    className="absolute -bottom-2 left-0 w-full hidden sm:block"
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
              <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4">
                A collection of my favorite projects spanning branding, print,
                motion, and video
              </p>
            </div>

            {/* Filter Buttons - Scrollable on mobile */}
            <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16 overflow-x-auto pb-2 sm:pb-0 px-4 -mx-4 sm:mx-0 scrollbar-hide">
              {["all", "branding", "print", "motion", "video"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => filterProjects(cat)}
                  disabled
                  className={`
                    flex-shrink-0 relative px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                    text-gray-400 dark:text-gray-600 cursor-not-allowed
                  `}
                >
                  <span className="relative z-10 whitespace-nowrap">
                    {cat.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>

            {/* Loading State */}
            <div className="relative w-full overflow-hidden py-4">
              {/* Gradient Fade Edges - Adjusted for mobile */}
              <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
              <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />

              {/* Loading indicator */}
              <div className="flex justify-center items-center mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF] animate-spin" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Loading amazing projects...
                  </span>
                </div>
              </div>

              {/* Skeleton Cards - Single row on mobile */}
              <div className="flex gap-3 sm:gap-4 animate-pulse">
                {[...Array(4)].map((_, index) => (
                  <ProjectCardSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section - Mobile Optimized */}
        <section
          id="about-me"
          className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent via-[#0047FF]/5 to-transparent"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                <Badge
                  variant="outline"
                  className="text-xs sm:text-sm text-[#0047FF] border-[#0047FF]/30"
                >
                  ABOUT ME
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                  Self-Taught{" "}
                  <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent block sm:inline">
                    Creative Mind
                  </span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
                  I'm a self-taught graphic designer and video editor with a
                  passion for visual storytelling. My journey started with
                  curiosity and grew into a profession through countless hours
                  of practice and experimentation.
                </p>

                {/* Skills Grid - Responsive */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-[#0047FF]/10 rounded-lg">
                        <PenTool className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF]" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold">
                          Photoshop
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Raster Editing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-[#00D1FF]/10 rounded-lg">
                        <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D1FF]" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold">
                          Illustrator
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Vector Design
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-purple-500/10 rounded-lg">
                        <Type className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold">
                          InDesign
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Layout Design
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-orange-500/10 rounded-lg">
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold">
                          Video Editing
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Premiere Pro
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards - Responsive Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-[#0047FF]" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black">
                      1+
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Years Exp.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Palette className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-[#00D1FF]" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black">
                      50+
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">Projects</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl col-span-2">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-purple-500" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black">
                      100%
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Satisfaction
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Hire Me Section - Mobile Optimized */}
        <section
          id="hire-me"
          className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <Badge
                variant="outline"
                className="text-xs sm:text-sm text-[#0047FF] border-[#0047FF]/30 mb-3 sm:mb-4"
              >
                LET'S WORK TOGETHER
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-4">
                Hire{" "}
                <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
                Have a project in mind? Let's bring your ideas to life
              </p>
            </div>

            {/* Contact Cards - Stack on mobile, grid on tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-[#0047FF]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0047FF]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">
                    Email
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 break-all px-2">
                    Jornalistaklilu@gmail.com
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-[#00D1FF]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D1FF]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">
                    Phone
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    +251 99 383 4681
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl hover:shadow-2xl transition-shadow sm:col-span-2 md:col-span-1">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">
                    Location
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Addis Ababa, Ethiopia
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="mt-6 sm:mt-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium">
                        Name
                      </label>
                      <Input
                        placeholder="Your name"
                        className="bg-white dark:bg-gray-800 text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-white dark:bg-gray-800 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium">
                      Project Type
                    </label>
                    <select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md text-sm">
                      <option>Branding</option>
                      <option>Print Design</option>
                      <option>Motion Graphics</option>
                      <option>Video Editing</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      className="min-h-[100px] sm:min-h-[120px] bg-white dark:bg-gray-800 text-sm"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:opacity-90 transition-opacity text-sm sm:text-base py-2 sm:py-3">
                    Send Message <Send className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
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
    <main className="min-h-screen overflow-x-hidden">
      {/* Floating Icons Component - Hidden on mobile */}
      <div className="hidden md:block">
        <FloatingIcons />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <Badge
              variant="outline"
              className="text-xs sm:text-sm text-[#0047FF] border-[#0047FF]/30 mb-2 sm:mb-4"
            >
              Self-Taught Designer & Video Editor
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="block bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                HOLA!
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
                I am Aklilu.
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              I'm a creative and hands-on Graphic Designer with a passion for
              bringing ideas to life through visual design. From social media
              posts to product packaging and websites, I love crafting designs
              that are both eye-catching and on-brand. I'm easy to work with,
              detail-oriented, and always up for a creative challenge.
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
              <Badge className="bg-[#0047FF]/10 text-[#0047FF] hover:bg-[#0047FF]/20 border-0 text-xs sm:text-sm">
                <PenTool className="w-3 h-3 mr-1" /> Photoshop
              </Badge>
              <Badge className="bg-[#00D1FF]/10 text-[#00D1FF] hover:bg-[#00D1FF]/20 border-0 text-xs sm:text-sm">
                <Layers className="w-3 h-3 mr-1" /> Illustrator
              </Badge>
              <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-0 text-xs sm:text-sm">
                <Type className="w-3 h-3 mr-1" /> InDesign
              </Badge>
              <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-0 text-xs sm:text-sm">
                <Video className="w-3 h-3 mr-1" /> Video Editor
              </Badge>
            </div>

            <Button
              onClick={handleDownloadResume}
              className="mt-2 sm:mt-4 bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              Download Resume <Move className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full max-w-md mx-auto md:max-w-none">
            <HeroImage />
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section
        id="selected-works"
        className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-[#0047FF]/20 to-[#00D1FF]/20 rounded-full blur-3xl -z-10" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 tracking-tighter">
              SELECTED{" "}
              <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent relative block sm:inline">
                WORKS
                <svg
                  className="absolute -bottom-2 left-0 w-full hidden sm:block"
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
            <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4">
              A collection of my favorite projects spanning branding, print,
              motion, and video
            </p>
          </div>

          {/* Filter Buttons - Scrollable on mobile */}
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16 overflow-x-auto pb-2 sm:pb-0 px-4 -mx-4 sm:mx-0 scrollbar-hide">
            {["all", "branding", "print", "motion", "video"].map((cat) => (
              <button
                key={cat}
                onClick={() => filterProjects(cat)}
                className={`
                  flex-shrink-0 relative px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
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
                  className={`relative z-10 whitespace-nowrap ${activeFilter === cat ? "text-white" : ""}`}
                >
                  {cat.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* Carousel - Responsive */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />

            {/* First Scrolling Row */}
            <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4 marquee-right-to-left">
              {[
                ...filteredProjects,
                ...filteredProjects,
                ...filteredProjects,
                ...filteredProjects,
              ].map((project, index) => (
                <div
                  key={`${project.id}-${index}-1`}
                  className="w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {/* Second Scrolling Row */}
            <div className="flex gap-3 sm:gap-4 marquee-left-to-right">
              {[
                ...filteredProjects,
                ...filteredProjects,
                ...filteredProjects,
                ...filteredProjects,
              ].map((project, index) => (
                <div
                  key={`${project.id}-${index}-2`}
                  className="w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about-me"
        className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent via-[#0047FF]/5 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              <Badge
                variant="outline"
                className="text-xs sm:text-sm text-[#0047FF] border-[#0047FF]/30"
              >
                ABOUT ME
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                Self-Taught{" "}
                <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent block sm:inline">
                  Creative Mind
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
                I'm a self-taught graphic designer and video editor with a
                passion for visual storytelling. My journey started with
                curiosity and grew into a profession through countless hours of
                practice and experimentation.
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-[#0047FF]/10 rounded-lg">
                      <PenTool className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold">
                        Photoshop
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Raster Editing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-[#00D1FF]/10 rounded-lg">
                      <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D1FF]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold">
                        Illustrator
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Vector Design
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-purple-500/10 rounded-lg">
                      <Type className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold">
                        InDesign
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Layout Design
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-orange-500/10 rounded-lg">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold">
                        Video Editing
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Premiere Pro
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-[#0047FF]" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black">
                    1+
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">Years Exp.</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-[#00D1FF]" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black">
                    50+
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">Projects</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl col-span-2">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-purple-500" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black">
                    100%
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Satisfaction
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hire Me Section */}
      <section
        id="hire-me"
        className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <Badge
              variant="outline"
              className="text-xs sm:text-sm text-[#0047FF] border-[#0047FF]/30 mb-3 sm:mb-4"
            >
              LET'S WORK TOGETHER
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-4">
              Hire{" "}
              <span className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
              Have a project in mind? Let's bring your ideas to life
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-[#0047FF]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0047FF]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">
                  Email
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 break-all px-2">
                  Jornalistaklilu@gmail.com
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-[#00D1FF]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D1FF]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">
                  Phone
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  +251 99 383 4681
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl hover:shadow-2xl transition-shadow sm:col-span-2 md:col-span-1">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">
                  Location
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Addis Ababa, Ethiopia
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="mt-6 sm:mt-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-lg sm:shadow-xl">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium">
                      Name
                    </label>
                    <Input
                      placeholder="Your name"
                      className="bg-white dark:bg-gray-800 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white dark:bg-gray-800 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium">
                    Project Type
                  </label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md text-sm">
                    <option>Branding</option>
                    <option>Print Design</option>
                    <option>Motion Graphics</option>
                    <option>Video Editing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    className="min-h-[100px] sm:min-h-[120px] bg-white dark:bg-gray-800 text-sm"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:opacity-90 transition-opacity text-sm sm:text-base py-2 sm:py-3">
                  Send Message <Send className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Project } from "@/types/project";
import {
  Play,
  Image as ImageIcon,
  Menu,
  X,
  Filter,
  ChevronRight,
  Sparkles,
  Camera,
  Video,
  Palette,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

// Category icons mapping
const categoryIcons = {
  all: Layers,
  branding: Palette,
  print: ImageIcon,
  motion: Play,
  video: Video,
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const projectVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    branding: 0,
    print: 0,
    motion: 0,
    video: 0,
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/api/projects/`);
      const data = await res.json();
      setProjects(data);
      setFilteredProjects(data);

      // Calculate stats
      const counts = data.reduce((acc: any, project: Project) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        acc.total++;
        return acc;
      }, {});
      setStats(counts);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjects = (category: string) => {
    setActiveFilter(category);
    setFilteredProjects(
      category === "all"
        ? projects
        : projects.filter((p) => p.category === category),
    );
    setIsFilterOpen(false);
  };

  const categories = [
    { id: "all", label: "All Work", icon: Layers },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "print", label: "Print", icon: ImageIcon },
    { id: "motion", label: "Motion", icon: Play },
    { id: "video", label: "Video", icon: Video },
  ];

  return (
    <motion.main
      initial="initial"
      animate="animate"
      className="min-h-screen bg-background"
    >
      {/* Header Section */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Creative Portfolio
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="#work"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Work
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <ThemeToggle />
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-label="Toggle menu"
              >
                {isFilterOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t"
              >
                <div className="py-4 space-y-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const count = stats[cat.id as keyof typeof stats] || 0;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => filterProjects(cat.id)}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                          activeFilter === cat.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{cat.label}</span>
                        </span>
                        <Badge
                          variant={
                            activeFilter === cat.id ? "secondary" : "outline"
                          }
                        >
                          {count}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Graphic Design & Video Editing
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Creative Vision,
              </span>
              <br />
              <span className="text-foreground">Digital Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transforming ideas into visual stories through innovative design
              and compelling video content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#work">
                  View Portfolio
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">Let's Talk</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Filter Section */}
      <section
        id="work"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4 md:mb-0"
          >
            Selected Works
          </motion.h2>

          {/* Desktop Filter Buttons */}
          <motion.div
            variants={fadeInUp}
            className="hidden md:flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count = stats[cat.id as keyof typeof stats] || 0;
              return (
                <Button
                  key={cat.id}
                  variant={activeFilter === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterProjects(cat.id)}
                  className="relative group"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {cat.label}
                  {count > 0 && (
                    <Badge
                      variant={
                        activeFilter === cat.id ? "secondary" : "outline"
                      }
                      className="ml-2"
                    >
                      {count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </motion.div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-xl" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const CategoryIcon =
                  categoryIcons[
                    project.category as keyof typeof categoryIcons
                  ] || ImageIcon;

                return (
                  <motion.div
                    key={project.id}
                    variants={projectVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                    layout
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Category Badge */}
                        <Badge
                          variant="secondary"
                          className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        >
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {project.category_display}
                        </Badge>

                        {/* Media Type Indicator */}
                        {project.video_url && (
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="mt-4 space-y-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description ||
                            "Click to view project details"}
                        </p>

                        {/* Project Meta */}
                        <div className="flex items-center space-x-2 pt-2">
                          <Badge variant="outline" className="text-xs">
                            {project.year || "2024"}
                          </Badge>
                          <Separator orientation="vertical" className="h-3" />
                          <span className="text-xs text-muted-foreground">
                            {project.client || "Personal Project"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div variants={fadeInUp} className="text-center py-16">
            <div className="bg-muted rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              No projects match the selected category.
            </p>
            <Button onClick={() => filterProjects("all")}>
              View all projects
            </Button>
          </motion.div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">
                About Me
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Crafting Visual Stories That Matter
              </h2>
              <p className="text-muted-foreground mb-6">
                With over 5 years of experience in graphic design and video
                editing, I help brands tell their stories through compelling
                visual content. From branding to motion graphics, every project
                is approached with creativity and attention to detail.
              </p>
              <div className="space-y-4">
                {[
                  "10+ Happy Clients",
                  "50+ Projects Completed",
                  "3 Industry Awards",
                ].map((stat, index) => (
                  <motion.div
                    key={stat}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{stat}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/about-image.jpg"
                  alt="About me"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-6 shadow-lg">
                <p className="text-sm text-muted-foreground">
                  Years of experience
                </p>
                <p className="text-4xl font-bold">5+</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Badge variant="outline" className="mb-4">
              Get in Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-muted-foreground mb-8">
              Ready to bring your vision to life? Whether you need branding,
              motion graphics, or video editing, I'm here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="mailto:hello@example.com">Start a Conversation</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/resume.pdf" target="_blank">
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Creative Portfolio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Behance
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </motion.main>
  );
}

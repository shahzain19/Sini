import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BlobCursor from "../components/BlobCursor";
import AdminLogin from "../components/AdminLogin";
import {
  BiCode,
  BiPalette,
  BiServer,
  BiMobile,
  BiRocket,
} from "react-icons/bi";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaExternalLinkAlt,
  FaStar,
  FaEye,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import "../styles/animations.css";

const portfolioItems = [
  {
    title: "Cold Mail Pro",
    description:
      "Full-stack email automation platform with advanced analytics and conversion tracking.",
    image: "/ColdMailPro.png",
    category: "Full-Stack",
    tech: ["React", "Node.js", "Gemini AI", "Email APIs"],
  },
  {
    title: "BearStacks Library",
    description:
      "Modern digital library platform with medieval aesthetics and real-time collaboration.",
    image: "/Lib.png",
    category: "Full-Stack",
    tech: ["React", "Tailwind", "Supabase", "Node"],
  },
  {
    title: "OLPT Builder",
    description: "No-code website builder like bolt.new",
    image: "/OLPT.png",
    category: "Full-Stack",
    tech: ["React", "Node.js", "Gemini AI", "Next js"],
  },
  {
    title: "Rizzapedia",
    description:
      "Wikipedia clone with enhanced UX, real-time editing, and collaborative features.",
    image: "/Rizzapedia.png",
    link: "https://dancing-cheesecake-cac9c1.netlify.app/",
    category: "Frontend",
    tech: ["React", "TypeScript", "Tailwind", "React Markdown"],
  },
  {
    title: "Resto",
    description:
      "Restaurant management system with reservations, menu management, and POS integration.",
    image: "/Resto.png",
    link: "https://resto-lyart.vercel.app/",
    category: "Full-Stack",
    tech: ["Vite", "React", "Tailwind"],
  },
  {
    title: "Photography Portfolio",
    description:
      "Premium photography showcase with advanced gallery features and client portals.",
    image: "/Photography.png",
    link: "https://photography-t25i.vercel.app/",
    category: "Design",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Men's Salon Platform",
    description:
      "Complete salon management system with booking, staff scheduling, and payment processing.",
    image: "/MenSalon.png",
    link: "https://men-salon-pku2.vercel.app/",
    category: "Full-Stack",
    tech: ["React", "Node.js"],
  },
  {
    title: "Collaborative Editor",
    description:
      "Real-time document editor with Google Docs functionality and team collaboration tools.",
    image: "/Ohionet.png",
    link: "https://aquamarine-sunflower-1c7780.netlify.app/",
    category: "Full-Stack",
    tech: ["React", "Socket.io", "Supbase", "Supabase"],
  },
  {
    title: "PromptVault",
    description:
      "AI prompt management platform with community sharing and advanced categorization.",
    image: "/PromptVault.png",
    link: "https://prompt-vault-5qax.vercel.app/",
    category: "Full-Stack",
    tech: ["React", "Supabase", "Tailwind"],
  },
];

const skills = [
  {
    category: "Frontend Development",
    icon: "🎨",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Three.js",
    ],
  },
  {
    category: "Backend Development",
    icon: "⚙️",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "AWS",
      "Docker",
    ],
  },
  {
    category: "Design & UX",
    icon: "✨",
    skills: [
      "Figma",
      "Adobe Creative Suite",
      "UI/UX Design",
      "Prototyping",
      "Brand Identity",
      "Motion Graphics",
    ],
  },
  {
    category: "Game Development",
    icon: "🎮",
    skills: [
      "Unity",
      "C#",
      "Unreal Engine",
      "Blender",
      "Game Design",
      "2D/3D Graphics",
      "Physics",
    ],
  },
];

const LandingPage = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminProjects, setAdminProjects] = useState([]);
  const [allProjects, setAllProjects] = useState(portfolioItems);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [refreshClickCount, setRefreshClickCount] = useState(0);

  // Load projects from localStorage and optionally fetch from server
  useEffect(() => {
    const loadProjectsFromStorage = () => {
      try {
        const storedProjects = localStorage.getItem("adminProjects");
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects);
          setAdminProjects(parsedProjects);
          setAllProjects([...portfolioItems, ...parsedProjects]);
          console.log(
            "Loaded projects from localStorage:",
            parsedProjects.length
          );
          return parsedProjects;
        }
      } catch (error) {
        console.error("Failed to load projects from localStorage:", error);
      }
      return [];
    };

    const fetchAndStoreProjects = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/projects");
        if (response.ok) {
          const projects = await response.json();

          // Transform admin projects to match portfolio format
          const transformedProjects = projects.map((project) => {
            let techArray = ["Dynamic"];
            try {
              if (project.tech) {
                const parsed = JSON.parse(project.tech);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  techArray = parsed;
                }
              }
            } catch (error) {
              console.log("Failed to parse tech for project:", project.title);
            }

            return {
              title: project.title,
              description: project.description,
              image: project.image
                ? `http://localhost:3001${project.image}`
                : "/ColdMailPro.png",
              link: project.link || null,
              category: project.category || "Full-Stack",
              tech: techArray,
              isAdminProject: true,
            };
          });

          // Store in localStorage for offline access
          localStorage.setItem(
            "adminProjects",
            JSON.stringify(transformedProjects)
          );
          localStorage.setItem(
            "adminProjectsLastUpdate",
            Date.now().toString()
          );

          setAdminProjects(transformedProjects);
          setAllProjects([...portfolioItems, ...transformedProjects]);
          console.log(
            "Fetched and stored projects from server:",
            transformedProjects.length
          );
        }
      } catch (error) {
        console.error("Server offline or failed to fetch projects:", error);
        // Server is offline, keep using localStorage data
      }
    };

    // Load from localStorage first (immediate, works offline)
    const storedProjects = loadProjectsFromStorage();

    // If no stored projects, show just the hardcoded ones
    if (storedProjects.length === 0) {
      setAllProjects(portfolioItems);
    }

    // Then try to fetch from server (non-blocking, updates cache)
    fetchAndStoreProjects();

    // Set up periodic refresh every 60 seconds (less frequent since we have offline support)
    const interval = setInterval(fetchAndStoreProjects, 60000);

    return () => clearInterval(interval);
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log("Back online - refreshing projects");
      refreshProjects();
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log("Gone offline - using cached projects");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Function to refresh projects (can be called manually or when admin adds new projects)
  const refreshProjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/projects");
      if (response.ok) {
        const projects = await response.json();

        const transformedProjects = projects.map((project) => {
          let techArray = ["Dynamic"];
          try {
            if (project.tech) {
              const parsed = JSON.parse(project.tech);
              if (Array.isArray(parsed) && parsed.length > 0) {
                techArray = parsed;
              }
            }
          } catch (error) {
            console.log("Failed to parse tech for project:", project.title);
          }

          return {
            title: project.title,
            description: project.description,
            image: project.image
              ? `http://localhost:3001${project.image}`
              : "/ColdMailPro.png",
            link: project.link || null,
            category: project.category || "Full-Stack",
            tech: techArray,
            isAdminProject: true,
          };
        });

        // Update localStorage
        localStorage.setItem(
          "adminProjects",
          JSON.stringify(transformedProjects)
        );
        localStorage.setItem("adminProjectsLastUpdate", Date.now().toString());

        setAdminProjects(transformedProjects);
        setAllProjects([...portfolioItems, ...transformedProjects]);
        console.log(
          "Projects refreshed from server:",
          transformedProjects.length
        );
      }
    } catch (error) {
      console.error("Server offline - using cached projects:", error);
      // If server is offline, just reload from localStorage
      try {
        const storedProjects = localStorage.getItem("adminProjects");
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects);
          setAdminProjects(parsedProjects);
          setAllProjects([...portfolioItems, ...parsedProjects]);
        }
      } catch (storageError) {
        console.error("Failed to load from localStorage:", storageError);
      }
    }
  };

  // Function to clear cached projects (useful for debugging)
  const clearProjectCache = () => {
    localStorage.removeItem("adminProjects");
    localStorage.removeItem("adminProjectsLastUpdate");
    setAdminProjects([]);
    setAllProjects(portfolioItems);
    console.log("Project cache cleared");
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex flex-col items-center text-center px-6 pt-32 pb-32 overflow-hidden min-h-screen">
        <div className="absolute inset-0"></div>

        {/* Floating elements */}
      

        <div className="z-10 max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20 shadow-lg">
              <HiSparkles className="w-4 h-4 text-emerald-400" />
              Available for new projects
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </span>
          </div>

          <div className="mb-8 animate-fade-in-up animation-delay-200">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight tracking-tight">
              Shahzain
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-20"></div>
              <HiLightningBolt className="w-6 h-6 text-yellow-400 animate-pulse" />
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-20"></div>
            </div>
          </div>

          <div className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 mb-8 max-w-4xl animate-fade-in-up animation-delay-400">
            <span className="block mb-3 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Full-Stack Developer
            </span>
            <div className="flex flex-wrap justify-center gap-4 text-lg md:text-xl text-white/70">
              <span className="flex items-center gap-2">
                <BiPalette className="w-5 h-5 text-purple-400" />
                Designer
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-2">Game Developer</span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-2">
                <HiSparkles className="w-5 h-5 text-yellow-400" />
                Digital Craftsman
              </span>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-600">
            I create{" "}
            <span className="text-blue-300 font-semibold">
              exceptional digital experiences
            </span>{" "}
            from concept to deployment. Specializing in{" "}
            <span className="text-purple-300 font-semibold">
              modern web applications
            </span>
            ,
            <span className="text-cyan-300 font-semibold">
              {" "}
              stunning user interfaces
            </span>
            , and{" "}
            <span className="text-green-300 font-semibold">
              immersive game experiences
            </span>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-800">
            <a
              href="#projects"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center gap-3">
                <FaEye className="w-5 h-5" />
                View My Work
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </span>
            </a>
            <a
              href="#contact"
              className="group px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-white/10"
            >
              <span className="flex items-center gap-3">
                <HiSparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Let's Talk
              </span>
            </a>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-1000">
            <div className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                50+
              </div>
              <div className="text-white/80 font-medium">
                Projects Delivered
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 group-hover:w-16 transition-all duration-300"></div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text mb-2">
                3+
              </div>
              <div className="text-white/80 font-medium">Years Experience</div>
              <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mx-auto mt-3 group-hover:w-16 transition-all duration-300"></div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                100%
              </div>
              <div className="text-white/80 font-medium">
                Client Satisfaction
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mt-3 group-hover:w-16 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </main>

      <BlobCursor
        blobType="circle"
        fillColor="#00f0ff"
        trailCount={3}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      />

      {/* Skills & Expertise */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What I Do Best
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From pixel-perfect designs to scalable backend systems, I bring
              ideas to life across the entire digital spectrum.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 border border-zinc-700/50 hover:border-zinc-500/70 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-2 text-xs bg-zinc-800/70 text-gray-300 rounded-full border border-zinc-700/50 hover:bg-zinc-700/70 hover:text-white hover:border-zinc-600/70 transition-all duration-200 transform hover:scale-105"
                        style={{ animationDelay: `${techIndex * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How I Can Help You
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            End-to-end solutions that drive results and exceed expectations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300">
            <BiCode className="text-5xl text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-4 text-white">
              Full-Stack Development
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Complete web applications from database design to user interface,
              built with modern technologies and best practices.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300">
            <BiPalette className="text-5xl text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-4 text-white">UI/UX Design</h3>
            <p className="text-gray-400 leading-relaxed">
              User-centered design that combines aesthetics with functionality,
              creating intuitive and engaging experiences.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/30 hover:border-green-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Game Development
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Interactive games and experiences using Unity, Unreal Engine, and
              web technologies for multiple platforms.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-700/30 hover:border-orange-500/50 transition-all duration-300">
            <BiServer className="text-5xl text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-4 text-white">
              Backend & APIs
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Scalable server architectures, RESTful APIs, and database
              solutions that power your applications reliably.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-700/30 hover:border-cyan-500/50 transition-all duration-300">
            <BiMobile className="text-5xl text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-4 text-white">
              Mobile-First Design
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Responsive designs that work flawlessly across all devices,
              ensuring optimal user experience everywhere.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-900/20 to-pink-800/10 border border-pink-700/30 hover:border-pink-500/50 transition-all duration-300">
            <BiRocket className="text-5xl text-pink-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-4 text-white">
              Performance Optimization
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Lightning-fast applications optimized for speed, SEO, and user
              engagement that convert visitors into customers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section
        id="projects"
        className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111111]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <button
                onClick={() => {
                  const newCount = refreshClickCount + 1;
                  setRefreshClickCount(newCount);

                  if (newCount >= 5) {
                    clearProjectCache();
                    setRefreshClickCount(0);
                  } else {
                    refreshProjects();
                    // Reset count after 2 seconds
                    setTimeout(() => setRefreshClickCount(0), 2000);
                  }
                }}
                className="p-2 rounded-full bg-zinc-800/50 text-gray-400 hover:text-white hover:bg-zinc-700/50 transition-all duration-300 group"
                title={
                  refreshClickCount >= 3
                    ? `Click ${5 - refreshClickCount} more times to clear cache`
                    : "Refresh projects"
                }
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A showcase of projects that demonstrate my expertise across
              different domains and technologies.
            </p>
            {adminProjects.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-emerald-400">
                  Including {adminProjects.length} project
                  {adminProjects.length !== 1 ? "s" : ""} from admin panel
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOnline ? "bg-green-400" : "bg-orange-400"
                    }`}
                  ></span>
                  {isOnline
                    ? (() => {
                        const lastUpdate = localStorage.getItem(
                          "adminProjectsLastUpdate"
                        );
                        if (lastUpdate) {
                          const updateTime = new Date(parseInt(lastUpdate));
                          return `Last synced: ${updateTime.toLocaleTimeString()}`;
                        }
                        return "Connected";
                      })()
                    : "Offline - showing cached projects"}
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {allProjects.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 border border-zinc-700/50 hover:border-zinc-500/70 transition-all duration-700 hover:transform hover:scale-105 hover:-rotate-1 shadow-2xl hover:shadow-blue-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Floating particles on hover */}
                  <div className="absolute top-6 right-6 w-2 h-2 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                  <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`px-4 py-2 text-xs font-bold rounded-full backdrop-blur-sm border shadow-lg ${
                        item.category === "Full-Stack"
                          ? "bg-blue-500/30 text-blue-200 border-blue-400/50"
                          : item.category === "Frontend"
                          ? "bg-green-500/30 text-green-200 border-green-400/50"
                          : item.category === "Admin"
                          ? "bg-orange-500/30 text-orange-200 border-orange-400/50"
                          : "bg-purple-500/30 text-purple-200 border-purple-400/50"
                      }`}
                    >
                      {item.category}
                    </span>
                    {item.isAdminProject && (
                      <span className="px-3 py-2 text-xs font-bold rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 backdrop-blur-sm shadow-lg animate-pulse">
                        <FaStar className="w-3 h-3 inline mr-1" />
                        New
                      </span>
                    )}
                  </div>

                  {/* Hover overlay with view button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <FaEye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="relative p-8 z-10">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-2 text-xs bg-zinc-800/70 text-gray-300 rounded-full border border-zinc-700/50 hover:bg-zinc-700/70 hover:text-white hover:border-zinc-600/70 transition-all duration-200 transform hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.tech.length > 3 && (
                      <span className="px-3 py-2 text-xs text-gray-500 bg-zinc-800/30 rounded-full border border-zinc-700/30">
                        +{item.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 hover:text-white border border-blue-500/30 hover:border-blue-400/50 rounded-full text-sm font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105 group/link"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      View Live Project
                      <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/shahzain19"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <FaGithub className="mr-2" />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 px-6 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-black relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let’s Work Together</h2>
          <p className="text-gray-400 mb-8">
            Got a project or idea? I’d love to hear from you.
          </p>
          <a
            href="mailto:sadshahzain20@gmail.com"
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Contact Me
          </a>
          <p className="text-sm text-gray-500 mt-4">
            or email me directly at:{" "}
            <span className="underline">sadshahzain20@gmail.com</span>
          </p>

          {/* Discrete Admin Access Button */}
          <button
            onClick={() => setShowAdminLogin(true)}
            className="absolute bottom-4 right-4 w-3 h-3 bg-gray-800 rounded-full opacity-30 hover:opacity-100 transition-opacity"
            title="Admin Access"
          />
        </div>
      </section>

      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
      />
    </div>
  );
};

export default LandingPage;

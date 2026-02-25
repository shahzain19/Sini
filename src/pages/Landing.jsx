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
import { FaGithub, FaExternalLinkAlt, FaEye, FaStar } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import "../styles/animations.css";

const portfolioItems = [
  {
    title: "Realm Forge",
    description:
      "AI-powered workspace for game developers, streamlining creation, testing, and collaboration.",
    image: "/RealmForge.png",
    link: "https://realm-forge-nine.vercel.app/",
    category: "Full-Stack",
    tech: ["React", "Tailwind", "AI Integration", "Node.js"],
  },
  {
    title: "Atlas",
    description:
      "Modern blogging platform with sleek UI/UX, real-time updates, and community features.",
    image: "/Atlas.png",
    link: "https://atlas-frontend-omega.vercel.app/",
    category: "Full-Stack",
    tech: ["React", "Next.js", "Tailwind", "Supabase"],
  },
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
];

const skills = [
  {
    category: "Frontend Development",
    icon: "🎨",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend Development",
    icon: "⚙️",
    skills: ["Node.js", "Express", "Supabase", "MongoDB", "Redis", "Docker"],
  },
  {
    category: "Design & UX",
    icon: "✨",
    skills: ["Figma", "UI/UX Design", "Prototyping", "Brand Identity"],
  },
  {
    category: "Game & AI Dev",
    icon: "🎮",
    skills: ["Unity", "C#", "Blender", "AI Integration", "Game Design"],
  },
];

const LandingPage = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex flex-col items-center text-center px-6 pt-32 pb-32 overflow-hidden">
        <div className="z-10 max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20 shadow-lg mb-8 animate-fade-in-up">
            <HiSparkles className="w-4 h-4 text-emerald-400" />
            Available for New Projects
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </span>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight tracking-tight animate-fade-in-up">
            Shahzain
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-20"></div>
            <HiLightningBolt className="w-6 h-6 text-yellow-400 animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-20"></div>
          </div>

          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 mb-8 max-w-3xl animate-fade-in-up">
            Crafting{" "}
            <span className="text-blue-300 font-semibold">modern SaaS platforms</span>,{" "}
            <span className="text-purple-300 font-semibold">interactive web apps</span>, and{" "}
            <span className="text-green-300 font-semibold">AI-powered tools</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
            <a
              href="#projects"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl overflow-hidden"
            >
              <span className="relative flex items-center gap-3">
                <FaEye className="w-5 h-5" />
                View My Work →
              </span>
            </a>
            <a
              href="#contact"
              className="group px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all hover:scale-105 shadow-xl"
            >
              <span className="flex items-center gap-3">
                <HiSparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Let's Talk
              </span>
            </a>
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

      {/* Skills Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            What I Do Best
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From interactive frontends to AI-powered platforms, I bring ideas to life.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-zinc-900/80 border border-zinc-700/50 hover:scale-105 transition-all duration-500"
            >
              <div className="text-5xl mb-6">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.skills.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-2 text-xs bg-zinc-800/70 text-gray-300 rounded-full border border-zinc-700/50 hover:bg-zinc-700/70 hover:text-white hover:border-zinc-600/70 transition-all duration-200 transform hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111111]"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A curated selection of projects that showcase my expertise.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden bg-zinc-900/80 border border-zinc-700/50 hover:scale-105 hover:-rotate-1 shadow-2xl transition-transform duration-700"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300" />
              </div>
              <div className="relative p-8 z-10">
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-zinc-800/70 text-gray-300 rounded-full border border-zinc-700/50 hover:bg-zinc-700/70 hover:text-white hover:border-zinc-600/70 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 hover:text-white border border-blue-500/30 hover:border-blue-400/50 rounded-full text-sm font-semibold backdrop-blur-sm transition-all duration-300"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    View Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/shahzain19"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all shadow-2xl"
          >
            <FaGithub className="mr-2" />
            View All Projects on GitHub
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 px-6 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-black text-center relative"
      >
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
          or email me directly at: <span className="underline">sadshahzain20@gmail.com</span>
        </p>

        <button
          onClick={() => setShowAdminLogin(true)}
          className="absolute bottom-4 right-4 w-3 h-3 bg-gray-800 rounded-full opacity-30 hover:opacity-100 transition-opacity"
          title="Admin Access"
        />
      </section>

      <AdminLogin isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </div>
  );
};

export default LandingPage;

import React from "react";
import Navbar from "../components/Navbar";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const portfolioItems = [
  {
    title: "Realm Forge",
    description:
      "AI-powered workspace for game developers, streamlining creation, testing, and collaboration.",
    image: "/RealmForge.png",
    link: "https://realm-forge-nine.vercel.app/",
    tech: ["React", "Tailwind", "AI Integration", "Node.js"],
  },
  {
    title: "Atlas",
    description:
      "Modern blogging platform with sleek UI/UX, real-time updates, and community features.",
    image: "/Atlas.png",
    link: "https://atlas-frontend-omega.vercel.app/",
    tech: ["React", "Next.js", "Tailwind", "Supabase"],
  },
  {
    title: "Cold Mail Pro",
    description:
      "Full-stack email automation platform with advanced analytics and conversion tracking.",
    image: "/ColdMailPro.png",
    link: "https://cold-mail-pro.vercel.app/",
    tech: ["React", "Node.js", "Gemini AI", "Email APIs"],
  },
  {
    title: "BearStacks Library",
    description:
      "Modern digital library platform with medieval aesthetics and real-time collaboration.",
    image: "/Lib.png",
    link: "https://bearstacks-library.vercel.app/",
    tech: ["React", "Tailwind", "Supabase", "Node"],
  },
];

const skills = [
  "React", "Next.js", "Tailwind CSS", "Node.js", "Supabase", 
  "Figma", "UI/UX Design", "C#", "Unity", "Blender"
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gray-50">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Sana Shahzain</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto text-gray-700">
          I build modern web apps, AI-powered tools, and digital platforms that solve real problems.
        </p>
        <a
          href="#portfolio"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          View My Work
        </a>
      </section>

      {/* About Me */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          I am a full-stack developer and UI/UX designer passionate about building tools that empower creators and businesses. From sleek web apps to AI-powered platforms, I focus on clean, functional, and user-friendly solutions. I love learning, exploring new technologies, and turning ideas into reality.
        </p>
      </section>

      {/* Skills */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-8">My Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-gray-800 text-sm hover:bg-blue-50 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Portfolio</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                >
                  View Live <FaExternalLinkAlt />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://github.com/shahzain19"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <FaGithub className="mr-2" /> See All Projects
          </a>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <p className="text-gray-700 mb-6">
          Got a project idea or want to work together? Reach out!
        </p>
        <a
          href="mailto:sadshahzain20@gmail.com"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Email Me
        </a>
      </section>
    </div>
  );
};

export default LandingPage;

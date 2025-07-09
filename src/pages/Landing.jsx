import React from "react";
import Navbar from "../components/Navbar";
import { BsLightning, BsChatDots } from "react-icons/bs";
import { BiMobile, BiCodeAlt, BiCheckCircle } from "react-icons/bi";
import { MdVerifiedUser, MdDesignServices } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import Aurora from "../components/Aurora";
import BlobCursor from "../components/BlobCursor";

const portfolioItems = [
  {
    title: "Cold Mail Pro",
    description: "A sleek, conversion-focused solution for cold emails.",
    image: "/ColdMailPro.png",
  },
  {
    title: "Library website ~ BearStacks",
    description: "A cozy, medieval and modern library website. read and write",
    image: "/Lib.png",
  },
  {
    title: "OLPT",
    description: "Create no-code websites using a drag-and-drop builder.",
    image: "/OLPT.png",
  },
  {
    title: "Wikipedia Clone",
    description: "A fun clone of Wikipedia with clean UI/UX.",
    image: "/Rizzapedia.png",
    link: "https://dancing-cheesecake-cac9c1.netlify.app/",
  },
  {
    title: "Resto",
    description: "A modern restaurant site with reservations and menus.",
    image: "/Resto.png",
    link: "https://resto-lyart.vercel.app/",
  },
  {
    title: "Photography Portfolio",
    description: "A sleek photography portfolio with clean navigation.",
    image: "/Photography.png",
    link: "https://photography-t25i.vercel.app/",
  },
  {
    title: "Men Salon",
    description: "A modern site for a men's salon with booking system.",
    image: "/MenSalon.png",
    link: "https://men-salon-pku2.vercel.app/",
  },
  {
    title: "Google Docs Clone",
    description: "Real-time Google Docs clone with rich text editing.",
    image: "/Ohionet.png",
    link: "https://aquamarine-sunflower-1c7780.netlify.app/",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex flex-col items-center text-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Aurora colorStops={["#54eb98", "#0fffdb", "#76ff61"]} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl z-10">
          Hi, I'm Shahzain. I build beautiful, fast websites that convert.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mt-6 z-10">
          Frontend developer, UI enthusiast, and passionate builder crafting
          websites that feel good and work better.
        </p>
        <a
          href="#contact"
          className="mt-8 bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition z-10"
        >
          Let's Connect
        </a>
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

      {/* Why Work With Me */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Work With Me</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BsLightning className="text-yellow-400" /> Fast Delivery
            </h3>
            <p className="text-gray-400">
              Quick turnaround with no compromise on quality.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BiMobile className="text-blue-400" /> Mobile-First Design
            </h3>
            <p className="text-gray-400">
              Responsive and performance-first sites for every screen.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BiCheckCircle className="text-green-400" /> Clean Code
            </h3>
            <p className="text-gray-400">
              Built with modern best practices and readability in mind.
            </p>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-20 px-6 max-w-6xl mx-auto bg-[#111111] rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-12">What I Do</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-lg border border-zinc-800 text-center">
            <MdDesignServices className="text-5xl text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
            <p className="text-gray-400">
              Interfaces that are both intuitive and visually pleasing.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800 text-center">
            <BiCodeAlt className="text-5xl text-blue-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
            <p className="text-gray-400">
              React, Tailwind, Vite, Next.js — I build with the best.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800 text-center">
            <MdVerifiedUser className="text-5xl text-yellow-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Performance & SEO</h3>
            <p className="text-gray-400">
              Optimized sites that load fast and rank well.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Projects</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg border border-zinc-800 bg-[#111111]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
                {item.link && (
                  <a href={item.link} className="text-blue-400 text-sm">
                    View Live →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <footer
        id="contact"
        className="bg-[#111111] py-20 px-6 text-center border-t border-gray-800"
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
          or email me directly at:{" "}
          <span className="underline">sadshahzain20@gmail.com</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

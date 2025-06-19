import React from "react";
import Navbar from "../components/Navbar";
import { BsLightning, BsChatDots } from "react-icons/bs";
import { BiMobile, BiMoney, BiCheckCircle } from "react-icons/bi";
import { MdMoney, MdVerifiedUser } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import Aurora from "../components/Aurora";
import BlobCursor from "../components/BlobCursor";


const portfolioItems = [
  {
    title: "Cold Mail Pro",
    description:
      "A sleek, conversion-focused solution for cold messages and emails to clients.",
    image: "/ColdMailPro.png",
  },
  {
    title: "OLPT",
    description:
      "Create No code websites with ease using our intuitive platform.",
    image: "/OLPT.png",
  },
  {
    title: "Wikipedia",
    description:
      "Clone of the famous Wikipedia, with a focus on user-friendly navigation.",
    image: "/Rizzapedia.png",
    link: "https://dancing-cheesecake-cac9c1.netlify.app/",
  },
  {
    title: "Resto",
    description:
      "A modern restaurant website with online reservation and menu features.",
    image: "/Resto.png",
    link: "https://resto-lyart.vercel.app/",
  },
  {
    title: "Photography Portfolio",
    description:
      "A modern Photography portfolio showcasing stunning visuals and easy navigation.",
    image: "/Photography.png",
    link: "https://photography-t25i.vercel.app/",
  },
  {
    title: "Men Salon",
    description:
      "A sleek and modern website for a men’s salon, featuring booking and service details.",
    image: "/MenSalon.png",
    link: "https://men-salon-pku2.vercel.app/",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <main className="relative flex flex-col items-center text-center px-6 pt-32 pb-20  overflow-hidden">
        {/* Aurora background */}
        <div className="absolute inset-0">
          <Aurora
            colorStops={["#54eb98", "#0fffdb", "#76ff61"]}
            blend={0.8}
            amplitude={3}
            speed={1.3}
          />
        </div>

        {/* Main content */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl z-10">
          Look Like a Million-Dollar Brand — Without Spending It
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mt-6 z-10">
          Get a high-converting, scroll-stopping website built for your audience
          — mobile-first, lightning-fast, and live in just 3 days.
        </p>
        <a
          href="#contact"
          className="mt-8 bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition z-10"
        >
          Get Started for Just $99
        </a>
        <p className="text-sm text-gray-400 mt-3">
          Book your build now — 100% risk-free with our satisfaction guarantee.
        </p>
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

      {/* Benefits Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BsLightning className="text-yellow-400" /> Super Fast Delivery
            </h3>
            <p className="text-gray-400">
              Launch in as little as 3 days with our optimized workflow.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BiMobile className="text-blue-400" /> Mobile-First Design
            </h3>
            <p className="text-gray-400">
              Stunning on any device — phones, tablets, desktops.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BiMoney className="text-green-400" /> Affordable Pricing
            </h3>
            <p className="text-gray-400">
              Professional design without the agency price tag.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto bg-[#111111] rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-12">
          What We Build For You
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-lg border border-zinc-800 flex flex-col items-center text-center">
            <MdMoney className="text-5xl text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Custom Website Design
            </h3>
            <p className="text-gray-400">
              Tailored sites that look and feel like your brand — not a
              template.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800 flex flex-col items-center text-center">
            <BiCheckCircle className="text-5xl text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">E-Commerce Solutions</h3>
            <p className="text-gray-400">
              Launch a store that’s sleek, secure, and built to sell.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800 flex flex-col items-center text-center">
            <MdVerifiedUser className="text-5xl text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">SEO Optimization</h3>
            <p className="text-gray-400">
              Show up. Get found. Rank higher with built-in SEO.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-[#111111]">
        <h2 className="text-3xl font-semibold text-center mb-12">
          From Idea to Launch in 3 Simple Steps
        </h2>
        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="text-center">
            <AiOutlineClockCircle className="text-4xl text-yellow-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">1. Book Your Spot</h3>
            <p className="text-gray-400">
              Lock in your slot — we only take a limited number per week.
            </p>
          </div>
          <div className="text-center">
            <BsChatDots className="text-4xl text-blue-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">2. Share Your Vision</h3>
            <p className="text-gray-400">
              We’ll listen, plan, and map out your perfect site.
            </p>
          </div>
          <div className="text-center">
            <BiCheckCircle className="text-4xl text-green-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">3. Launch & Grow</h3>
            <p className="text-gray-400">
              Go live — optimized for traffic, conversions, and speed.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio / Showcase Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Work</h2>

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
                <a href={item.link} className="text-blue-400 text-sm">
                  {item.link}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6 bg-[#111111] text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <MdVerifiedUser className="text-4xl text-green-400 mb-2" />
            <p className="text-xl font-semibold">Money-Back Guarantee</p>
            <p className="text-gray-400 text-sm">
              We refund you 100% if you’re not satisfied.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BsChatDots className="text-4xl text-blue-400 mb-2" />
            <p className="text-xl font-semibold">24/7 Support</p>
            <p className="text-gray-400 text-sm">
              We’re always here if you need us.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        
        <h2 className="text-3xl font-semibold text-center mb-12">FAQs</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">
              How long does it take to launch?
            </h3>
            <p className="text-gray-400">
              Typically 3 business days, depending on requirements.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Can I request revisions?</h3>
            <p className="text-gray-400">
              Yes! We include up to 2 rounds of revisions free of charge.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Is hosting included?</h3>
            <p className="text-gray-400">
              We help you set up hosting on Netlify, Vercel, or your choice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <footer
        id="contact"
        className="bg-[#111111] py-20 px-6 text-center border-t border-gray-800"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Launch?</h2>
        <p className="text-gray-400 mb-8">
          Let’s build something beautiful. Fast. Affordable. Memorable.
        </p>
        <a
          href="mailto:sadshahzain20@gmail.com"
          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
        <p className="text-sm text-gray-500 mt-4">
          or email: <span className="underline">sadshahzain20@gmail.com</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

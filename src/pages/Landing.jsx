import React from 'react';
import Navbar from '../components/Navbar';
import { BsLightning, BsChatDots } from 'react-icons/bs';
import { BiMobile, BiMoney, BiCheckCircle } from 'react-icons/bi';
import { MdMoney, MdVerifiedUser } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 pt-32 pb-20 mt-8">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
          Premium Websites That Make You Look Like a Million-Dollar Brand
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mt-6">
          We build high-converting, mobile-first websites for startups, creators, and small businesses — ready in just 3 days.
        </p>
        <a
          href="#contact"
          className="mt-8 bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition"
        >
          Book Your Website Today
        </a>
        <p className="text-sm text-gray-400 mt-3">Starting at $99 — 100% Satisfaction Guaranteed</p>
      </main>

      {/* Benefits Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><BsLightning className='text-yellow-400'/> Super Fast Delivery</h3>
            <p className="text-gray-400">Launch in as little as 3 days with our optimized workflow.</p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><BiMobile className='text-blue-400'/> Mobile-First Design</h3>
            <p className="text-gray-400">Stunning on any device — phones, tablets, desktops.</p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><BiMoney className='text-green-400'/> Affordable Pricing</h3>
            <p className="text-gray-400">Professional design without the agency price tag.</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-[#111111]">
        <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="text-center">
            <AiOutlineClockCircle className="text-4xl text-yellow-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">1. Book Your Spot</h3>
            <p className="text-gray-400">Submit your request and secure your project slot.</p>
          </div>
          <div className="text-center">
            <BsChatDots className="text-4xl text-blue-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">2. Share Your Vision</h3>
            <p className="text-gray-400">Tell us about your goals, style, and content needs.</p>
          </div>
          <div className="text-center">
            <BiCheckCircle className="text-4xl text-green-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">3. Launch & Grow</h3>
            <p className="text-gray-400">Your website goes live, optimized for conversion.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id='testimonials' className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg border border-zinc-800">
            <p className="text-gray-300 mb-4">I needed a landing page for my business launch and they delivered good in 3 days. Totally worth it.</p>
            <div className="text-yellow-400 flex gap-1 mb-1">
              {Array(4).fill(null).map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="text-sm text-gray-500">— Not going to disclose the name, Renovation</p>
          </div>
          <div className="p-6 rounded-lg border border-zinc-800">
            <p className="text-gray-300 mb-4">"We used their service for our startup launch. Fast, responsive, and really professional work."</p>
            <div className="text-yellow-400 flex gap-1 mb-1">
              {Array(5).fill(null).map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="text-sm text-gray-500">— Mike R., SaaS Founder</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6 bg-[#111111] text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <MdVerifiedUser className="text-4xl text-green-400 mb-2" />
            <p className="text-xl font-semibold">Money-Back Guarantee</p>
            <p className="text-gray-400 text-sm">We refund you 100% if you’re not satisfied.</p>
          </div>
          <div className="flex flex-col items-center">
            <BsChatDots className="text-4xl text-blue-400 mb-2" />
            <p className="text-xl font-semibold">24/7 Support</p>
            <p className="text-gray-400 text-sm">We’re always here if you need us.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">FAQs</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">How long does it take to launch?</h3>
            <p className="text-gray-400">Typically 3 business days, depending on requirements.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Can I request revisions?</h3>
            <p className="text-gray-400">Yes! We include up to 2 rounds of revisions free of charge.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Is hosting included?</h3>
            <p className="text-gray-400">We help you set up hosting on Netlify, Vercel, or your choice.</p>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <footer id="contact" className="bg-[#111111] py-20 px-6 text-center border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-6">Let’s Build Your Website</h2>
        <p className="text-gray-400 mb-8">
          Get in touch and let us design a stunning online presence that converts visitors into customers.
        </p>
        <a
          href="mailto:sadshahzain20@gmail.com"
          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
        <p className="text-sm text-gray-500 mt-4">or email: <span className="underline">sadshahzain20@gmail.com</span></p>
      </footer>
    </div>
  );
};

export default LandingPage;

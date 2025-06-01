import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import LearnEarnHero from "./components/LearnEarnHero";
import { useNavigate } from "react-router";
import HeroSection from "./components/HeroSection";

// Expanded freelancer data
const freelancers = [
  {
    name: "Alice Johnson",
    skill: "Graphic Designer",
    description: "Creative designer with 5+ years of experience in branding and UX/UI.",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mark Thompson",
    skill: "Web Developer",
    description: "Full-stack developer specializing in React and Node.js.",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Sara Lee",
    skill: "SEO Specialist",
    description: "Expert in SEO strategies, Google Ads and traffic analytics.",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "David Kim",
    skill: "Mobile Developer",
    description: "iOS/Android developer building scalable mobile apps.",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Patel",
    skill: "Data Analyst",
    description: "Turning data into business insights using Python and SQL.",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Liam Brooks",
    skill: "Copywriter",
    description: "Crafting high-converting copy for digital campaigns.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/38.jpg",
  },
];

// Expanded jobs data
const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    description: "Looking for a React.js developer to build a modern web app.",
  },
  {
    title: "Content Writer",
    company: "WriteWell Inc.",
    location: "New York, USA",
    description: "Need a writer with experience in SaaS blog content.",
  },
  {
    title: "UX Designer",
    company: "CreativeCore",
    location: "Berlin, Germany",
    description: "Freelance UX designer to collaborate on mobile app design.",
  },
  {
    title: "Backend Developer",
    company: "CodeBase",
    location: "Toronto, Canada",
    description: "Node.js developer needed for microservices architecture.",
  },
  {
    title: "Digital Marketer",
    company: "GrowFast",
    location: "London, UK",
    description: "Strategist for Facebook and Google ad campaigns.",
  },
  {
    title: "Project Manager",
    company: "AgileOps",
    location: "San Francisco, USA",
    description: "Agile project manager with Jira experience required.",
  },
];

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-cover bg-center bg-no-repeat bg-[url('./assets/bglan.png')] min-h-screen">
        <Navbar />
        {/* Hero Section below navbar */}
        <HeroSection />
      </div>

      {/* Freelancers Section */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Top Freelancers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center">{freelancer.name}</h3>
              <p className="text-sm text-center text-gray-600 mb-1">{freelancer.skill}</p>
              <p className="text-gray-500 text-center text-sm mb-2">{freelancer.description}</p>
              <div className="text-center text-yellow-500 font-bold">⭐ {freelancer.rating}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button 
          onClick={()=>navigate('/freelancers')}
          className="px-6 py-2 bg-[#205781] text-white rounded-full hover:bg-blue-600 transition">View More</button>
        </div>
      </section>

      {/* Employer Jobs Section */}
      <section className="py-12 px-6 md:px-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Recent Job Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#205781] mb-2">{job.title}</h3>
              <p className="text-gray-700 text-sm font-medium">
                {job.company} - {job.location}
              </p>
              <p className="text-gray-500 text-sm mt-2">{job.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={()=>navigate('/morejobs')}
           className="px-6 py-2 bg-[#205781] text-white rounded-full hover:bg-blue-600 transition">View More</button>
        </div>
      </section>

      <LearnEarnHero />
      <Footer />
    </div>
  );
}

export default App;

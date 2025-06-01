import React, { useState } from "react";

const freelancersData = [
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
    name: "Daniel Smith",
    skill: "Mobile App Developer",
    description: "iOS and Android developer using Flutter & React Native.",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Emily Turner",
    skill: "Content Strategist",
    description: "Experienced in content planning, writing, and editing.",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    name: "James White",
    skill: "Video Editor",
    description: "Expert in Adobe Premiere Pro and After Effects.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/53.jpg",
  },
];

function Freelancers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFreelancers = freelancersData.filter(
    (freelancer) =>
      freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#205781]">Browse Freelancers</h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by name or skill..."
          className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#205781]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFreelancers.length > 0 ? (
          filteredFreelancers.map((freelancer, index) => (
            <div key={index} className="bg-gray-50 shadow-md rounded-lg p-6 text-center">
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-800">{freelancer.name}</h2>
              <p className="text-sm text-[#205781] font-medium">{freelancer.skill}</p>
              <p className="text-sm text-gray-600 mt-2">{freelancer.description}</p>
              <div className="text-yellow-500 font-bold mt-2">⭐ {freelancer.rating}</div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No freelancers found.</p>
        )}
      </div>
    </div>
  );
}

export default Freelancers;

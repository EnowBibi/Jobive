import React, { useState } from "react";

const jobsData = [
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
    company: "CodeCraft",
    location: "San Francisco, USA",
    description: "Node.js developer needed for scalable backend systems.",
  },
  {
    title: "Product Manager",
    company: "InnoTech",
    location: "London, UK",
    description: "Manage agile teams and product roadmap.",
  },
  {
    title: "Digital Marketer",
    company: "AdSphere",
    location: "Toronto, Canada",
    description: "Expert in paid ads, email campaigns, and analytics.",
  },
];

function MoreJobs() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobsData.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#205781]">Explore Job Listings</h1>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search jobs by title..."
          className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#205781]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-[#205781]">{job.title}</h2>
              <p className="text-sm text-gray-700 font-medium">{job.company} - {job.location}</p>
              <p className="text-gray-500 text-sm mt-2">{job.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default MoreJobs;

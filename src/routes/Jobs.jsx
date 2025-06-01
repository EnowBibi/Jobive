import React, { useState, useEffect } from "react";
import SideNavBar from "../components/SideNavBar";

const Jobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Website Redesign",
      client: "ABC Corp",
      amount: 50000,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Mobile App Development",
      client: "TechStart",
      amount: 75000,
      status: "Pending Review",
    },
    {
      id: 3,
      title: "Marketing Campaign",
      client: "GreenMedia",
      amount: 30000,
      status: "In Progress",
    },
  ]);

  const totalExpectedIncome = jobs.reduce((acc, job) => acc + job.amount, 0);

  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen bg-gray-50">
      <SideNavBar />
      <div className="w-full p-6 mt-10 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Jobs</h1>

        {/* Total Expected Income */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700">Total Expected Income</p>
          <h2 className="text-3xl font-semibold text-green-600">XAF {totalExpectedIncome.toLocaleString()}</h2>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-500">Client: {job.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Status: <span className="font-medium">{job.status}</span></p>
                  <p className="text-blue-600 font-semibold">XAF {job.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

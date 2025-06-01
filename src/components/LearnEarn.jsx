import { useNavigate } from "react-router";

function LearnEarnLeft() {
  const navigate=useNavigate();
  return (
    <div className="bg-white p-10 rounded-lg shadow-md max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Looking forward to <br />
        taking up different <br />
        <span className="text-blue-600">Tech Courses?</span>
      </h1>
      <p className="text-gray-700 mb-8 text-lg">
        Take up and learn a course today! <br />
        Get certifications at the end of each program <br />
        and receive recommendation.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
        onClick={()=>navigate('/signupfreelancer')}
      >
        APPLY ONLINE
      </button>
    </div>
  );
}

export default LearnEarnLeft;

import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#205781] text-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Pages */}
        <div>
          <h3 className="font-bold mb-4">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Profile</li>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Tomothy */}
        <div>
          <h3 className="font-bold mb-4">Tomothy</h3>
          <ul className="space-y-2 text-sm">
            <li>Eleanor Edwards</li>
            <li>Ted Robertson</li>
            <li>Annette Russell</li>
            <li>Jennie McKinney</li>
            <li>Gloria Richards</li>
          </ul>
        </div>

        {/* Jane Black */}
        <div>
          <h3 className="font-bold mb-4">Jane Black</h3>
          <ul className="space-y-2 text-sm">
            <li>Philip Jones</li>
            <li>Product</li>
            <li>Colleen Russell</li>
            <li>Marvin Hawkins</li>
            <li>Bruce Simmons</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-sm mb-4 text-gray-200">Available exclusively</p>
          <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start items-center gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-md text-black bg-white w-full sm:w-auto"
            />
            <button className="bg-green-300 text-[#205781] font-semibold px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center md:justify-start gap-4 mt-6 text-white text-xl">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-sm text-gray-300">© 2025 Jobive</p>
      </div>
    </footer>
  );
}

export default Footer;

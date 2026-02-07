import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="font-sans bg-gray-100">


      {/* Hero Section */}
      <section className="bg-cover bg-center h-screen text-center bg-[url('https://via.placeholder.com/1500x1000')]">
        <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
          <div className="text-white">
            <h1 className="text-5xl font-extrabold">Empowering Your Health with Caredrop</h1>
            <p className="mt-4 text-xl">Seamlessly connect with healthcare professionals and manage your well-being.</p>
            <Link to="/register" className="mt-6 inline-block bg-red-400 text-white px-6 py-3 rounded-full text-lg hover:bg-red-300">Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

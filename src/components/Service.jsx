// service.jsx
import React from 'react';

const Service = () => {
  return (
    <section className="py-20 px-4 text-center bg-gray-200">
      <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
      <p className="text-lg max-w-2xl mx-auto mb-6">
        At Caredrop, we offer a wide range of healthcare services to ensure that you receive the best care possible.
        Here are some of the key services we provide:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-4">Telemedicine Consultations</h4>
          <p>Connect with healthcare professionals from the comfort of your home, anytime, anywhere.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-4">Medical Record Management</h4>
          <p>Store and access your medical history securely through our platform, available 24/7.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-4">Wellness Programs</h4>
          <p>Join personalized wellness programs to stay fit and maintain your health in a holistic way.</p>
        </div>
      </div>
    </section>
  );
};

export default Service;



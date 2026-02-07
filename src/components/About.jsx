import React from 'react';

const About = () => {
  return (
    <div className="font-sans bg-gray-100">
      {/* Header Section (Optional if using Layout with header) */}


      {/* About Section */}
      <section className="py-20 px-4 text-center bg-gray-200">
        <h2 className="text-3xl font-semibold mb-8">About Caredrop</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Caredrop is revolutionizing the way healthcare is delivered. Our platform connects you with healthcare professionals
          in real time, making healthcare more accessible, affordable, and efficient. Whether you need a quick consultation,
          long-term care advice, or access to your medical records, Caredrop brings healthcare to your fingertips.
        </p>

        <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          At Caredrop, our mission is to make healthcare accessible and affordable to everyone. We believe that healthcare should
          be simple, transparent, and accessible from anywhere. By utilizing technology and a network of healthcare professionals,
          we aim to provide the best possible care for our users.
        </p>

        <h3 className="text-2xl font-semibold mb-6">Our Vision</h3>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          We envision a world where healthcare is not limited by location, time, or financial constraints. Caredrop seeks to break
          down barriers by offering telemedicine consultations, secure medical record storage, and an ever-growing network of trusted
          healthcare providers.
        </p>

        <h3 className="text-2xl font-semibold mb-6">Why Choose Caredrop?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <h4 className="text-xl font-semibold mb-4">Instant Access</h4>
            <p>Connect with healthcare professionals instantly for consultations and advice, anytime, anywhere.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <h4 className="text-xl font-semibold mb-4">Confidentiality</h4>
            <p>Our platform ensures that your health data is stored securely and only accessible by authorized professionals.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <h4 className="text-xl font-semibold mb-4">Affordable Care</h4>
            <p>We offer cost-effective consultations, allowing you to access quality care without the high fees.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center bg-red-500 text-white">
        <h2 className="text-3xl font-semibold mb-6">Join Caredrop Today!</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Ready to take control of your health? Sign up today and start experiencing healthcare in a new way.
        </p>
        <a href="/register" className="inline-block bg-white text-red-500 px-6 py-3 rounded-full text-lg hover:bg-gray-200">
          Get Started
        </a>
      </section>


    </div>
  );
};

export default About;

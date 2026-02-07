import React from 'react';
import { Heart, Shield, Users, Clock, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-red-600">Caredrop</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Caredrop is revolutionizing blood donation by connecting donors with those in need. 
            Our platform makes it simple, safe, and rewarding to save lives through blood donation.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-red-600" size={32} />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To make blood donation accessible and efficient for everyone. We believe that saving lives 
              should be simple, transparent, and rewarding. By utilizing technology, we connect donors 
              with recipients seamlessly.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-red-600" size={32} />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              A world where no one dies due to blood shortage. Caredrop envisions a future where 
              blood donation is as common as helping a neighbor, creating a community of lifesavers.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Caredrop */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="text-red-600">Caredrop?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-8 text-white transform hover:-translate-y-2 transition-all">
              <Clock size={40} className="mb-4" />
              <h3 className="text-xl font-bold mb-3">Instant Access</h3>
              <p className="text-red-100">
                Register your donation instantly and get verified certificates within 24 hours.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white transform hover:-translate-y-2 transition-all">
              <Shield size={40} className="mb-4" />
              <h3 className="text-xl font-bold mb-3">Secure & Safe</h3>
              <p className="text-blue-100">
                Your data is encrypted and stored securely. Only verified hospitals can access donation records.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white transform hover:-translate-y-2 transition-all">
              <Users size={40} className="mb-4" />
              <h3 className="text-xl font-bold mb-3">Community Driven</h3>
              <p className="text-green-100">
                Join thousands of donors who have already saved lives through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-500 to-red-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Caredrop Today!</h2>
          <p className="text-lg md:text-xl text-red-100 mb-8">
            Ready to save lives? Sign up today and become a hero in someone's story.
          </p>
          <a 
            href="/register" 
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started →
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;

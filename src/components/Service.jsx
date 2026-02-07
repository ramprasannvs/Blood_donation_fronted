import React from 'react';
import { Heart, FileText, Activity, Phone, Calendar, Users } from 'lucide-react';

const Service = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-red-600">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            At Caredrop, we provide comprehensive blood donation services to ensure 
            a seamless experience for both donors and recipients.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Service 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Heart className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Blood Donation</h3>
            <p className="text-gray-600 leading-relaxed">
              Register your blood donation easily and get instant confirmation. 
              Track your donation history and receive certificates for each donation.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <FileText className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Digital Certificates</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive verified digital certificates for every approved donation. 
              Download and share your certificates anytime, anywhere.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Activity className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Health Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your donation frequency and health status. 
              Get reminders when you're eligible to donate again.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Network</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with a community of lifesavers. Share your journey and 
              inspire others to donate blood.
            </p>
          </div>

          {/* Service 5 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Calendar className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Donation Scheduling</h3>
            <p className="text-gray-600 leading-relaxed">
              Schedule your donations in advance at verified hospitals and blood banks. 
              Get notifications and reminders.
            </p>
          </div>

          {/* Service 6 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Phone className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7 Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Get instant support for any queries related to blood donation. 
              Our team is always ready to help you.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Join thousands of donors who are saving lives every day.
          </p>
          <a 
            href="/register" 
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Donating →
          </a>
        </div>
      </section>
    </div>
  );
};

export default Service;



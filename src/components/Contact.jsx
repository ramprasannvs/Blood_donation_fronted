import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., sending data to a backend)
    console.log(formData);
    // Reset the form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-20 px-4 text-center bg-gray-200">
      <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
      <p className="text-lg max-w-2xl mx-auto mb-6">
        We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-left text-lg font-medium mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-left text-lg font-medium mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-left text-lg font-medium mb-2">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-md"
            required
          ></textarea>
        </div>

        <div>
          <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-full text-lg hover:bg-red-600">
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;

import { useState } from "react";

const BloodDonationForm = () => {
    const [form, setForm] = useState({
        bloodGroup: "",
        donationDate: "",
        hospital: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/blood-donation`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(form),
            }
        );

        const data = await res.json();

        if (res.ok) {
            alert("Blood donation submitted successfully ✅");
        } else {
            alert(data.msg || "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <h2 className="text-xl font-semibold">Blood Donation Form</h2>

            <select
                name="bloodGroup"
                onChange={handleChange}
                required
                className="border p-2 w-full"
            >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
            </select>

            <input
                type="date"
                name="donationDate"
                onChange={handleChange}
                required
                className="border p-2 w-full"
            />

            <input
                type="text"
                name="hospital"
                placeholder="Hospital / Camp Name"
                onChange={handleChange}
                required
                className="border p-2 w-full"
            />

            <button className="bg-red-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
};

export default BloodDonationForm;

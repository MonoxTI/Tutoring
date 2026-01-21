import { useState } from "react";

export default function Bookings() {
  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Number: "",
    package: "",
    Date: "",
    tutor: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book a session.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setForm({
          FullName: "",
          Email: "",
          Number: "",
          package: "",
          Date: "",
          tutor: ""
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book session. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          Book a Session
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Full Name", name: "FullName", type: "text" },
            { label: "Email", name: "Email", type: "email" },
            { label: "Phone Number", name: "Number", type: "tel" },
            { label: "Package", name: "package", type: "text" },
            { label: "Date", name: "Date", type: "date" },
            { label: "Tutor", name: "tutor", type: "text" }
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Book Session
          </button>
        </form>
      </div>
    </div>
  );
}
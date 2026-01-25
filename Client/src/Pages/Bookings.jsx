import { useState } from "react";

export default function Bookings() {
  const initialFormState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    packageName: "",
    date: "",
    tutor: ""
  };

  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Booking failed");
        return;
      }

      alert("Booking successful ✅");
      setForm(initialFormState);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
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
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
            { label: "Package", name: "packageName", type: "text" },
            { label: "Date", name: "date", type: "date" },
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
                value={form[field.name] ?? ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           outline-none transition"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-medium py-2.5 px-4 rounded-lg transition
              ${loading ? "bg-gray-400" : "bg-blue-900 hover:bg-blue-800"}`}
          >
            {loading ? "Booking..." : "Book Session"}
          </button>
        </form>
      </div>
    </div>
  );
}

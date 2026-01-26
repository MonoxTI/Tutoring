import { useEffect, useState } from "react";

export default function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/Allappointments");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setAppointments(data.data.appointments);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading appointments...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-center">No appointments found</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <p><strong>Name:</strong> {apt.fullName}</p>
              <p><strong>Email:</strong> {apt.email}</p>
              <p><strong>Package:</strong> {apt.packageName}</p>
              <p><strong>Date:</strong> {apt.date}</p>
              <p><strong>Tutor:</strong> {apt.tutor}</p>

              <a
                href={`/appointments/${apt.id}`}
                className="text-blue-700 underline mt-2 inline-block"
              >
                View Details →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

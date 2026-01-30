import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AppointmentDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate ID format early
  useEffect(() => {
    if (!id) {
      setError("No appointment ID provided");
      setLoading(false);
      return;
    }

    // Basic MongoDB ObjectId validation (24 hex chars)
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      setError("Invalid appointment ID format");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/getAppointments/${id}`
        );
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to load details");
        }

        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (loading) return <p className="text-center mt-10">Loading details...</p>;
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={handleBack}
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  if (!data) return <p className="text-center">No data found</p>;

  const { appointment, paymentDetails } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Appointment Details</h1>
          <button
            onClick={handleBack}
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded shadow"
          >
            ← Dashboard
          </button>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow mb-6">
          <h2 className="font-semibold text-xl mb-4 pb-2 border-b">Appointment Info</h2>
          <p><strong>Name:</strong> {appointment.fullName}</p>
          <p><strong>Email:</strong> {appointment.email}</p>
          <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
          <p><strong>Package:</strong> {appointment.packageName}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Tutor:</strong> {appointment.tutor}</p>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow">
          <h2 className="font-semibold text-xl mb-4 pb-2 border-b">Payment Details</h2>
          {paymentDetails ? (
            <>
              <p><strong>Status:</strong> {paymentDetails.paymentStatus}</p>
              <p><strong>Amount Paid:</strong> R{paymentDetails.amountPaid}</p>
              <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
              <p><strong>Invoice:</strong> {paymentDetails.invoiceNumber}</p>
              {paymentDetails.note && (
                <p><strong>Note:</strong> {paymentDetails.note}</p>
              )}
            </>
          ) : (
            <p className="text-gray-600">No payment details available</p>
          )}
        </div>
      </div>
    </div>
  );
}
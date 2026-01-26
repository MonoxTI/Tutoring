import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AppointmentDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/getAppointments/${id}`
        );
        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        setData(result.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load appointment details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading details...</p>;
  if (!data) return <p className="text-center">No data found</p>;

  const { appointment, paymentDetails } = data;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Appointment Details</h1>

      <div className="border rounded-lg p-4 shadow mb-6">
        <h2 className="font-semibold mb-2">Appointment Info</h2>
        <p><strong>Name:</strong> {appointment.fullName}</p>
        <p><strong>Email:</strong> {appointment.email}</p>
        <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
        <p><strong>Package:</strong> {appointment.packageName}</p>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Tutor:</strong> {appointment.tutor}</p>
      </div>

      <div className="border rounded-lg p-4 shadow">
        <h2 className="font-semibold mb-2">Payment Details</h2>

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
          <p>No payment details available</p>
        )}
      </div>
    </div>
  );
}

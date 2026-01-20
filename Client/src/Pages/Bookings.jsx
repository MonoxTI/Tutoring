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

  const submit = async () => {
    const token = localStorage.getItem("token");

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
  };

  return (
    <div>
      <h1>Book a Session</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button onClick={submit}>Book</button>
    </div>
  );
}

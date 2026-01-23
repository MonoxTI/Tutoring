import pic1 from '../assets/pic1.png';
export default function Staff() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Our Staff
      </h1>

      {/* Image with imported asset */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-2xl mx-auto">
          <img
            src={pic1}
            alt="Assembled Tutoring Alumni"
            className="w-full h-auto object-cover"
          />
        </div>
      <ul>
        <li>Mr Monox – Mathematics</li>
        <li>Ms Dube – Physical Sciences</li>
        <li>Mr Nkosi – IT & Programming</li>
      </ul>
    </div>
    </div>
  );
}


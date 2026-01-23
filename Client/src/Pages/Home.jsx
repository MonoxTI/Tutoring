import LOGO from "../Assets/LOGO.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-blue-900 to-blue-500 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
        {/* Left: Text Content */}
        <div className="md:w-1/2 pr-0 md:pr-8 mb-10 md:mb-0">
          <p className="text-3xl md:text-4xl font-bold mb-2">GRADE 12</p>
          <p className="text-4xl md:text-5xl font-normal mb-4 italic" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Mathematics
          </p>
          <p className="text-2xl md:text-3xl font-bold mb-2">Monthly Subscription</p>
          <p className="text-xl md:text-2xl font-bold text-yellow-300 mb-1">15% OFF</p>
          <p className="text-lg font-bold mb-6">valid only for February</p>

          <p className="text-lg md:text-xl font-bold mb-4 leading-relaxed">
            Mathematics is a language that requires understanding the fundamentals & the underlying basics of all its topics - post psychological transformation
          </p>

          <p className="text-xl md:text-2xl font-bold">Making education fashionable</p>
        </div>

        {/* Right: Logo */}
        <div className="md:w-1/2 flex justify-center md:justify-end items-start mt-8 md:mt-0">
          <img
            src={LOGO}
            alt="Assembled Tutoring"
            className="h-160 w-auto object-contain opacity-40" // Larger + transparent
          />
        </div>
      </div>
    </div>
  );
}
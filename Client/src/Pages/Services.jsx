import LOGO from "../Assets/LOGO.png";

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-blue-900 to-blue-500 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left: Services Content */}
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
            SERVICES
          </h1>

          {/* Header Row */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 mb-6 border border-blue-400/30">
            <p className="text-lg font-medium text-center md:text-left">
              Monthly Subscription: 2 hours per week (4 sessions monthly)
            </p>
            <p className="text-lg font-medium text-center md:text-left mt-2">
              Rate per lesson (2 hours)
            </p>
          </div>

          {/* Pricing Rows */}
          <div className="space-y-4">
            {[
              {grade: "", monthly: "Monthly Rate", perLesson: "Rate per Lesson"},
              { grade: "GRADE 4–7", monthly: "R1500", perLesson: "R500" },
              { grade: "GRADE 8–9", monthly: "R1800", perLesson: "R600" },
              { grade: "GRADE 10", monthly: "R2000", perLesson: "R650" },
              { grade: "GRADE 11–12", monthly: "R2300", perLesson: "R700" }
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-black/20 rounded-lg p-4 border border-blue-500/30"
              >
                <span className="text-lg font-medium">{item.grade}</span>
                <span className="text-lg font-medium">{item.monthly}</span>
                <span className="text-lg font-medium">{item.perLesson}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Logo */}
        <div className="md:w-1/2 flex justify-center md:justify-end items-start">
          <img
            src={LOGO}
            alt="Assembled Tutoring"
            className="h-150 w-auto object-contain opacity-40" // Large but not overwhelming
          />
        </div>
      </div>
    </div>
  );
}
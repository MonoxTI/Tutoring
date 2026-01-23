import pic2 from "../assets/pic2.jpg";
export default function AboutMission() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-1">ABOUT</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Mission</h2>
        
          <p className="text-lg leading-relaxed mb-6">
            The barrier encountered in learning is often not a lack of "logic," but a psychological block. 
            Our aim commences with addressing the Cognitive, Affective, and Metacognitive layers of learning.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            Simply, <strong>Psychological Transformation</strong> is a technique we use to psychologically infiltrate & remove 
            the thought(s) that certain subjects are unattainable (e.g., "Mathematics is hard"). Once the learner’s psychological 
            thoughts are realigned, constant engagement with the work is required.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            Mathematics requires memory — the ability to hold multiple pieces of information (like a formula, a carry-over digit, 
            and a negative sign) all at once. Thus, for better interaction, we offer monthly subscription. We have noted in the past 
            that the more interaction with the work, the easier it is for their minds to absorb fundamental underlying principles.
          </p>
          
          <p className="text-lg leading-relaxed">
            We use <strong>cognitive offloading</strong> to ‘offload’ the mental agony into intermediate steps that are constantly practiced, 
            and free up the ‘mental script’ for complex problem-solving.
          </p>

        </div>
        {/* Image with imported asset */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-2xl mx-auto">
                  <img
                    src={pic1}
                    alt="Assembled Tutoring about"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="max-w-4xl mx-auto mt-6">
                  <h4 className="text-xl md:text-2xl font-semibold mb-4">Why Psychometric test?</h4>
                  <p className="text-lg leading-relaxed mb-6">
To assess whether the learner is to the standard of their grade, by identifying their loopholes from past Grades, to ensure
underlying principles are understood. We cannot move forward without addressing previous loopholes, a loopholed
foundation collapses the next phase - the root problems from past grades.
                  </p>
                  <h4 className="text-xl md:text-2xl font-semibold mb-4">Why weekly Test?</h4>
                  <p className="text-lg leading-relaxed">
Engagement is crucial, constant practice leads to success. We have noted that teaching requires emphasis. Hence, when
learners write weekly tests - they become more engaged with the work, they study weekly and personalized feedback on their
test are sent to parents/ guardian(s)
                </p>
                  </div>
      </div>
  );
}
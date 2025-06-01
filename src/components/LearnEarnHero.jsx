import LearnEarn from "./LearnEarn";
import LearnEarnR from "./LearnEarnR";

function LearnEarnHero() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <LearnEarn />
          <LearnEarnR />
        </div>
      </div>
    </section>
  );
}

export default LearnEarnHero;

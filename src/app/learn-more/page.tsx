"use client";
import { useRouter } from "next/navigation";

export default function LearnMorePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* 🔥 HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="font-semibold text-lg cursor-pointer"
            onClick={() => router.push("/")}
          >
            Support <span className="text-zinc-400">AI</span>
          </span>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:scale-105 transition"
          >
            &#8592; Home
          </button>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* TITLE */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            About Support AI
          </h1>
          <p className="text-zinc-600 max-w-2xl">
            Support AI helps businesses deliver instant, intelligent, and
            human-like responses to customers using modern AI technology.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "🤖 AI-Powered Responses",
              desc: "Automatically answer queries using AI trained on your business data.",
            },
            {
              title: "⚡ Easy Integration",
              desc: "Embed a chatbot on your website with a simple script.",
            },
            {
              title: "🌍 Always Available",
              desc: "Provide 24/7 support without increasing workload.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border hover:shadow-md transition hover:-translate-y-1"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ul className="space-y-3 text-sm text-zinc-600">
            {[
              "Add your business details and knowledge base",
              "Generate your embed script",
              "Paste it into your website and go live",
            ].map((text, i) => (
              <li key={i} className="bg-white border rounded-lg p-3">
                <span className="font-medium text-zinc-900">{i + 1}. Step</span>{" "}
                — {text}
              </li>
            ))}
          </ul>
        </div>

        {/* BENEFITS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Why Use Support AI</h2>

          <ul className="grid md:grid-cols-2 gap-4 text-sm text-zinc-600">
            {[
              "Reduce response time",
              "Improve customer satisfaction",
              "Automate repetitive tasks",
              "Scale support easily",
            ].map((item, i) => (
              <li key={i} className="bg-white border rounded-lg p-3">
                ✅ {item}
              </li>
            ))}
          </ul>
        </div>

        {/* USE CASES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Use Cases</h2>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            {["🛒 E-commerce", "💻 SaaS", "🏥 Healthcare", "🎓 Education"].map(
              (item, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

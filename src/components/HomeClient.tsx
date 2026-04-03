"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

function HomeClient({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`;
  };

  const [open, setOpen] = useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleLogout = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`;
  };

  const navigate = useRouter();
  return (
    <div className="min-h-screen bg-linear-to-br from-white-400 to-white-400 text-zinc-900 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-zinc-200"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-semibold tracking-tight cursor-pointer">
            Support <span className="text-zinc-400">AI</span>
          </div>

          {/* Right Side */}
          {email ? (
            <div className="relative" ref={popupRef}>
              <button
                className="w-10 h-10 rounded-full bg-black text-white font-semibold flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md"
                onClick={() => setOpen(!open)}
              >
                {email.charAt(0).toUpperCase()}
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-zinc-100 transition"
                      onClick={() => {
                        navigate.push("/dashboard");
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-zinc-100 transition"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              className="px-5 py-2 rounded-full bg-black text-white font-medium shadow-md flex items-center justify-center hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </motion.button>
          )}
        </div>
      </motion.div>

      <section className="pt-36 pb-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-5xl  font-semibold leading-tight mb-6 mt-6">
              AI Customer Support
              <br />
              That Feels Human
            </h2>
            <p className="text-lg text-zinc-500 mb-8">
              Add a powerful AI chatbot to your website and provide instant,
              human-like support to your customers 24/7. With Support AI, you
              can enhance customer satisfaction, reduce response times, and free
              up your team to focus on more complex issues.
            </p>
            {email ? (
              <motion.button
                className="px-6 py-3  rounded-full bg-black text-white font-medium shadow-md hover:scale-105 transition"
                onClick={() => {
                  navigate.push("/dashboard");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Dashboard →
              </motion.button>
            ) : (
              <motion.button
                className="px-6 py-3  rounded-full bg-black text-white font-medium shadow-md hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
              >
                Get Started →
              </motion.button>
            )}
            <motion.button
              className="ml-4 px-6 py-3 rounded-full bg-white border border-zinc-300 text-black font-medium shadow-md hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate.push("/learn-more")}
            >
              Learn More
            </motion.button>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className=" relative rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6 max-w-md">
              <div className="text-sm text-zinc-500 mb-4">
                Live Chat Preview
              </div>

              <div className="space-y-4">
                {/* LEFT MESSAGE (BOT) */}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-semibold">
                    AI
                  </div>

                  <div className="bg-zinc-100 text-sm px-4 py-2 rounded-2xl rounded-tl-sm max-w-[75%]">
                    Hi 👋 How can I help you today?
                  </div>
                </div>

                {/* RIGHT MESSAGE (USER) */}
                <div className="flex justify-end">
                  <div className="bg-black text-white text-sm px-4 py-2 rounded-2xl rounded-tr-sm max-w-[75%]">
                    I want to know about pricing.
                  </div>
                </div>

                {/* LEFT MESSAGE */}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-semibold">
                    AI
                  </div>

                  <div className="bg-zinc-100 text-sm px-4 py-2 rounded-2xl rounded-tl-sm max-w-[75%]">
                    Sure! We offer flexible plans based on your needs 🚀
                  </div>
                </div>

                {/* RIGHT MESSAGE */}
                <div className="flex justify-end">
                  <div className="bg-black text-white text-sm px-4 py-2 rounded-2xl rounded-tr-sm max-w-[75%]">
                    That sounds great!
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg cursor-pointer"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1 }}
              >
                💬
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Support AI?</h2>
          <p className="text-lg text-zinc-500 mb-12">
            Support AI uses advanced natural language processing to understand
            and respond to customer inquiries with human-like accuracy. Our
            platform integrates seamlessly with your existing support channels,
            providing instant responses and freeing up your team to focus on
            more complex issues.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="bg-white-200 rounded-lg shadow-md p-6 hover:scale-110 transition">
              <h3 className="text-xl font-semibold mb-4 ">24/7 Availability</h3>
              <p className="text-zinc-500">
                Support AI is always available to assist your customers,
                ensuring they receive timely responses no matter the time of
                day.
              </p>
            </div>
            <div className="bg-white-200 rounded-lg shadow-md p-6 hover:scale-110 transition">
              <h3 className="text-xl font-semibold mb-4">
                Seamless Integration
              </h3>
              <p className="text-zinc-500">
                Easily integrate Support AI with your existing support channels,
                including email, chat, and social media platforms.
              </p>
            </div>
            <div className="bg-white-200 rounded-lg shadow-md p-6 hover:scale-110 transition">
              <h3 className="text-xl font-semibold mb-4">
                Human-like Responses
              </h3>
              <p className="text-zinc-500">
                Our advanced natural language processing ensures that Support AI
                understands and responds to customer inquiries with human-like
                accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-zinc-100 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Support AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomeClient;

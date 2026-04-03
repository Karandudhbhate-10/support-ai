"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function DashboardClient({ ownerID }: { ownerID: string }) {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handelSettings = async () => {
    try {
      const result = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerID,
          businessName,
          supportEmail,
          knowledge,
        }),
      });
      const data = await result.json();
      console.log(data);
      setLoading(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false), 3000;
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerID) {
      const handleGetDetails = async () => {
        try {
          const res = await fetch("/api/settings/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ownerID }),
          });

          if (!res.ok) {
            console.log("Failed to fetch");
            return;
          }

          const data = await res.json(); // ✅ IMPORTANT

          setBusinessName(data.businessName || "");
          setSupportEmail(data.supportEmail || "");
          setKnowledge(data.knowledge || "");
        } catch (error) {
          console.log(error);
        }
      };

      handleGetDetails(); // ✅ CALL FUNCTION
    }
  }, [ownerID]);
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden">
      {/* Navbar */}
      <motion.div
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-zinc-200"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-xl font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Support <span className="text-zinc-400">AI</span>
          </div>

          <button
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 text-white text-sm transition"
            onClick={() => router.push("/embed")}
          >
            Embed ChatBot
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex justify-center px-4 py-14 mt-24">
        <motion.div
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">ChatBot Settings</h1>
            <p className="text-zinc-500 mt-1">
              Manage your AI chatbot knowledge and business details
            </p>
          </div>

          {/* Business Details */}
          <div className="mb-10 border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <h1 className="text-xl font-semibold mb-6">Business Details</h1>

            <div className="space-y-5">
              {/* Business Name */}
              <input
                type="text"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />

              {/* Support Email */}
              <input
                type="email"
                placeholder="Enter support email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Knowledge Base
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Add FAQs, policies, delivery info, refunds, etc.
            </p>

            <textarea
              rows={6}
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3–5 working days
• Cash on Delivery available
• Support hours`}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition resize-none"
            />
          </div>

          {/* Save Section */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Make sure to save your changes
            </p>

            <button
              className="px-6 py-2 rounded-xl bg-zinc-900 text-white font-medium shadow-md
              hover:bg-black hover:scale-105 active:scale-95
              transition-all duration-200 ease-in-out"
              disabled={loading}
              onClick={handelSettings}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-emerald-600"
              >
                {" "}
                ✔️setting saved
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardClient;

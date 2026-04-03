"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

function EmbedClient({ ownerID }: { ownerID: string }) {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);
  const embedCode = `
  <script
      src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
      data-owner-id="${ownerID}"
  ></script>`;
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 ">
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-xl font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Support <span className="text-zinc-400">AI</span>
          </div>

          <button
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 text-white text-sm transition"
            onClick={() => router.push("/dashboard")}
          >
            &#8592; Dashboard
          </button>
        </div>
      </div>
      <div className="flex  justify-center px-4 py-14 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10"
        >
          <h1 className="text-2xl font-semibold mb-4">Embed ChatBot</h1>
          <p className="text-zinc-500 mb-6">
            Copy and paste the before <code>&lt;/body&gt;</code>
          </p>
          <div className="relative bg-zinc-900 text-zinc-100 rounded-xl p-5 text-sm font-mono mb-10">
            <pre>{embedCode}</pre>

            <div className="absolute top-3 right-3 group">
              <button
                onClick={handleCopy}
                className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
              >
                {copied ? (
                  // ✅ Check icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  // 📋 Copy icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-zinc-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>

              {/* 🔥 Tooltip */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
      px-2 py-1 text-xs rounded bg-black text-white 
      opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap"
              >
                {copied ? "Copied!" : "Copy"}
              </div>
            </div>
          </div>
          <ol>
            <li className="mb-3">
              1. Copy the above code snippet to your clipboard.
            </li>
            <li className="mb-3">
              2. Paste it into your website's HTML just before the closing{" "}
              <code>&lt;/body&gt;</code> tag.
            </li>
            <li className="mb-3">
              3. Save and publish your website to see the chatbot live!
            </li>
          </ol>

          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-1">Live Preview</h2>
            <p className="text-sm text-zinc-500 mb-4">
              This is how the chatbot will appear on your website
            </p>

            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-2 border-b bg-zinc-50">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>

                <span className="ml-3 text-xs text-zinc-500">
                  your-website.com
                </span>
              </div>

              {/* 🔥 PREVIEW AREA */}
              <div
                id="chatbot-preview"
                className="relative h-[300px] bg-zinc-100 flex items-center justify-center"
              >
                {/* 🔥 Chatbot Preview */}
                <div className="absolute bottom-4 right-4 scale-90 origin-bottom-right">
                  <div className="w-[260px] rounded-xl shadow-lg overflow-hidden bg-white">
                    {/* Header */}
                    <div className="bg-black text-white text-sm px-3 py-2 flex justify-between items-center">
                      <span>Customer Support</span>
                      <span className="cursor-pointer">✕</span>
                    </div>

                    {/* Messages */}
                    <div className="p-3 space-y-2 bg-zinc-50 text-xs">
                      <div className="bg-zinc-200 text-zinc-800 px-2 py-1 rounded-lg w-fit">
                        hi! how can I help you?
                      </div>

                      <div className="bg-black text-white px-2 py-1 rounded-lg w-fit ml-auto">
                        what is the return policy?
                      </div>
                      <div className="flex">
                        <div className="bg-zinc-200 text-zinc-800 px-2 py-1 rounded-lg max-w-[80%]">
                          We offer a 7-day refund policy from the date of
                          purchase.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Button */}
                  <div className="mt-2 flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-md">
                      💬
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EmbedClient;

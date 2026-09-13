"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Phone,
  ArrowUpRight,
  Send,
  HelpCircle,
} from "lucide-react";

interface PredefinedQA {
  id: string;
  category: string;
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
  keywords: string[];
}

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  text: string;
  linkText?: string;
  linkHref?: string;
  timestamp: string;
}

const FAQ_KNOWLEDGE_BASE: PredefinedQA[] = [
  {
    id: "epr-cpcb",
    category: "EPR Compliance",
    question: "Are your EPR credits registered & verifiable on the CPCB Portal?",
    answer:
      "Yes. Swayambhu is an officially registered plastic waste recycler with the Central Pollution Control Board (CPCB), with over 1,634 MT generated under Category-II. We provide end-to-end audit-ready credit transfers directly on the national EPR portal.",
    linkText: "EPR Compliance Desk",
    linkHref: "/contact?type=EPR",
    keywords: ["epr", "cpcb", "credit", "compliance", "category-ii", "plastic", "certificate"],
  },
  {
    id: "mrf-model",
    category: "Material Recovery",
    question: "How do your turnkey Material Recovery Facilities (MRFs) operate?",
    answer:
      "We design, build, and operate decentralized MRFs that segregate dry municipal and commercial solid waste into 19 distinct streams. Our flagship facilities include Ajeetpur (Haridwar) in partnership with HUL and the Varanasi Cantt Railway Station hub.",
    linkText: "View Case Studies",
    linkHref: "/about#case-studies",
    keywords: ["mrf", "material recovery", "facility", "sorting", "ajeetpur", "varanasi", "railway", "streams"],
  },
  {
    id: "eco-furniture",
    category: "CSR Assets",
    question: "What makes your recycled school furniture termite & waterproof?",
    answer:
      "Our eco-desks, benches, and modular sanitation blocks are fabricated from 100% upcycled post-consumer polymers and multilayer packaging boards. They have a verified 30+ year lifespan, require zero wood, and are 100% recyclable at end-of-life.",
    linkText: "Explore CSR Catalog",
    linkHref: "/solutions#eco-furniture",
    keywords: ["furniture", "desk", "bench", "csr", "termite", "waterproof", "school", "board", "plastic"],
  },
  {
    id: "biogas-plants",
    category: "Bio-Energy",
    question: "What is the capacity of your community biogas digesters?",
    answer:
      "We have installed over 122 decentralized anaerobic digestion units across India, generating 11,12,030+ kg of clean cooking gas while converting organic agro and kitchen refuse into enriched bio-fertilizer.",
    linkText: "Clean Energy Solutions",
    linkHref: "/solutions#biogas",
    keywords: ["biogas", "methane", "digester", "energy", "organic", "clean gas", "cooking"],
  },
  {
    id: "facility-locations",
    category: "Operations",
    question: "Where are your manufacturing & recycling facilities located?",
    answer:
      "Our primary industrial recycling and mechanical upcycling plant is located at Plot-5A2, Sector 3, IIE BHEL, SIDCUL, Haridwar, Uttarakhand, with operational nodes active across Dehradun, Rishikesh, Varanasi, Bihar, and Arunachal Pradesh.",
    linkText: "Haridwar Facility Details",
    linkHref: "/contact",
    keywords: ["location", "address", "haridwar", "plant", "sidcul", "office", "facility", "where"],
  },
];

const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "initial-bot-msg",
      type: "bot",
      text: "Welcome to Swayambhu. Ask any question about our CPCB Category-II EPR credits, turnkey MRFs, or CSR eco-furniture, or pick from the topics below.",
      timestamp: "Now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // Telemetry log to train/fine-tune future models
  const logPromptForTraining = (prompt: string, matchedAnswer?: string) => {
    try {
      const existingLogs = JSON.parse(localStorage.getItem("swayambhu_assistant_logs") || "[]");
      const newEntry = {
        prompt,
        matchedAnswer: matchedAnswer || "fallback_operator_routed",
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== "undefined" ? navigator.userAgent : "unknown",
      };
      localStorage.setItem("swayambhu_assistant_logs", JSON.stringify([...existingLogs, newEntry]));
      console.info("[AI Training Dataset Logged]:", newEntry);
    } catch {
      // Ignore storage errors in restricted iframe environments
    }
  };

  const dispatchBotResponse = (userPrompt: string) => {
    setIsTyping(true);
    const cleaned = userPrompt.toLowerCase().trim();

    // Match against knowledge base keywords
    const matched = FAQ_KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((kw) => cleaned.includes(kw)) ||
      cleaned.includes(item.category.toLowerCase()) ||
      cleaned.includes(item.question.toLowerCase())
    );

    logPromptForTraining(userPrompt, matched?.answer);

    setTimeout(() => {
      setIsTyping(false);
      if (matched) {
        setChatHistory((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: "bot",
            text: matched.answer,
            linkText: matched.linkText,
            linkHref: matched.linkHref,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: "bot",
            text: "Your query has been logged into our technical dataset. For immediate custom requirements, you can route your specifications directly to our engineering desk.",
            linkText: "Route to Engineering Desk",
            linkHref: "/contact",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    }, 450);
  };

  const handleSelectPredefined = (qa: PredefinedQA) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      text: qa.question,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatHistory((prev) => [...prev, userMsg]);
    dispatchBotResponse(qa.question);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const query = inputText.trim();
    setInputText("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    dispatchBotResponse(query);
  };

  const handleReset = () => {
    setChatHistory([
      {
        id: `initial-bot-${Date.now()}`,
        type: "bot",
        text: "Conversation refreshed. Ask a custom query or select an operational pillar below.",
        timestamp: "Now",
      },
    ]);
  };

  return (
    <aside
      aria-label="Swayambhu Assistant"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none"
    >
      {/* 1. POPUP CHAT MODAL (Light Mineral Aesthetic) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.35, ease: easeExpo }}
            className="w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[82svh] rounded-3xl bg-[#FDF8EE] border border-[#DDE5DC] shadow-[0_20px_50px_rgba(0,107,60,0.18)] flex flex-col overflow-hidden mb-3.5 backdrop-blur-md"
          >
            {/* Header */}
            <div className="bg-white px-5 py-3.5 border-b border-[#DDE5DC] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-[#EEF5ED] border border-[#006B3C]/15 p-1 flex items-center justify-center shrink-0">
                  <Image
                    src="/logo-trademarked.png"
                    alt="Swayambhu Emblem"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#28A745] border-2 border-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold uppercase tracking-tight text-[#171F1B] leading-tight">
                    Swayambhu Assistant
                  </span>
                  <span className="text-[9px] font-mono text-[#006B3C] uppercase tracking-wider font-semibold">
                    Interactive Knowledge Base
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="w-7 h-7 rounded-lg bg-[#FAF8F5] hover:bg-[#EEF5ED] text-[#7B8580] hover:text-[#006B3C] border border-[#DDE5DC] flex items-center justify-center transition-colors"
                  title="Reset Chat"
                  aria-label="Reset Conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-[#FAF8F5] hover:bg-white text-[#7B8580] hover:text-[#171F1B] border border-[#DDE5DC] flex items-center justify-center transition-colors"
                  aria-label="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-left text-xs">
              {chatHistory.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[84%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.type === "user"
                        ? "bg-[#006B3C] text-white rounded-br-none shadow-sm"
                        : "bg-white text-[#171F1B] border border-[#DDE5DC] rounded-tl-none shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                    }`}
                  >
                    <p className="font-light">{msg.text}</p>
                    {msg.linkHref && (
                      <div className="mt-2.5 pt-2 border-t border-[#DDE5DC]/80">
                        <Link
                          href={msg.linkHref}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#006B3C] hover:underline"
                        >
                          <span>{msg.linkText}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                    <span className="block mt-1.5 text-[9px] font-mono opacity-60 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#DDE5DC] px-3.5 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006B3C] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006B3C] animate-bounce [animation-delay:0.18s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006B3C] animate-bounce [animation-delay:0.36s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Predefined Quick Pill List */}
            <div className="bg-[#FAF8F5] border-t border-[#DDE5DC] px-3.5 py-2.5 shrink-0 text-left">
              <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono text-[#7B8580] uppercase tracking-wider">
                <HelpCircle className="w-3 h-3 text-[#006B3C]" />
                <span>Frequently Asked Topics</span>
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
                {FAQ_KNOWLEDGE_BASE.map((qa) => (
                  <button
                    key={qa.id}
                    onClick={() => handleSelectPredefined(qa)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-mono bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] hover:border-[#006B3C] text-[#171F1B] hover:text-[#006B3C] transition-all shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    <span>{qa.category}</span>
                    <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* User Input & Training Dataset Collection Form */}
            <form
              onSubmit={handleCustomSubmit}
              className="bg-white px-3.5 py-2.5 border-t border-[#DDE5DC] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask a technical or compliance question..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] focus:border-[#006B3C] focus:bg-white text-xs text-[#171F1B] placeholder:text-[#7B8580]/60 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] disabled:opacity-50 text-white flex items-center justify-center transition-colors shrink-0 shadow-sm"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Direct Escalation Footer */}
            <div className="bg-[#FAF8F5] px-4 py-2 border-t border-[#DDE5DC]/70 flex items-center justify-between text-[10px] font-mono text-[#7B8580] shrink-0">
              <span>Direct Support:</span>
              <a
                href="tel:+919205642777"
                className="inline-flex items-center gap-1 text-[#006B3C] font-bold hover:underline"
              >
                <Phone className="w-2.5 h-2.5" />
                <span>+91 9205642777</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING TRIGGER CIRCLE */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FDF8EE] border-2 border-[#006B3C] p-1.5 shadow-[0_8px_25px_rgba(0,107,60,0.22)] flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[0_12px_32px_rgba(0,107,60,0.32)]"
        aria-label="Open AI Assistant"
      >
        <span className="absolute inset-0 rounded-full bg-[#006B3C]/10 animate-ping pointer-events-none opacity-60" />

        <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center p-1.5 overflow-hidden shadow-inner border border-[#DDE5DC]">
          <Image
            src="/logo-trademarked.png"
            alt="Swayambhu Assistant"
            width={44}
            height={44}
            className="object-contain transform transition-transform group-hover:scale-105"
            priority
          />
        </div>

        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28A745] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#006B3C] border-2 border-white items-center justify-center">
            <Sparkles className="w-2 h-2 text-white" />
          </span>
        </span>
      </motion.button>
    </aside>
  );
}
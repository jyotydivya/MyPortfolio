"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Moon, Sun, ArrowRight, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginScreenProps {
  onLogin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function LoginScreen({
  onLogin,
  isDarkMode,
  onToggleDarkMode,
}: LoginScreenProps) {
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Listen for Enter key to login automatically
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onLogin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onLogin]);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Choose wallpaper based on dark/light mode
  const wallpaper = isDarkMode ? "/wallpaper-night.jpg" : "/wallpaper-day.jpg";

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center relative select-none"
      style={{ backgroundImage: `url('${wallpaper}')` }}
    >
      <div className="flex flex-col items-center mb-8">
        <div
          className="text-white text-6xl font-light mb-2 tracking-tight drop-shadow-md"
          suppressHydrationWarning
        >
          {formattedTime}
        </div>
        <div
          className="text-white/90 text-xl font-light drop-shadow-sm"
          suppressHydrationWarning
        >
          {formattedDate}
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* User avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-xl border-2 border-white/30 flex items-center justify-center mb-4 transition-transform hover:scale-105">
          <span className="text-white text-4xl font-semibold tracking-wider">DJ</span>
        </div>

        <h2 className="text-white text-2xl font-medium mb-1 drop-shadow-md">Divya Jyoty</h2>
        <p className="text-white/80 text-sm font-light mb-6">AI Engineer & Full Stack Developer</p>

        {/* Login Key Button */}
        <Button
          onClick={onLogin}
          className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white backdrop-blur-md border border-white/30 shadow-lg transition-all cursor-pointer font-medium text-base"
        >
          <KeyRound className="w-4 h-4 text-white/90 transition-transform group-hover:rotate-12" />
          <span>Login</span>
          <ArrowRight className="w-4 h-4 text-white/90 transition-transform group-hover:translate-x-1" />
        </Button>
        <span className="text-xs text-white/60 mt-3 font-light">Press Enter or click to login</span>
      </div>

      <div className="fixed bottom-8">
        <button
          className="text-white/80 hover:text-white p-2.5 rounded-full hover:bg-white/10 transition-colors"
          onClick={onToggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}

"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const COLOR_SCHEMES = [
  { name: "Blue", className: "theme-blue" },
  { name: "Green", className: "theme-green" },
  { name: "Red", className: "theme-red" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [colorScheme, setColorScheme] = useState(COLOR_SCHEMES[0].className);

  // Load settings from localStorage
  useEffect(() => {
    const storedDark = localStorage.getItem("dark-mode");
    const storedScheme = localStorage.getItem("color-scheme");
    if (storedDark) setIsDark(storedDark === "true");
    if (storedScheme) setColorScheme(storedScheme);
  }, []);

  // Persist settings
  useEffect(() => {
    localStorage.setItem("dark-mode", String(isDark));
  }, [isDark]);
  useEffect(() => {
    localStorage.setItem("color-scheme", colorScheme);
  }, [colorScheme]);

  // Compute class names
  const htmlClass = `${isDark ? "dark" : ""}`;
  const bodyClass = `min-h-screen bg-background text-foreground transition-colors duration-300 ${colorScheme}`;

  return (
    <html lang="en" className={htmlClass}>
      <body className={bodyClass}>
        <header className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b bg-white dark:bg-gray-900">
          <button
            aria-label="Toggle dark mode"
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring"
            onClick={() => setIsDark((d) => !d)}
          >
            {isDark ? "🌙 Dark" : "☀️ Light"}
          </button>
          <div className="flex gap-2">
            {COLOR_SCHEMES.map((scheme) => (
              <button
                key={scheme.className}
                className={`px-4 py-2 rounded focus:outline-none focus:ring border transition-colors duration-200 ${
                  colorScheme === scheme.className
                    ? "bg-blue-500 text-white border-blue-700 dark:bg-blue-700 dark:border-blue-500"
                    : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                }`}
                aria-pressed={colorScheme === scheme.className}
                onClick={() => setColorScheme(scheme.className)}
              >
                {scheme.name}
              </button>
            ))}
          </div>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}

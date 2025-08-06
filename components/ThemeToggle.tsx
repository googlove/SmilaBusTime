import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">🌙 Світла/Темна:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="relative w-12 h-6 p-0 rounded-full"
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform duration-200 flex items-center justify-center ${
            isDark ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {isDark ? (
            <Moon className="w-3 h-3" />
          ) : (
            <Sun className="w-3 h-3" />
          )}
        </div>
      </Button>
    </div>
  );
}
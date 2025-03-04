import { useEffect, useState } from "react";

interface FlashMessageProps {
  message: string | null;
  duration?: number;
}

export default function FlashMessage({
  message,
  duration = 3000,
}: FlashMessageProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setProgress(100);

      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / (duration / 100), 0));
      }, 100);

      const timer = setTimeout(() => {
        setVisible(false);
        clearInterval(interval);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [message, duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 w-64 bg-emerald-500 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-3">{message}</div>
      <div
        className="h-1 bg-white"
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      />
    </div>
  );
}

import React, { useEffect } from "react";

export default function ToastPopup({ setToast, toastTitle, toastType }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div
      className={`fixed z-20 flex h-[4rem] w-[90%] max-w-[73rem] items-center justify-center rounded-[1rem] opacity-[80%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)] animate-toast-top ${
        toastType === "remove" ? "bg-red-100" : "bg-green-100"
      }`}
    >
      <p className="text-Body text-black">{toastTitle}</p>
    </div>
  );
}

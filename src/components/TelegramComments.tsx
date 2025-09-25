// TelegramComments.tsx (Preact/React)
import { useEffect, useRef } from "react";

export default function TelegramComments({ tgPostId }: { tgPostId?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !tgPostId) return;

    // (Re)mount widget (also useful when theme changes)
    const mount = () => {
      ref.current!.innerHTML = "";
      const dark =
        document.documentElement.getAttribute("data-theme") === "dark" ? 1 : 0;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://telegram.org/js/telegram-widget.js?22";
      s.setAttribute("data-telegram-discussion", `notkifyi/${tgPostId}`);
      s.setAttribute("data-dark", String(dark));
      s.setAttribute("data-comments-limit", "5");
      ref.current!.appendChild(s);
    };

    mount();

    // Optional: re-mount if system theme flips
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => mount();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [tgPostId]);

  return <div ref={ref} className="mt-8" />;
}

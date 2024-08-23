import { useEffect, useState } from "react";
import GeminiService from "../service/geminiServive";

export default function useGemini() {
  const [messages, updateMessage] = useState(checkForMessages());
  const [loading, setLoading] = useState(false);

  function checkForMessages() {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  }

  useEffect(() => {
    const saveMessages = () =>
      localStorage.setItem("messages", JSON.stringify(messages));
    window.addEventListener("beforeunload", saveMessages);
    return () => window.removeEventListener("beforeunload", saveMessages);
  }, [messages]);

  return { messages, loading, sendMessages, updateMessage };
}

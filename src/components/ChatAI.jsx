import React, { useState } from "react";

const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY; // 🔑 Đặt API key ở đây

export default function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    // Thêm message user vào state
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free", // model Hugging Face open-source
          messages: newMessages,
          stream: false,
        }),
      });

      const data = await res.json();
      console.log("Response from Together API:", data);

      const reply = data.choices[0].message.content;

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Lỗi kết nối API" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
          background: "#f9f9f9",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <b>{msg.role === "user" ? "Bạn" : "AI"}:</b> {msg.content}
          </div>
        ))}
        {loading && <p>⏳ AI đang trả lời...</p>}
      </div>

      <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập tin nhắn..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={sendMessage} disabled={loading}>
          Gửi
        </button>
      </div>
    </div>
  );
}

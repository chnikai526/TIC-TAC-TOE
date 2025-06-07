"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GreetingForm() {
  const [name, setName] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/game?name=${encodeURIComponent(name)}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 40, textAlign: "center" }}>
      <h1>Welcome! What's your name?</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
        style={{ padding: 8, fontSize: 16, marginRight: 10 }}
        required
      />
      <button type="submit" style={{ padding: "8px 20px", fontSize: 16 }}>
        Start Game
      </button>
    </form>
  );
}
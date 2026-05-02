import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { HeartsBackground } from "@/components/HeartsBackground";

export const Route = createFileRoute("/")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "A Gift for Dharaa 💚" },
      { name: "description", content: "A special green-themed gift just for Dharaa." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      username.trim().toUpperCase() === "DHARAA" &&
      password.trim().toUpperCase() === "PODA MAIRU"
    ) {
      sessionStorage.setItem("dharaa_auth", "1");
      navigate({ to: "/welcome" });
    } else {
      setError("Hmm... try again 💚");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <HeartsBackground count={30} />

      <div className="glass-card fade-up relative z-10 w-full max-w-md rounded-2xl p-8 sm:p-10">
        <div className="mb-6 text-center">
          <div className="pulse-heart mb-3 text-6xl">💚</div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A Gift for You
          </h1>
          <p className="clue-text mt-2 text-sm">unlock your surprise</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground" htmlFor="user">
              Username
            </label>
            <input
              id="user"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your name"
              autoComplete="off"
            />
            <p className="clue-text mt-1.5 text-xs">💡 How Prakash will call you</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground" htmlFor="pass">
              Password
            </label>
            <input
              id="pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter the secret"
              autoComplete="off"
            />
            <p className="clue-text mt-1.5 text-xs">
              💡 What did Prakash ask you to call him?
            </p>
          </div>

          {error && (
            <p className="rounded-md bg-destructive/20 px-3 py-2 text-center text-sm text-destructive-foreground">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-glow w-full rounded-lg px-6 py-3 text-base font-bold"
          >
            Unlock 💚
          </button>
        </form>
      </div>
    </main>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HeartsBackground } from "@/components/HeartsBackground";
import memory1 from "@/assets/memory1-chat.jpeg";
import memory2 from "@/assets/memory2-record.jpeg";
import memory3 from "@/assets/memory3-photo.jpeg";

export const Route = createFileRoute("/welcome")({
  component: WelcomePage,
  head: () => ({
    meta: [{ title: "Hello Dharaa 💚" }],
  }),
});

const NAME = "HELLO DHARAA!!!";

const MEMORIES = [
  {
    title: "Memory 1",
    caption: "Our very first text — the one that started it all 💚",
    img: memory1,
  },
  {
    title: "Memory 2",
    caption: "The day we talked for three hours straight without realising the time 🌿",
    img: memory2,
  },
  {
    title: "Memory 3",
    caption: "The one I waited 4 years for... ✨",
    img: memory3,
    special: true,
  },
];

const FINAL_PHOTO = memory3;

function WelcomePage() {
  const navigate = useNavigate();
  const [showBurst, setShowBurst] = useState(false);
  const [showFinalPhoto, setShowFinalPhoto] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("dharaa_auth")) {
      navigate({ to: "/" });
    }
  }, [navigate]);

  const onMemory3Click = () => {
    setShowBurst(true);
    setTimeout(() => {
      setShowBurst(false);
      setShowFinalPhoto(true);
    }, 2200);
  };

  const onFinalOk = () => {
    setShowFinalPhoto(false);
    setShowThankYou(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const burstHearts = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * Math.PI * 2;
    const dist = 200 + Math.random() * 400;
    return {
      id: i,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      rot: Math.random() * 720 - 360,
      delay: Math.random() * 0.5,
      left: 50 + (Math.random() - 0.5) * 10,
      top: 50 + (Math.random() - 0.5) * 10,
    };
  });

  return (
    <main className="relative min-h-screen px-4 py-16">
      <HeartsBackground count={45} />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="hello-3d mb-6 leading-none">
          {NAME.split("").map((ch, i) => (
            <span
              key={i}
              className="wave-letter"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        <p className="fade-up mx-auto max-w-2xl text-lg text-foreground/90 sm:text-xl">
          Welcome to my little corner of the internet — built just for you 💚
          <br />
          Scroll down. Every photo below is a piece of a memory I'll never let go of.
        </p>
      </section>

      {/* Memories */}
      <section className="relative z-10 mx-auto mt-20 grid max-w-4xl gap-12">
        {MEMORIES.map((m, idx) => (
          <article
            key={m.title}
            className="memory-card glass-card fade-up rounded-2xl p-6 sm:p-8"
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="pulse-heart text-3xl">💚</span>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{m.title}</h2>
            </div>

            {m.special ? (
              <div className="memory-cover relative flex h-72 w-full items-center justify-center overflow-hidden rounded-xl sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-background/60 backdrop-blur-sm" />
                <div className="relative z-10 text-center">
                  <div className="pulse-heart mb-3 text-6xl">💚</div>
                  <p className="text-lg font-semibold text-foreground/90">A surprise locked inside...</p>
                  <p className="mt-1 text-sm italic text-foreground/70">Tap below to unlock 🔒</p>
                </div>
              </div>
            ) : (
              <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl bg-black/30 sm:h-96">
                <img
                  src={m.img}
                  alt={m.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            <p className="mt-4 text-center text-base italic text-foreground/85 sm:text-lg">
              {m.caption}
            </p>

            {m.special && (
              <div className="mt-6 text-center">
                <button
                  onClick={onMemory3Click}
                  className="btn-glow rounded-full px-8 py-3 text-base font-bold"
                >
                  Open Memory 3 💚
                </button>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Heart burst overlay */}
      {showBurst && (
        <div className="heart-burst">
          {burstHearts.map((h) => (
            <span
              key={h.id}
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                animationDelay: `${h.delay}s`,
                ["--tx" as string]: `${h.tx}px`,
                ["--ty" as string]: `${h.ty}px`,
                ["--rot" as string]: `${h.rot}deg`,
              }}
            >
              💚
            </span>
          ))}
        </div>
      )}

      {/* Final photo modal */}
      {showFinalPhoto && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
          <div className="glass-card fade-up max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 text-center sm:p-8">
            <div className="flex max-h-[60vh] w-full items-center justify-center overflow-hidden rounded-xl bg-black/40">
              <img
                src={FINAL_PHOTO}
                alt="The most memorable one"
                className="max-h-[60vh] max-w-full object-contain"
              />
            </div>
            <p className="mt-5 text-base italic text-foreground sm:text-lg">
              "Intha oru photo kaga thaan naan 4 years ah wait pannittu irunthen...
              <br />
              Ithu en life la romba memorable photo ah irukkum 💚"
            </p>
            <button
              onClick={onFinalOk}
              className="btn-glow mt-6 rounded-full px-10 py-3 text-base font-bold"
            >
              OK 💚
            </button>
          </div>
        </div>
      )}

      {/* Thank you ending */}
      {showThankYou && (
        <section className="relative z-10 mx-auto mt-24 max-w-3xl text-center">
          <div className="glass-card fade-up rounded-2xl p-10 sm:p-14">
            <div className="pulse-heart mb-6 text-7xl">💚</div>
            <h2 className="hello-3d mb-4 text-5xl sm:text-6xl">
              {"Thank you Dharaa...".split("").map((ch, i) => (
                <span
                  key={i}
                  className="wave-letter"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/95 sm:text-xl">
              If anything I ever said or did hurt you, I'm truly sorry.
              <br />
              You mean more to me than words can say.
            </p>
            <p className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
              Love u, Dharaa 💚💚💚
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

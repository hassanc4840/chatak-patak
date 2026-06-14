import React from "react";
import { Flame } from "lucide-react";

const champions = [
  { name: "Zain Malik", location: "UCP Campus", time: "1m 45s", avatar: "🔥" },
  { name: "Ahmed R.", location: "DHA Phase 6", time: "2m 10s", avatar: "🥵" },
  { name: "Ali 'Iron Stomach' S.", location: "MM Alam", time: "2m 30s", avatar: "🏆" },
  { name: "Sara Tariq", location: "UCP Campus", time: "3m 05s", avatar: "🌶️" },
  { name: "Faiq Fawad", location: "UCP Campus", time: "3m 22s", avatar: "💯" },
];

export function WallOfFlame() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-chili to-chili-dark p-6 sm:p-10 shadow-2xl border border-red-500/30">
      {/* Background decorations */}
      <div className="absolute -top-10 -right-10 text-9xl opacity-10 rotate-12">🌋</div>
      <div className="absolute -bottom-10 -left-10 text-9xl opacity-10 -rotate-12">🌶️</div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
            <Flame size={16} className="text-mango animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-mango">
              Marketing Stunt LIVE
            </span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl drop-shadow-md">
            The Wall of Flame
          </h2>
          <p className="mt-3 text-white/80 max-w-lg mx-auto text-sm sm:text-base">
            These brave souls conquered the <strong>Spicy Volcano</strong> without shedding a single tear. Think you have what it takes?
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {champions.map((champ, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 transition-transform hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/40 text-xl shadow-inner">
                  {champ.avatar}
                </span>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    {index === 0 && <span className="text-mango">👑</span>}
                    {champ.name}
                  </div>
                  <div className="text-xs text-white/60">{champ.location}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-mango font-mono">{champ.time}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/50">Clear Time</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-8 py-3 rounded-full bg-mango text-charcoal font-bold text-sm transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,193,46,0.4)]">
            Accept the Challenge 🌋
          </button>
        </div>
      </div>
    </div>
  );
}

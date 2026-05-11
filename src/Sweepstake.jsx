import { useState } from "react";

// Tiers ordered 6 -> 1 for reveal order
const GROUPS = [
  {
    tier: 6,
    label: "Tier 6 – Long Shots",
    color: "#a5d6a7",
    bg: "#001a04",
    teams: ["Qatar", "Jordan", "Honduras", "Costa Rica", "New Zealand", "Czech Republic", "Paraguay", "Bolivia"],
  },
  {
    tier: 5,
    label: "Tier 5 – Outsiders",
    color: "#ce93d8",
    bg: "#1a0022",
    teams: ["Saudi Arabia", "South Africa", "Scotland", "Hungary", "Algeria", "Uzbekistan", "Panama", "DR Congo"],
  },
  {
    tier: 4,
    label: "Tier 4 – Capable of a Shock",
    color: "#4fc3f7",
    bg: "#001a22",
    teams: ["Iran", "Nigeria", "Austria", "Turkey", "Ivory Coast", "Venezuela", "Canada", "Cameroon"],
  },
  {
    tier: 3,
    label: "Tier 3 – Dark Horses",
    color: "#CD7F32",
    bg: "#1a0e00",
    teams: ["Mexico", "South Korea", "Switzerland", "Serbia", "Denmark", "Ecuador", "Egypt", "Australia"],
  },
  {
    tier: 2,
    label: "Tier 2 – Contenders",
    color: "#C0C0C0",
    bg: "#1a1a1a",
    teams: ["Belgium", "Uruguay", "Colombia", "Croatia", "Morocco", "Japan", "USA", "Senegal"],
  },
  {
    tier: 1,
    label: "Tier 1 – Favourites",
    color: "#FFD700",
    bg: "#2a2200",
    teams: ["France", "Brazil", "England", "Argentina", "Spain", "Germany", "Portugal", "Netherlands"],
  },
];

const NAMES = ["Carl", "Josh", "Toby", "Sarah", "Sophie", "James", "Kurt", "Lauren"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FLAG_EMOJI = {
  France: "🇫🇷", Brazil: "🇧🇷", England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", Argentina: "🇦🇷", Spain: "🇪🇸",
  Germany: "🇩🇪", Portugal: "🇵🇹", Netherlands: "🇳🇱", Belgium: "🇧🇪", Uruguay: "🇺🇾",
  Colombia: "🇨🇴", Croatia: "🇭🇷", Morocco: "🇲🇦", Japan: "🇯🇵", USA: "🇺🇸",
  Senegal: "🇸🇳", Mexico: "🇲🇽", "South Korea": "🇰🇷", Switzerland: "🇨🇭",
  Serbia: "🇷🇸", Denmark: "🇩🇰", Ecuador: "🇪🇨", Egypt: "🇪🇬", Australia: "🇦🇺",
  Iran: "🇮🇷", Nigeria: "🇳🇬", Austria: "🇦🇹", Turkey: "🇹🇷", "Ivory Coast": "🇨🇮",
  Venezuela: "🇻🇪", Canada: "🇨🇦", Cameroon: "🇨🇲", "Saudi Arabia": "🇸🇦",
  "South Africa": "🇿🇦", Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", Hungary: "🇭🇺", Algeria: "🇩🇿",
  Uzbekistan: "🇺🇿", Panama: "🇵🇦", "DR Congo": "🇨🇩", Qatar: "🇶🇦", Jordan: "🇯🇴",
  Honduras: "🇭🇳", "Costa Rica": "🇨🇷", "New Zealand": "🇳🇿", "Czech Republic": "🇨🇿",
  Paraguay: "🇵🇾", Bolivia: "🇧🇴",
};

// Build the full draw: personResults[i].teams[tierIndex]
function buildDraw() {
  const shuffledTiers = GROUPS.map((g) => shuffle(g.teams));
  // shuffledTiers[tierIndex][personIndex] = team
  return NAMES.map((name, pi) => ({
    name,
    // teams indexed same as GROUPS order (tier6 first)
    teams: GROUPS.map((_, ti) => shuffledTiers[ti][pi]),
  }));
}

export default function Sweepstake() {
  // draw is: array of { tierIndex, personIndex, team, name } reveals, ordered by tier then random person
  const [phase, setPhase] = useState("ready"); // ready | drawing | done
  const [allResults, setAllResults] = useState(null); // full draw data
  const [reveals, setReveals] = useState([]); // sequence of reveals
  const [revealStep, setRevealStep] = useState(0); // which step we're on
  const [shown, setShown] = useState(false); // whether current step is revealed

  function startDraw() {
    const drawData = buildDraw();
    // Build reveal sequence: for each tier (0..5), shuffle the 8 people
    const sequence = [];
    GROUPS.forEach((g, ti) => {
      const personOrder = shuffle([...Array(8).keys()]);
      personOrder.forEach((pi) => {
        sequence.push({
          tierIndex: ti,
          personIndex: pi,
          name: NAMES[pi],
          team: drawData[pi].teams[ti],
          tierLabel: g.label,
          tierColor: g.color,
          tierBg: g.bg,
          tier: g.tier,
        });
      });
    });
    setAllResults(drawData);
    setReveals(sequence);
    setRevealStep(0);
    setShown(false);
    setPhase("drawing");
  }

  function revealCurrent() {
    setShown(true);
  }

  function nextStep() {
    const next = revealStep + 1;
    if (next >= reveals.length) {
      setPhase("done");
    } else {
      setRevealStep(next);
      setShown(false);
    }
  }

  function reset() {
    setPhase("ready");
    setAllResults(null);
    setReveals([]);
    setRevealStep(0);
    setShown(false);
  }

  const current = reveals[revealStep];
  const isLastStep = revealStep >= reveals.length - 1;

  // Group reveals done so far by person for summary sidebar
  const revealedSoFar = reveals.slice(0, shown ? revealStep + 1 : revealStep);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#f0e6cc",
      overflowX: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1200 0%, #0a0a0f 50%, #001a1a 100%)",
        borderBottom: "2px solid #FFD700",
        padding: "2rem 2rem 1.5rem",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.3rem" }}>🏆</div>
        <h1 style={{
          fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
          fontWeight: "900",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          background: "linear-gradient(90deg, #FFD700, #fff8dc, #FFD700)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: "0 0 0.2rem",
        }}>World Cup 2026</h1>
        <p style={{ color: "#aaa", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", margin: 0 }}>
          Office Sweepstake Draw
        </p>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* READY PHASE */}
        {phase === "ready" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#bba", marginBottom: "1.5rem", fontSize: "1rem", lineHeight: 1.7 }}>
              The draw is ready for <strong style={{ color: "#FFD700" }}>Carl, Josh, Toby, Sarah, Sophie, James, Kurt</strong> and <strong style={{ color: "#FFD700" }}>Lauren</strong>. Starting from Tier 6, a random person will be drawn for each team, working up to the favourites.
            </p>

            {/* Tier preview */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.6rem", marginBottom: "2.5rem", textAlign: "left" }}>
              {GROUPS.map((g) => (
                <div key={g.tier} style={{
                  background: g.bg,
                  border: `1px solid ${g.color}44`,
                  borderLeft: `3px solid ${g.color}`,
                  borderRadius: "6px",
                  padding: "0.6rem 0.9rem",
                }}>
                  <div style={{ color: g.color, fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" }}>{g.label}</div>
                  <div style={{ color: "#777", fontSize: "0.7rem", marginTop: "0.2rem" }}>{g.teams.join(", ")}</div>
                </div>
              ))}
            </div>

            <button onClick={startDraw} style={{
              background: "linear-gradient(135deg, #FFD700, #cc9900)",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              padding: "1rem 3.5rem",
              fontSize: "1.1rem",
              fontFamily: "inherit",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 24px #FFD70066",
              animation: "pulse 1.5s infinite",
            }}>
              Start the Draw ⚽
            </button>
          </div>
        )}

        {/* DRAWING PHASE */}
        {phase === "drawing" && current && (
          <div>
            {/* Tier progress indicator */}
            <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginBottom: "1.8rem", flexWrap: "wrap" }}>
              {GROUPS.map((g, ti) => {
                const tierDone = revealStep >= (ti + 1) * 8 || (shown && revealStep >= ti * 8 && revealStep < (ti + 1) * 8);
                const tierActive = current.tierIndex === ti;
                return (
                  <div key={ti} style={{
                    padding: "0.3rem 0.7rem",
                    borderRadius: "20px",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: `1px solid ${g.color}`,
                    background: tierActive ? g.color : "transparent",
                    color: tierActive ? "#000" : g.color,
                    opacity: tierDone && !tierActive ? 0.4 : 1,
                    transition: "all 0.3s",
                  }}>
                    T{g.tier}
                  </div>
                );
              })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
              {/* Left: current draw card */}
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{
                  background: current.tierBg,
                  border: `2px solid ${current.tierColor}`,
                  borderRadius: "12px",
                  padding: "2rem",
                  textAlign: "center",
                  boxShadow: `0 0 40px ${current.tierColor}33`,
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}>
                  <div style={{ color: current.tierColor, fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {current.tierLabel}
                  </div>
                  <div style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", fontWeight: "900", color: "#f0e6cc" }}>
                    {FLAG_EMOJI[current.team] || "🏳"} {current.team}
                  </div>

                  {!shown ? (
                    <div>
                      <div style={{ color: "#888", fontSize: "0.85rem", marginBottom: "1rem" }}>Who gets this one?</div>
                      <button onClick={revealCurrent} style={{
                        background: `linear-gradient(135deg, ${current.tierColor}, ${current.tierColor}aa)`,
                        color: "#000",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.8rem 2.5rem",
                        fontSize: "1rem",
                        fontFamily: "inherit",
                        fontWeight: "700",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        boxShadow: `0 4px 20px ${current.tierColor}55`,
                        animation: "pulse 1.5s infinite",
                      }}>
                        Draw a Name 🎲
                      </button>
                    </div>
                  ) : (
                    <div style={{ animation: "fadeSlide 0.4s ease both" }}>
                      <div style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Goes to</div>
                      <div style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)", fontWeight: "900", color: current.tierColor }}>
                        {current.name}
                      </div>
                      <button onClick={nextStep} style={{
                        marginTop: "1.2rem",
                        background: isLastStep ? "linear-gradient(135deg, #FFD700, #cc9900)" : "#1a1a2e",
                        color: isLastStep ? "#000" : current.tierColor,
                        border: `1px solid ${current.tierColor}66`,
                        borderRadius: "8px",
                        padding: "0.7rem 2rem",
                        fontSize: "0.9rem",
                        fontFamily: "inherit",
                        fontWeight: "700",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}>
                        {isLastStep ? "See Full Results 🏆" : "Next Draw →"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress: revealed so far */}
              {revealedSoFar.length > 0 && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
                    Drawn so far ({revealedSoFar.length} of 48)
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {revealedSoFar.map((r, i) => (
                      <div key={i} style={{
                        background: r.tierBg,
                        border: `1px solid ${r.tierColor}44`,
                        borderRadius: "20px",
                        padding: "0.25rem 0.7rem",
                        fontSize: "0.78rem",
                        color: "#ccc",
                        whiteSpace: "nowrap",
                      }}>
                        {FLAG_EMOJI[r.team] || "🏳"} {r.team} <span style={{ color: r.tierColor, fontWeight: "700" }}>{r.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DONE PHASE */}
        {phase === "done" && allResults && (
          <div>
            <h2 style={{ textAlign: "center", color: "#FFD700", fontSize: "1.8rem", marginBottom: "0.4rem", fontWeight: "900" }}>Full Draw Results</h2>
            <p style={{ textAlign: "center", color: "#888", marginBottom: "2rem", fontSize: "0.85rem" }}>Good luck everyone!</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {allResults.map((person, i) => (
                <div key={i} style={{
                  background: "#111118",
                  border: "1px solid #FFD70033",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    background: "linear-gradient(90deg, #1a1200, #111118)",
                    padding: "0.6rem 1.1rem",
                    borderBottom: "1px solid #FFD70022",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}>
                    <span style={{ background: "#FFD700", color: "#000", borderRadius: "50%", width: "22px", height: "22px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: "900", flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontWeight: "700", fontSize: "1rem", color: "#FFD700" }}>{person.name}</span>
                  </div>
                  <div style={{ padding: "0.7rem 1.1rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {person.teams.map((team, ti) => (
                      <span key={ti} style={{
                        background: GROUPS[ti].bg,
                        border: `1px solid ${GROUPS[ti].color}55`,
                        borderRadius: "20px",
                        padding: "0.25rem 0.7rem",
                        fontSize: "0.82rem",
                        color: "#f0e6cc",
                        whiteSpace: "nowrap",
                      }}>
                        {FLAG_EMOJI[team] || "🏳"} {team}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={reset} style={{
                background: "transparent",
                color: "#FFD700",
                border: "1px solid #FFD70066",
                borderRadius: "8px",
                padding: "0.7rem 2rem",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}>
                Run a New Draw
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 4px 24px currentColor; }
          50% { box-shadow: 0 4px 40px currentColor; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

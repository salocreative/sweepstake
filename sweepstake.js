"use strict";

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

const FLAG_EMOJI = {
  France: "🇫🇷",
  Brazil: "🇧🇷",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Argentina: "🇦🇷",
  Spain: "🇪🇸",
  Germany: "🇩🇪",
  Portugal: "🇵🇹",
  Netherlands: "🇳🇱",
  Belgium: "🇧🇪",
  Uruguay: "🇺🇾",
  Colombia: "🇨🇴",
  Croatia: "🇭🇷",
  Morocco: "🇲🇦",
  Japan: "🇯🇵",
  USA: "🇺🇸",
  Senegal: "🇸🇳",
  Mexico: "🇲🇽",
  "South Korea": "🇰🇷",
  Switzerland: "🇨🇭",
  Serbia: "🇷🇸",
  Denmark: "🇩🇰",
  Ecuador: "🇪🇨",
  Egypt: "🇪🇬",
  Australia: "🇦🇺",
  Iran: "🇮🇷",
  Nigeria: "🇳🇬",
  Austria: "🇦🇹",
  Turkey: "🇹🇷",
  "Ivory Coast": "🇨🇮",
  Venezuela: "🇻🇪",
  Canada: "🇨🇦",
  Cameroon: "🇨🇲",
  "Saudi Arabia": "🇸🇦",
  "South Africa": "🇿🇦",
  Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  Hungary: "🇭🇺",
  Algeria: "🇩🇿",
  Uzbekistan: "🇺🇿",
  Panama: "🇵🇦",
  "DR Congo": "🇨🇩",
  Qatar: "🇶🇦",
  Jordan: "🇯🇴",
  Honduras: "🇭🇳",
  "Costa Rica": "🇨🇷",
  "New Zealand": "🇳🇿",
  "Czech Republic": "🇨🇿",
  Paraguay: "🇵🇾",
  Bolivia: "🇧🇴",
};

/** One World Cup trivia line per nation (sources: supplied team facts). */
const TEAM_FACTS = {
  Qatar:
    "Qatar became the first host nation eliminated in the group stage at a World Cup, crashing out on home soil in 2022.",
  Jordan:
    "Jordan only qualified for their first ever World Cup in 2026 — a historic moment for a nation whose team is nicknamed 'Al-Nashama' (The Nobles).",
  Honduras:
    "Honduras once played a qualifier so contentious it contributed to the outbreak of the actual 1969 Football War with El Salvador.",
  "Costa Rica":
    "Costa Rica reached the quarter-finals in 2014, beating Italy, Uruguay and Greece before losing to the Netherlands on penalties.",
  "New Zealand":
    "New Zealand are the only team to play at a World Cup, not concede a single goal, and still go home — they drew all three games in 2010.",
  "Czech Republic":
    "Czechoslovakia reached the World Cup final twice, in 1934 and 1962, losing both times — still one of football's great nearly-stories.",
  Paraguay:
    "Paraguay hold the record for the most penalty shootout wins in World Cup history, with three victories from the spot.",
  Bolivia:
    "Bolivia's home ground in La Paz sits at 3,600 metres above sea level — visiting teams regularly struggle just to breathe, let alone play.",

  "Saudi Arabia":
    "Saudi Arabia pulled off one of the biggest upsets ever in 2022, beating eventual champions Argentina 2-1 in the group stage.",
  "South Africa":
    "South Africa hosted the 2010 World Cup — the first African nation to do so — and introduced the world to the vuvuzela.",
  Scotland:
    "Scotland played in the world's very first international football match, drawing 0-0 with England in 1872.",
  Hungary:
    "Hungary's golden generation of the 1950s went 32 games unbeaten and hold the record for the biggest World Cup win: 10-1 vs El Salvador in 1982.",
  Algeria:
    "Algeria's 1982 win over West Germany is still considered one of the greatest upsets in World Cup history.",
  Uzbekistan:
    "Uzbekistan have never previously qualified for a World Cup — 2026 marks their historic debut on the world stage.",
  Panama:
    "When Panama scored their first ever World Cup goal in 2018, the entire nation reportedly came to a standstill. The scorer, Felipe Baloy, was 37 years old.",
  "DR Congo":
    "DR Congo, as Zaire, were the first sub-Saharan African nation at a World Cup in 1974 — though they conceded 14 goals across just three games.",

  Iran:
    "Iran's 1998 World Cup win over the USA was one of the most politically charged football matches ever played.",
  Nigeria:
    "Nigeria's golden generation in the 1990s — featuring Okocha, Kanu and Yekini — captivated the world and won Olympic gold in 1996.",
  Austria:
    "Austria finished third at the 1954 World Cup, which featured one of the most remarkable matches ever played — a 7-5 thriller against Switzerland.",
  Turkey:
    "Hakan Sukur scored the fastest goal in World Cup history — just 11 seconds into the 2002 third-place playoff against South Korea.",
  "Ivory Coast":
    "Ivory Coast were drawn into the same group as Argentina, Greece and Nigeria at 2010 — widely voted the tournament's Group of Death.",
  Venezuela:
    "Venezuela were the only South American country never to have qualified for a World Cup before 2026, making this a genuinely historic occasion.",
  Canada:
    "Canada's last World Cup before 2022 was in 1986, where they played three games, scored zero goals and finished bottom of their group.",
  Cameroon:
    "Roger Milla became a global icon at Italia 90 aged 38, dancing at the corner flag after every goal and dragging Cameroon to the quarter-finals.",

  Mexico:
    "Mexico have reached the round of 16 at seven consecutive World Cups — a run their fans call 'El Quinto Partido', always chasing that elusive fifth game.",
  "South Korea":
    "South Korea co-hosted 2002 and became the first Asian nation to reach the semi-finals, knocking out Spain and Italy along the way.",
  Switzerland:
    "Switzerland have never conceded a goal in normal time in a World Cup knockout match — they've only ever gone out on penalties or in extra time.",
  Serbia:
    "Yugoslavia, the predecessor to Serbia, were one of the founding nations of the World Cup and finished fourth in the very first tournament in 1930.",
  Denmark:
    "Denmark weren't even supposed to be at Euro 92 — they replaced Yugoslavia at 10 days notice and won the whole thing.",
  Ecuador:
    "Ecuador became only the second South American team ever to win their opening World Cup match when they debuted in 2002.",
  Egypt:
    "Egypt are Africa's most decorated national team, having won the Africa Cup of Nations a record seven times.",
  Australia:
    "Tim Cahill's 2014 volley against the Netherlands — struck on the half-turn with the outside of his boot — is regularly voted one of the greatest World Cup goals ever.",

  Belgium:
    "Belgium spent 1,470 days as the world's number one ranked team — longer than any other nation in FIFA ranking history.",
  Uruguay:
    "Uruguay won the first ever World Cup in 1930 as hosts, then repeated the trick in 1950 with the 'Maracanazo' — shocking Brazil in front of 200,000 people.",
  Colombia:
    "James Rodriguez won the 2014 Golden Boot with six goals and became one of the tournament's most iconic players almost overnight.",
  Croatia:
    "Croatia reached the 2018 World Cup final as a nation of just 4 million people — one of the smallest ever to play on that stage.",
  Morocco:
    "Morocco became the first African and Arab nation to reach a World Cup semi-final, stunning Portugal and Spain at Qatar 2022.",
  Japan:
    "Japan have qualified for every World Cup since 1998 and became famous worldwide for their fans cleaning the stadium after every single match.",
  USA:
    "The USA beat England 1-0 at the 1950 World Cup in one of the biggest upsets in football history — a result so unlikely that some newspapers assumed it was a typo.",
  Senegal:
    "Senegal beat France — the defending world champions — in their very first World Cup match ever in 2002, eventually reaching the quarter-finals.",

  France:
    "France won the World Cup in 1998 on home soil, then again in 2018 — their 2018 squad featured 15 players of African heritage, celebrated as a symbol of modern France.",
  Brazil:
    "Brazil are the only nation to have appeared in every single World Cup — all 22 tournaments — and have won it a record five times.",
  England:
    "England have won the World Cup exactly once, in 1966, and the winner of the final is still technically disputed — Geoff Hurst's shot may or may not have crossed the line.",
  Argentina:
    "Argentina's 2022 win in Qatar ended a 36-year wait and finally gave Lionel Messi the one trophy that had eluded him throughout his entire career.",
  Spain:
    "Spain became the first team to win a World Cup having lost their opening game, recovering from a defeat to Switzerland to lift the trophy in 2010.",
  Germany:
    "Germany have appeared in more World Cup finals than any other nation — eight in total — winning four of them.",
  Portugal:
    "Eusebio finished top scorer at the 1966 World Cup with nine goals, a record that stood for decades and made him the first global superstar from African football.",
  Netherlands:
    "The Netherlands have reached three World Cup finals — 1974, 1978 and 2010 — and lost all three, cementing their reputation as football's greatest nearly-men.",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDraw() {
  const shuffledTiers = GROUPS.map((g) => shuffle(g.teams));
  return NAMES.map((name, pi) => ({
    name,
    teams: GROUPS.map((_, ti) => shuffledTiers[ti][pi]),
  }));
}

function flag(team) {
  return FLAG_EMOJI[team] || "🏳";
}

/** @type {{ phase: string, allResults: null | { name: string; teams: string[] }[], reveals: any[], revealStep: number, shown: boolean, shuffleRunning: boolean, shuffleLabel: string }} */
const state = {
  phase: "ready",
  allResults: null,
  reveals: [],
  revealStep: 0,
  shown: false,
  shuffleRunning: false,
  shuffleLabel: "",
};

/** @type {ReturnType<typeof setTimeout> | null} */
let shuffleTimer = null;

function cancelShuffle() {
  if (shuffleTimer != null) {
    clearTimeout(shuffleTimer);
    shuffleTimer = null;
  }
}

function buildRevealSequence(drawData) {
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
  return sequence;
}

function startDraw() {
  cancelShuffle();
  const drawData = buildDraw();
  state.allResults = drawData;
  state.reveals = buildRevealSequence(drawData);
  state.revealStep = 0;
  state.shown = false;
  state.shuffleRunning = false;
  state.shuffleLabel = "";
  state.phase = "drawing";
  render();
}

function runShuffleLoop() {
  cancelShuffle();

  const current = state.reveals[state.revealStep];
  if (!current || state.phase !== "drawing") return;

  const winner = current.name;
  const decoys = NAMES.filter((n) => n !== winner);
  let lastShown = "";
  const totalTicks = 28;

  let tick = 0;

  function step() {
    if (state.phase !== "drawing" || !state.shuffleRunning) return;

    tick += 1;
    const progress = tick / totalTicks;
    const delay = 26 + Math.pow(progress, 2.65) * 280;

    if (tick < totalTicks) {
      let pick = decoys[Math.floor(Math.random() * decoys.length)];
      if (pick === lastShown && decoys.length > 1) {
        pick = decoys.find((n) => n !== lastShown) ?? pick;
      }
      lastShown = pick;
      state.shuffleLabel = pick;
      const slot = document.getElementById("shuffle-name");
      if (slot) slot.textContent = pick;
      shuffleTimer = setTimeout(step, delay);
      return;
    }

    state.shuffleLabel = winner;
    state.shuffleRunning = false;
    state.shown = true;
    render();
  }

  shuffleTimer = setTimeout(step, 80);
}

function revealCurrent() {
  if (state.shuffleRunning) return;
  state.shuffleRunning = true;
  render();
  runShuffleLoop();
}

function nextStep() {
  cancelShuffle();
  const next = state.revealStep + 1;
  if (next >= state.reveals.length) {
    state.phase = "done";
  } else {
    state.revealStep = next;
    state.shown = false;
    state.shuffleRunning = false;
    state.shuffleLabel = "";
  }
  render();
}

function reset() {
  cancelShuffle();
  state.phase = "ready";
  state.allResults = null;
  state.reveals = [];
  state.revealStep = 0;
  state.shown = false;
  state.shuffleRunning = false;
  state.shuffleLabel = "";
  render();
}

/** @typedef {{ class?: string, text?: string, style?: Partial<CSSStyleDeclaration>, html?: string, id?: string, type?: string, [k: string]: unknown }} Props */

/**
 * @param {string} tag
 * @param {Props|null} props
 * @param {(HTMLElement | DocumentFragment | string)[]} [kids]
 */
function el(tag, props, kids) {
  const node = document.createElement(tag);
  if (props != null && typeof props === "object") {
    Object.entries(props).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      if (k === "class") node.className = /** @type {string} */ (v);
      else if (k === "text") node.textContent = String(v);
      else if (k === "html") node.innerHTML = String(v);
      else if (k.startsWith("on") && typeof v === "function") {
        node.addEventListener(k.slice(2).toLowerCase(), /** @type {EventListener} */ (v));
      }
      else if (k === "style" && typeof v === "object") Object.assign(node.style, /** @type {object} */ (v));
      else if (typeof v !== "boolean" || v === true) node.setAttribute(k, String(v));
    });
  }
  (kids ?? []).flat().forEach((c) => {
    if (c == null || c === "") return;
    node.append(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

function renderReady() {
  const root = el("div", { class: "phase-ready center" });

  root.appendChild(
    el("p", {
      class: "intro",
      html:
        'The draw is ready for <strong style="color:#FFD700">Carl, Josh, Toby, Sarah, Sophie, James, Kurt</strong> ' +
        'and <strong style="color:#FFD700">Lauren</strong>. Starting from Tier 6, a random person will be drawn ' +
        "for each team, working up to the favourites.",
    }),
  );

  const grid = el("div", { class: "tier-grid" }, []);
  GROUPS.forEach((g) => {
    grid.appendChild(
      el(
        "div",
        {
          class: "tier-card",
          style: {
            background: g.bg,
            border: `1px solid ${g.color}44`,
            borderLeft: `3px solid ${g.color}`,
          },
        },
        [
          el("div", { class: "tier-card-label", style: { color: g.color }, text: g.label }),
          el("div", { class: "tier-card-teams", text: g.teams.join(", ") }),
        ],
      ),
    );
  });

  root.appendChild(grid);
  root.appendChild(el("button", { type: "button", class: "btn-start", onClick: startDraw }, ["Start the Draw ⚽"]));

  return root;
}

function renderDrawing() {
  const current = state.reveals[state.revealStep];
  const frag = document.createDocumentFragment();

  const isLastStep = state.revealStep >= state.reveals.length - 1;
  const revealedSoFar = state.reveals.slice(0, state.shown ? state.revealStep + 1 : state.revealStep);

  const pills = el("div", { class: "tier-pills" }, []);
  GROUPS.forEach((g, ti) => {
    const tierDone =
      state.revealStep >= (ti + 1) * 8 ||
      (state.shown && state.revealStep >= ti * 8 && state.revealStep < (ti + 1) * 8);
    const tierActive = current && current.tierIndex === ti;

    pills.appendChild(
      el(
        "div",
        {
          class: "tier-pill",
          style: {
            borderColor: g.color,
            background: tierActive ? g.color : "transparent",
            color: tierActive ? "#000" : g.color,
            opacity: tierDone && !tierActive ? "0.4" : "1",
          },
        },
        [`T${g.tier}`],
      ),
    );
  });

  frag.appendChild(pills);

  if (!current) {
    frag.appendChild(document.createComment("waiting"));
    return frag;
  }

  const inner = [];

  inner.push(
    el("div", { class: "draw-tier-label", style: { color: current.tierColor }, text: current.tierLabel }),
  );

  const teamFact = TEAM_FACTS[current.team];
  const teamBlockKids = [
    el("div", { class: "draw-team", text: `${flag(current.team)} ${current.team}` }),
  ];
  if (teamFact)
    teamBlockKids.push(el("p", { class: "draw-team-fact", text: teamFact }));
  inner.push(el("div", { class: "draw-team-block" }, teamBlockKids));

  if (!state.shown) {
    if (state.shuffleRunning) {
      inner.push(
        el("div", {}, [
          el("div", { class: "picking-label", text: "Picking..." }),
          el("div", {
            id: "shuffle-name",
            class: "shuffle-name",
            style: {
              color: current.tierColor,
              textShadow: `0 0 28px ${current.tierColor}55`,
            },
            "aria-live": "polite",
            "aria-busy": "true",
            text: state.shuffleLabel || "···",
          }),
        ]),
      );
    } else {
      inner.push(el("div", { class: "hint", text: "Who gets this one?" }));
      inner.push(
        el("button", {
          type: "button",
          class: "btn-draw",
          style: {
            background: `linear-gradient(135deg, ${current.tierColor}, ${current.tierColor}aa)`,
            color: "#000",
            boxShadow: `0 4px 20px ${current.tierColor}55`,
          },
          onClick: revealCurrent,
          text: "Draw a Name 🎲",
        }),
      );
    }
  } else {
    inner.push(
      el("div", { class: "reveal-block" }, [
        el("div", { class: "reveal-goes", text: "Goes to" }),
        el("div", {
          class: "reveal-name",
          style: {
            color: current.tierColor,
            textShadow: `0 0 36px ${current.tierColor}66, 0 2px 0 rgba(0,0,0,0.38)`,
          },
          text: current.name,
        }),
        el("button", {
          type: "button",
          class: `btn-next ${isLastStep ? "btn-next-last" : "btn-next-muted"}`,
          style: isLastStep
            ? {}
            : { border: `1px solid ${current.tierColor}66`, color: current.tierColor, background: "#1a1a2e" },
          onClick: nextStep,
          text: isLastStep ? "See Full Results 🏆" : "Next Draw →",
        }),
      ]),
    );
  }

  const card = el(
    "div",
    {
      class: "draw-card",
      style: {
        background: current.tierBg,
        borderColor: current.tierColor,
        boxShadow: `0 0 40px ${current.tierColor}33`,
      },
    },
    inner,
  );

  frag.appendChild(card);

  if (revealedSoFar.length > 0) {
    const box = el("div", { style: { marginTop: "1.25rem" } }, [
      el("p", {
        class: "drawn-heading",
        text: `Drawn so far (${revealedSoFar.length} of 48)`,
      }),
    ]);
    const tags = el("div", { class: "drawn-tags" }, []);
    revealedSoFar.forEach((r) => {
      const chipText = `${flag(r.team)} ${r.team} `;
      const chip = el(
        "div",
        {
          class: "drawn-chip",
          style: {
            background: r.tierBg,
            borderColor: `${r.tierColor}44`,
          },
        },
        [],
      );
      chip.appendChild(document.createTextNode(chipText));
      const accent = document.createElement("strong");
      accent.style.fontWeight = "700";
      accent.style.color = r.tierColor;
      accent.textContent = r.name;
      chip.appendChild(accent);
      tags.appendChild(chip);
    });
    box.appendChild(tags);
    frag.appendChild(box);
  }

  return frag;
}

function renderDone() {
  const results = state.allResults || [];
  const root = el("div", { class: "phase-done" }, [
    el("h2", { class: "results-title", text: "Full Draw Results" }),
    el("p", { class: "results-sub", text: "Good luck everyone!" }),
  ]);

  const list = el("div", { class: "person-list" }, []);
  results.forEach((person, i) => {
    const teamsFrag = GROUPS.map((g, ti) =>
      el(
        "span",
        {
          class: "team-chip",
          style: {
            background: g.bg,
            borderColor: `${g.color}55`,
          },
        },
        [document.createTextNode(`${flag(person.teams[ti])} ${person.teams[ti]}`)],
      ),
    );

    list.appendChild(
      el(
        "div",
        { class: "person-card" },
        [
          el(
            "div",
            { class: "person-head" },
            [
              el("span", { class: "person-num", text: String(i + 1) }),
              el("span", { class: "person-name", text: person.name }),
            ],
          ),
          el("div", { class: "person-teams" }, teamsFrag),
        ],
      ),
    );
  });

  root.appendChild(list);
  root.appendChild(el("div", { class: "center" }, [el("button", { type: "button", class: "btn-reset", onClick: reset, text: "Run a New Draw" })]));

  return root;
}

function render() {
  const main = document.getElementById("main");
  if (!main) return;
  main.replaceChildren();

  if (state.phase === "ready") {
    main.appendChild(renderReady());
    return;
  }
  if (state.phase === "drawing") {
    main.appendChild(renderDrawing());
    return;
  }
  if (state.phase === "done" && state.allResults) {
    main.appendChild(renderDone());
  }
}

render();

const BLADE_LABELS = {
  defensive: "Defensive",
  allround: "All-Round",
  offensive: "Offensive",
  offensiveplus: "Offensive+",
};

const RUBBER_LABELS = {
  control: "Control",
  spin: "Spin",
  tensor: "Tensor",
  anti: "Anti-spin",
  longpips: "Long Pips",
};

const PROFILES = [
  {
    when: { blade: "offensiveplus", forehand: "tensor", backhand: "tensor" },
    name: "All-Out Attacker",
    summary:
      "The modern professional setup. Two fast tensor rubbers on the fastest blade, built for explosive loops and aggressive counter-hits.",
    traits: ["Maximum speed", "Heavy spin", "Demanding"],
  },
  {
    when: { blade: "offensive", forehand: "tensor", backhand: "tensor" },
    name: "Two-Winged Looper",
    summary:
      "A balanced attacking setup with plenty of speed and spin, but more forgiving than an Offensive+ blade.",
    traits: ["Fast", "Heavy spin", "Balanced"],
  },
  {
    when: { blade: "offensive", forehand: "spin", backhand: "spin" },
    name: "Classic Looper",
    summary:
      "Tacky spin rubbers on a fast blade. Built for players who win points through heavy topspin rather than raw speed.",
    traits: ["Heavy spin", "Strong loops", "Controlled"],
  },
  {
    when: { blade: "allround", forehand: "control", backhand: "control" },
    name: "Beginner's Setup",
    summary:
      "Forgiving rubbers on a balanced blade. The standard recommendation for learning the fundamentals.",
    traits: ["Forgiving", "Predictable", "Beginner-friendly"],
  },
  {
    when: { blade: "defensive", forehand: "anti", backhand: "longpips" },
    name: "Classic Chopper",
    summary:
      "A defender's weapon. The slow blade absorbs pace while the disruption rubbers neutralize spin and produce returns opponents struggle to read.",
    traits: ["Defensive", "Disruptive"],
  },
  {
    when: { backhand: "longpips" },
    name: "Disruption Specialist",
    summary:
      "Long pips on the backhand make returns unpredictable. Often paired with an attacking forehand to switch between disruption and offense.",
    traits: ["Unpredictable", "Dual-style"],
  },
  {
    when: { forehand: "anti", backhand: "anti" },
    name: "Spin Killer",
    summary:
      "Both sides neutralize incoming spin. Frustrates loopers but generates little offense of its own.",
    traits: ["Neutralizes spin", "Defensive"],
  },
];

const matchProfile = (selection) => {
  for (const profile of PROFILES) {
    const matches = Object.keys(profile.when).every(
      (key) => profile.when[key] === selection[key]
    );
    if (matches) return profile;
  }
  return {
    name: "Custom Setup",
    summary: `A ${BLADE_LABELS[selection.blade].toLowerCase()} blade with ${RUBBER_LABELS[selection.forehand].toLowerCase()} on the forehand and ${RUBBER_LABELS[selection.backhand].toLowerCase()} on the backhand.`,
    traits: [],
  };
};

const update = () => {
  const selection = {
    blade: document.getElementById("blade-select").value,
    forehand: document.getElementById("forehand-select").value,
    backhand: document.getElementById("backhand-select").value,
  };
  const profile = matchProfile(selection);

  document.querySelector(".result-name").textContent = profile.name;
  document.querySelector(".result-summary").textContent = profile.summary;

  const traitsEl = document.querySelector(".result-traits");
  traitsEl.innerHTML = "";
  profile.traits.forEach((trait) => {
    const li = document.createElement("li");
    li.textContent = trait;
    traitsEl.appendChild(li);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".builder-select").forEach((select) => {
    select.addEventListener("change", update);
  });
  update();
});
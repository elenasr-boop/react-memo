export async function getLeaderBoard() {
  const res = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard", {
    method: "GET",
  });

  const data = await res.json();

  return data;
}

export async function addLeader({ name, time, hardMode, superPower }) {
  let achievements = [];

  if (hardMode) {
    achievements.push(1);
  }
  if (superPower) {
    achievements.push(2);
  }

  const res = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      time: time,
      achievements: achievements,
    }),
  });

  const data = await res.json();

  return data;
}

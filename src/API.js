export async function getLeaderBoard() {
  const res = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard", {
    method: "GET",
  });

  const data = await res.json();

  return data;
}

export async function addLeader({ name, time, achievements }) {
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

function levenshteinDistance(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0),
          dp[i][j - 1] + 1,
          dp[i - 1][j] + 1
        );
      }
    }
  }

  return dp[m][n];
}

// 몬스터 추천 함수
function suggestCorrection(input, json, threshold = 3) {
  const suggestions = [];

  for (const data of json) {
    const distance = levenshteinDistance(
      input.replace(/\s/g, ""),
      data.name.replace(/\s/g, "")
    );
    if (distance <= threshold) {
      suggestions.push({ ...data, distance });
    }
  }

  suggestions.sort((a, b) => a.distance - b.distance);

  return suggestions;
}

module.exports = {
  suggestCorrection: suggestCorrection,
};

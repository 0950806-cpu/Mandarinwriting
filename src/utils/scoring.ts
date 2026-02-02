// Very simple scoring: normalize bounding box and resample points, compute average distance.

function bbox(points: number[][]) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const [x, y] of points) {
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }
  return { minX, minY, maxX, maxY }
}

function normalize(points: number[][]) {
  const b = bbox(points)
  const w = b.maxX - b.minX || 1
  const h = b.maxY - b.minY || 1
  return points.map(([x, y]) => [(x - b.minX) / w, (y - b.minY) / h])
}

function resample(points: number[][], n = 32) {
  if (points.length === 0) return Array(n).fill([0, 0])
  const D = [0]
  for (let i = 1; i < points.length; i++) {
    const dx = points[i][0] - points[i - 1][0]
    const dy = points[i][1] - points[i - 1][1]
    D.push(D[D.length - 1] + Math.hypot(dx, dy))
  }
  const total = D[D.length - 1] || 1
  const out: number[][] = []
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * total
    let j = 0
    while (j < D.length - 1 && D[j + 1] < t) j++
    const ratio = (t - D[j]) / (D[j + 1] - D[j] || 1)
    const x = points[j][0] + ratio * (points[j + 1][0] - points[j][0])
    const y = points[j][1] + ratio * (points[j + 1][1] - points[j][1])
    out.push([x, y])
  }
  return out
}

export function scoreStrokes(targetStrokes: number[][][], userStrokes: number[][][]) {
  // Align by count: if different number of strokes, compare aggregated path
  if (targetStrokes.length !== userStrokes.length) {
    // flatten both
    const t = targetStrokes.flat()
    const u = userStrokes.flat()
    return scorePath(t, u)
  }
  let total = 0
  for (let i = 0; i < targetStrokes.length; i++) {
    total += scorePath(targetStrokes[i], userStrokes[i])
  }
  return total / targetStrokes.length
}

function scorePath(t: number[][], u: number[][]) {
  const tn = normalize(t)
  const un = normalize(u)
  const tr = resample(tn)
  const ur = resample(un)
  let s = 0
  for (let i = 0; i < tr.length; i++) {
    s += Math.hypot(tr[i][0] - ur[i][0], tr[i][1] - ur[i][1])
  }
  const avg = s / tr.length // 0 = perfect, larger = worse
  // Convert to a 0..1 score (1 = perfect)
  const score = Math.max(0, 1 - avg * 2) // multiplier is heuristic
  return score
}

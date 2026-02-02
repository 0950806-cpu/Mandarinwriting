// A small selection of Traditional Chinese characters only (no simplified characters allowed here)
// Each target stroke is represented as an array of [x, y] points. For now, we store a simplified placeholder
// Real integration should extract paths from HanziWriter or a dataset of stroke paths for higher quality scoring.

const characters = [
  { char: '你', strokes: [] },
  { char: '好', strokes: [] },
  { char: '學', strokes: [] },
  { char: '愛', strokes: [] },
  { char: '國', strokes: [] },
  { char: '中', strokes: [] },
  { char: '人', strokes: [] },
  { char: '日', strokes: [] },
  { char: '月', strokes: [] },
  { char: '水', strokes: [] },
  { char: '火', strokes: [] },
  { char: '木', strokes: [] },
  { char: '土', strokes: [] },
  { char: '山', strokes: [] },
  { char: '石', strokes: [] },
  { char: '車', strokes: [] },
  { char: '書', strokes: [] },
  { char: '字', strokes: [] },
  { char: '語', strokes: [] },
  { char: '話', strokes: [] },
  { char: '認', strokes: [] },
  { char: '說', strokes: [] },
  { char: '學', strokes: [] },
  { char: '寫', strokes: [] },
  { char: '漢', strokes: [] },
  { char: '難', strokes: [] },
  { char: '簡', strokes: [] },
  { char: '體', strokes: [] },
  { char: '繁', strokes: [] },
  { char: '重', strokes: [] },
]

export default characters

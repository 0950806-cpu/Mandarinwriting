import React, { useState } from 'react'
import CharacterViewer from './components/CharacterViewer'
import DrawingCanvas from './components/DrawingCanvas'
import CharacterSelector from './components/CharacterSelector'
import characters from './data/characters'
import { scoreStrokes } from './utils/scoring'

export default function App() {
  const [index, setIndex] = useState(0)
  const char = characters[index]
  const [score, setScore] = useState<number | null>(null)

  function handleSubmit(userStrokes: number[][][]) {
    const s = scoreStrokes(char.strokes, userStrokes)
    setScore(Math.round(s * 100))
  }

  function next() {
    setScore(null)
    setIndex((i) => (i + 1) % characters.length)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Mandarin Writing — Traditional Chinese</h1>

      <div className="bg-white shadow rounded-md p-4 w-full max-w-xl">
        <div className="mb-4">
          <CharacterSelector characters={characters} selectedIndex={index} onSelect={(i) => { setIndex(i); setScore(null); }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CharacterViewer char={char.char} />
          <div>
            <DrawingCanvas onSubmit={handleSubmit} onClear={() => setScore(null)} />
            <div className="mt-3 flex gap-2">
              <button onClick={next} className="px-3 py-1 bg-indigo-600 text-white rounded">Next</button>
              <button onClick={() => setScore(null)} className="px-3 py-1 border rounded">Retry</button>
            </div>
            {score !== null && (
              <div className="mt-3">Score: <strong>{score}</strong></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

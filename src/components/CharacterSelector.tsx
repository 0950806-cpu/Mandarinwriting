import React from 'react'

export default function CharacterSelector({
  characters,
  selectedIndex,
  onSelect,
}: {
  characters: { char: string }[]
  selectedIndex: number
  onSelect: (i: number) => void
}) {
  return (
    <div>
      <div className="mb-2 text-sm text-gray-600">選擇字（繁體中文）</div>
      <div className="flex flex-wrap gap-2 max-h-40 overflow-auto">
        {characters.map((c, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-12 h-12 flex items-center justify-center border rounded text-2xl ${
              i === selectedIndex ? 'bg-indigo-600 text-white' : 'bg-white'
            }`}
            aria-pressed={i === selectedIndex}
            title={`練習：${c.char}`}
          >
            {c.char}
          </button>
        ))}
      </div>
    </div>
  )
}

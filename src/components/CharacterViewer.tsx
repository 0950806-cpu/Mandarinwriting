import React, { useEffect, useRef } from 'react'
import HanziWriter from 'hanzi-writer'

export default function CharacterViewer({ char }: { char: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const writerRef = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) return
    if (!writerRef.current) {
      writerRef.current = HanziWriter.create(ref.current, char, {
        width: 240,
        height: 240,
        padding: 10,
        showOutline: true,
      })
    } else {
      writerRef.current.setChar(char)
    }
    // play a short animation when char changes
    writerRef.current.animateCharacter({ duration: 800 })
  }, [char])

  return (
    <div className="flex flex-col items-center">
      <div ref={ref} className="border rounded p-2 bg-white" />
      <div className="mt-2 text-center text-xl">{char}</div>
    </div>
  )
}

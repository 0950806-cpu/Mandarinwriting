import React, { useRef, useState } from 'react'

type Point = { x: number; y: number }

export default function DrawingCanvas({ onSubmit, onClear }: { onSubmit: (strokes: number[][][]) => void; onClear: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [strokes, setStrokes] = useState<Point[][]>([])
  const currentRef = useRef<Point[]>([])

  function resize() {
    const c = canvasRef.current
    if (!c) return
    const rect = c.getBoundingClientRect()
    c.width = rect.width * devicePixelRatio
    c.height = rect.height * devicePixelRatio
    const ctx = c.getContext('2d')!
    ctx.scale(devicePixelRatio, devicePixelRatio)
    redraw()
  }

  React.useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  function getPos(e: PointerEvent | React.PointerEvent) {
    const c = canvasRef.current!
    const rect = c.getBoundingClientRect()
    const clientX = 'clientX' in e ? (e as any).clientX : 0
    const clientY = 'clientY' in e ? (e as any).clientY : 0
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  function redraw() {
    const c = canvasRef.current!
    const ctx = c.getContext('2d')!
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.save()
    ctx.scale(devicePixelRatio, devicePixelRatio)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 6
    ctx.strokeStyle = '#111827'
    for (const stroke of strokes) {
      if (stroke.length < 1) continue
      ctx.beginPath()
      ctx.moveTo(stroke[0].x, stroke[0].y)
      for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y)
      ctx.stroke()
    }
    ctx.restore()
  }

  function pointerDown(e: React.PointerEvent) {
    ;(e.target as Element).setPointerCapture((e as any).pointerId)
    setIsDrawing(true)
    currentRef.current = [getPos(e)]
    setStrokes((s) => [...s, currentRef.current])
  }
  function pointerMove(e: React.PointerEvent) {
    if (!isDrawing) return
    currentRef.current.push(getPos(e))
    redraw()
  }
  function pointerUp(e: React.PointerEvent) {
    setIsDrawing(false)
  }

  function clear() {
    setStrokes([])
    setIsDrawing(false)
    onClear()
    const c = canvasRef.current!
    const ctx = c.getContext('2d')!
    ctx.clearRect(0, 0, c.width, c.height)
  }

  function submit() {
    // Convert to simple number[][][] for scoring: [stroke][point][x|y]
    const data = strokes.map((s) => s.map((p) => [p.x, p.y]))
    onSubmit(data)
  }

  return (
    <div>
      <div className="border rounded overflow-hidden bg-white">
        <div className="relative" style={{ width: '100%', height: 320 }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', touchAction: 'none' }}
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
          />
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={submit} className="px-3 py-1 bg-green-600 text-white rounded">Submit</button>
        <button onClick={clear} className="px-3 py-1 border rounded">Clear</button>
      </div>
    </div>
  )
}

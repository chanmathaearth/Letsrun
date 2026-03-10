import { useState } from 'react'
import { motion } from 'framer-motion'

type PaceResult = {
  label: string
  description: string
  pacePerKm: number
  tone: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'pink'
}

const toneToBg: Record<PaceResult['tone'], string> = {
  green: 'bg-emerald-900/70',
  blue: 'bg-sky-900/70',
  yellow: 'bg-amber-900/70',
  orange: 'bg-orange-900/70',
  red: 'bg-rose-900/70',
  pink: 'bg-fuchsia-900/70',
}

const toneToAccent: Record<PaceResult['tone'], string> = {
  green: 'text-emerald-300',
  blue: 'text-sky-300',
  yellow: 'text-amber-300',
  orange: 'text-orange-300',
  red: 'text-rose-300',
  pink: 'text-fuchsia-300',
}

function formatPace(secondsPerKm: number | null) {
  if (!secondsPerKm || !Number.isFinite(secondsPerKm)) return '-'
  const total = Math.round(secondsPerKm)
  const min = Math.floor(total / 60)
  const sec = total % 60
  return `${min}:${sec.toString().padStart(2, '0')} /km`
}

function getPacesFromEasy(easySecondsPerKm: number | null): PaceResult[] {
  if (!easySecondsPerKm || !Number.isFinite(easySecondsPerKm)) {
    return []
  }

  return [
    {
      label: 'Easy Pace',
      description: 'วิ่งสบาย พูดคุยได้',
      pacePerKm: easySecondsPerKm,
      tone: 'green',
    },
    {
      label: 'Zone 2',
      description: 'สร้างฐาน Aerobic',
      pacePerKm: easySecondsPerKm * 0.94,
      tone: 'blue',
    },
    {
      label: 'Tempo',
      description: 'Comfortably hard',
      pacePerKm: easySecondsPerKm * 0.84,
      tone: 'yellow',
    },
    {
      label: 'Threshold',
      description: 'Lactate Threshold',
      pacePerKm: easySecondsPerKm * 0.8,
      tone: 'orange',
    },
    {
      label: 'Interval',
      description: 'VO2 Max Training',
      pacePerKm: easySecondsPerKm * 0.73,
      tone: 'red',
    },
    {
      label: 'Repetition',
      description: 'Speed Work',
      pacePerKm: easySecondsPerKm * 0.68,
      tone: 'pink',
    },
  ]
}

function TrainingPaceCalculator() {
  const [easyMinutes, setEasyMinutes] = useState('7')
  const [easySeconds, setEasySeconds] = useState('0')

  const easySecondsPerKm =
    easyMinutes.trim() === '' && easySeconds.trim() === ''
      ? null
      : Number(easyMinutes || 0) * 60 + Number(easySeconds || 0)

  const paces = getPacesFromEasy(easySecondsPerKm)

  const hasInputError =
    easySecondsPerKm !== null &&
    (!Number.isFinite(easySecondsPerKm) || easySecondsPerKm <= 0)

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
          ใส่ข้อมูลของคุณ
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
          Training Pace จาก Easy Run
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl">
          ใส่ pace easy run ต่อกิโลเมตร ระบบจะประมาณ pace สำหรับ zone ต่าง ๆ
          เพื่อใช้วางแผนการซ้อม.
        </p>
      </header>

      <div className="rounded-2xl border border-gray-500 border-gray-500 bg-black/60 p-4 md:p-5 space-y-4">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-[0.18em]">
          Easy Pace
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex items-center gap-2">
            <div className="space-y-1">
              <label className="block text-xs text-slate-400">นาที</label>
              <input
                type="number"
                min={0}
                value={easyMinutes}
                onChange={(e) => setEasyMinutes(e.target.value)}
                className="w-20 rounded-lg border border-gray-500 bg-black px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <span className="pb-3 text-sm text-slate-400">:</span>
            <div className="space-y-1">
              <label className="block text-xs text-slate-400">วินาที</label>
              <input
                type="number"
                min={0}
                max={59}
                value={easySeconds}
                onChange={(e) => setEasySeconds(e.target.value)}
                className="w-20 rounded-lg border border-gray-500 bg-black px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <span className="pb-3 text-xs text-slate-400">ต่อตามระยะ 1 กม.</span>
          </div>
        </div>

        {hasInputError && (
          <p className="text-xs text-rose-400">
            กรุณาใส่ pace ที่มากกว่า 0 นาทีต่อกิโลเมตร
          </p>
        )}
      </div>

      <div className="border-t border-gray-500 pt-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-200">
            Training Zones
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paces.map((zone, index) => (
            <motion.article
              key={zone.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              className={`${toneToBg[zone.tone]} rounded-2xl border/60 px-4 py-4 flex flex-col justify-between shadow-[0_0_0_1px_rgba(15,23,42,0.8)]`}
            >
              <div className="space-y-2">
                <div
                  className={`text-xs font-semibold tracking-[0.18em] uppercase ${toneToAccent[zone.tone]}`}
                >
                  {zone.label}
                </div>
                <p className="text-xs text-slate-200/90">{zone.description}</p>
              </div>
              <div className="mt-4 text-2xl font-semibold text-slate-50">
                {formatPace(zone.pacePerKm)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrainingPaceCalculator


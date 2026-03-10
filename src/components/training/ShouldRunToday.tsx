import { useState } from 'react'
import { motion } from 'framer-motion'

function getRecommendation(sleepHours: number, fatigue: number, stress: number) {
  if (!Number.isFinite(sleepHours) || !Number.isFinite(fatigue) || !Number.isFinite(stress)) {
    return null
  }

  const normalizedSleep = Math.min(Math.max(sleepHours, 0), 10)
  const sleepScore = (normalizedSleep / 8) * 40
  const fatigueScore = (6 - Math.min(Math.max(fatigue, 1), 5)) * 8
  const stressScore = (6 - Math.min(Math.max(stress, 1), 5)) * 6

  const total = sleepScore + fatigueScore + stressScore

  if (total >= 70) {
    return {
      level: 'ready' as const,
      title: 'พร้อมวิ่งวันนี้',
      detail: 'ร่างกายและการพักผ่อนอยู่ในเกณฑ์ดี สามารถซ้อมตามแผนได้ตามปกติ.',
    }
  }

  if (total >= 50) {
    return {
      level: 'easy' as const,
      title: 'วิ่งได้แต่แนะนำให้วิ่งเบา',
      detail: 'อาจพักผ่อนไม่เต็มที่หรือมีความล้า แนะนำลด intensity หรือวิ่ง easy แทน.',
    }
  }

  return {
    level: 'rest' as const,
    title: 'ควรพัก / ฟื้นตัว',
    detail: 'สัญญาณหลายอย่างบอกว่าร่างกายล้า ลองพัก ฟื้นตัว นอนให้พอ ก่อนกลับมาซ้อมต่อ.',
  }
}

function ShouldRunToday() {
  const [sleep, setSleep] = useState('7')
  const [fatigue, setFatigue] = useState('3')
  const [stress, setStress] = useState('3')

  const sleepHours = Number(sleep || 0)
  const fatigueScore = Number(fatigue || 0)
  const stressScore = Number(stress || 0)

  const recommendation = getRecommendation(sleepHours, fatigueScore, stressScore)

  const levelColor =
    recommendation?.level === 'ready'
      ? 'text-emerald-300'
      : recommendation?.level === 'easy'
        ? 'text-amber-300'
        : 'text-rose-300'

  const badgeColor =
    recommendation?.level === 'ready'
      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
      : recommendation?.level === 'easy'
        ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
        : 'bg-rose-500/10 text-rose-300 border-rose-500/40'

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
          Recovery Check
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
          Should I run today?
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl">
          ประเมินจากเวลานอน ระดับความล้า และความเครียด เพื่อช่วยตัดสินใจว่าควรซ้อม วิ่งเบา
          หรือพักในวันนี้.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-500 bg-black/60 p-4 space-y-2">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-[0.18em]">
            เวลานอนเมื่อคืน
          </div>
          <div className="flex items-end gap-2">
            <input
              type="number"
              min={0}
              max={12}
              step={0.5}
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              className="w-20 rounded-lg border border-gray-500 bg-black px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <span className="pb-2 text-xs text-slate-400">ชั่วโมง</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-500 bg-black/60 p-4 space-y-3">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-[0.18em]">
            ความล้าของร่างกาย
          </div>
          <select
            value={fatigue}
            onChange={(e) => setFatigue(e.target.value)}
            className="w-full rounded-lg border border-gray-500 bg-black px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          >
            <option value="1">1 - สดมาก</option>
            <option value="2">2 - ล้าเล็กน้อย</option>
            <option value="3">3 - ปกติ</option>
            <option value="4">4 - ล้าพอสมควร</option>
            <option value="5">5 - ล้ามาก</option>
          </select>
        </div>

        <div className="rounded-2xl border border-gray-500 bg-black/60 p-4 space-y-3">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-[0.18em]">
            ความเครียดวันนี้
          </div>
          <select
            value={stress}
            onChange={(e) => setStress(e.target.value)}
            className="w-full rounded-lg border border-gray-500 bg-black px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          >
            <option value="1">1 - ชิลมาก</option>
            <option value="2">2 - เครียดนิดหน่อย</option>
            <option value="3">3 - ปกติ</option>
            <option value="4">4 - เครียดพอสมควร</option>
            <option value="5">5 - เครียดมาก</option>
          </select>
        </div>
      </div>

      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-gray-500 bg-black/80 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        >
          <div className="space-y-1">
            <div className={`text-sm font-semibold ${levelColor}`}>
              {recommendation.title}
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              {recommendation.detail}
            </p>
          </div>
          <div
            className={`mt-1 inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] ${badgeColor}`}
          >
            Guidance
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ShouldRunToday


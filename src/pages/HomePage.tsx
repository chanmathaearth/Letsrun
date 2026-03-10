import MainLayout from '../components/layout/MainLayout'
import TrainingPaceCalculator from '../components/training/TrainingPaceCalculator'
import ShouldRunToday from '../components/training/ShouldRunToday'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function HomePage() {
  const [topOpacity, setTopOpacity] = useState(1)
  const [bottomOpacity, setBottomOpacity] = useState(1)

  useEffect(() => {
    let previousScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - previousScrollY

      if (delta > 0) {
        // Scrolling down - fade top
        setTopOpacity(prev => Math.max(0, prev - 0.1))
        setBottomOpacity(1)
      } else if (delta < 0) {
        // Scrolling up - fade bottom
        setBottomOpacity(prev => Math.max(0, prev - 0.1))
        setTopOpacity(1)
      }

      previousScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MainLayout>
      <div className="space-y-10 font-poppins">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid gap-6 md:gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center"
          style={{ opacity: topOpacity }}
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
              Letsrun
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
              Running Pace & Recovery Helper
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-slate-400">
              ใส่ easy pace ของคุณเพื่อดู pace แนะนำสำหรับ zone ต่าง ๆ
              และใช้ตัวช่วยประเมินว่าควรวิ่งวันนี้ไหมจากการพักผ่อนและความล้า.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-10"
          style={{ opacity: bottomOpacity }}
        >
          <TrainingPaceCalculator />
          <div className="border-t border-gray-500 pt-8">
            <ShouldRunToday />
          </div>
        </motion.section>
      </div>
    </MainLayout>
  )
}

export default HomePage



import type { ReactNode } from 'react'
import BubbleBackground from '../common/BubbleBackground'

type MainLayoutProps = {
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell bg-black min-h-screen flex flex-col text-slate-50 relative overflow-hidden">
      <BubbleBackground />
      <main className="app-main relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14">{children}</main>
    </div>
  )
}

export default MainLayout


'use client'
import ClientOnly from '../components/ClientOnly'
import { motion } from 'framer-motion'

export default function DemoPage() {
    const scrollToId = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return
        const header = document.querySelector('header')
        const headerHeight = header ? header.getBoundingClientRect().height : 0
        const offset = 12
        const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - offset
        window.scrollTo({ top, behavior: 'smooth' })
    }
  return (
    <main className="relative flex flex-col min-h-screen pt-24 md:pt-28 bg-white dark:bg-[#0b1020] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
        <ClientOnly>
        <motion.div
          initial={{ scale: 1, opacity: 0.15 }}
          animate={{ rotate: 360, scale: 1.2, opacity: 0.2 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          initial={{ scale: 1, opacity: 0.12 }}
          animate={{ rotate: -360, scale: 1.05, opacity: 0.16 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        </ClientOnly>

        <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-6xl font-bold mb-4 flex items-center justify-center">Demo</h2>
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => scrollToId('cleck')}
            className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            #Cleck App
          </button>
          <button
            onClick={() => scrollToId('team')}
            className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            #Team
          </button>
          <button
            onClick={() => scrollToId('Team_Project')}
            className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            #Team_Project
          </button>
        </div>
        <div className="items-start py-10">
            <h2 id="cleck" className="text-4xl font-bold mb-4">Cleck App</h2>
            <p className='pt-3'>25-2 웹서버보안프로그래밍 수업에서 진행한 Cleck App 페이지 입니다.</p>
            <p><a href='https://github.com/Pandyo/cleck-app' className='underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'>링크</a>를 통해 Github Repository에 접속하실 수 있습니다.</p>
            <p>사진을 클릭하면 Demo App으로 이동됩니다.</p>
            <div className="grid sm:grid-cols-2 gap-4 pt-3">
                <a href='https://cleck-app.vercel.app/'>
                    <img src="demo1.png"></img>
                </a>
                <a href='https://cleck-app.vercel.app/'>
                    <img src="demo2.png"></img>
                </a>
                <a href='https://cleck-app.vercel.app/'>
                    <img src="demo3.png"></img>
                </a>
                <a href='https://cleck-app.vercel.app/'>
                    <img src="demo4.png"></img>
                </a>
            </div>
        </div>

        <div className="items-start py-10">
            <h2 id="team" className="text-4xl font-bold mb-4 pb-6">Team</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
                <div className="rounded-xl p-6 bg-white dark:bg-slate-800 shadow transition flex flex-col items-center text-center">
                    <img
                        src="kkaturi14.jpeg"
                        className="w-28 h-28 rounded-full object-cover mb-4 shadow-lg"
                    />
                    <h3 className="text-xl font-semibold">곽민경</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">중부대학교</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">정보보호학과 / 24학번</p>
                    <div className="flex gap-3 mt-4">
                        <a href="https://github.com/kkaturi14" target="_blank" className="hover:opacity-80">
                        <img src="github.png" className="w-5 h-5" />
                        </a>
                        <a href="https://web-server-last-portfolio.vercel.app/" target="_blank" className="hover:opacity-80">
                        <img src="cleck.png" className="w-5 h-5" />
                        </a>
                    </div>
                </div>  

                <div className="rounded-xl p-6 bg-white dark:bg-slate-800 shadow transition flex flex-col items-center text-center">
                    <img
                        src="hyesu.JPG"
                        className="w-28 h-28 rounded-full object-cover mb-4 shadow-lg"
                    />
                    <h3 className="text-xl font-semibold">박혜수</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">중부대학교</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">정보보호학과 / 24학번</p>
                    <div className="flex gap-3 mt-4">
                        <a href="https://github.com/Pandyo" target="_blank" className="hover:opacity-80">
                        <img src="github.png" className="w-5 h-5" />
                        </a>
                        <a href="https://web-server-class-project-01.vercel.app/" target="_blank" className="hover:opacity-80">
                        <img src="cleck.png" className="w-5 h-5" />
                        </a>
                    </div>
                </div>  

                <div className="rounded-xl p-6 bg-white dark:bg-slate-800 shadow transition flex flex-col items-center text-center">
                    <img
                        src="J4EH00N.png"
                        className="w-28 h-28 rounded-full object-cover mb-4 shadow-lg"
                    />
                    <h3 className="text-xl font-semibold">심재훈</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">중부대학교</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">정보보호학과 / 22학번</p>
                    <div className="flex gap-3 mt-4">
                        <a href="https://github.com/J4EH00N" target="_blank" className="hover:opacity-80">
                        <img src="github.png" className="w-5 h-5" />
                        </a>
                        <a href="https://portfolio-v1-khaki-psi.vercel.app/" target="_blank" className="hover:opacity-80">
                        <img src="cleck.png" className="w-5 h-5" />
                        </a>
                    </div>
                </div>  

                <div className="rounded-xl p-6 bg-white dark:bg-slate-800 shadow transition flex flex-col items-center text-center">
                    <img
                        src="oesp91.jpeg"
                        className="w-28 h-28 rounded-full object-cover mb-4 shadow-lg"
                    />
                    <h3 className="text-xl font-semibold">정윤서</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">중부대학교</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">정보보호학과 / 24학번</p>
                    <div className="flex gap-3 mt-4">
                        <a href="https://github.com/oesp91" target="_blank" className="hover:opacity-80">
                        <img src="github.png" className="w-5 h-5" />
                        </a>
                        <a href="https://wsvbp2.vercel.app/" target="_blank" className="hover:opacity-80">
                        <img src="cleck.png" className="w-5 h-5" />
                        </a>
                    </div>
                </div>  

                <div className="rounded-xl p-6 bg-white dark:bg-slate-800 shadow transition flex flex-col items-center text-center">
                    <img
                        src="Interludeal.jpeg"
                        className="w-28 h-28 rounded-full object-cover mb-4 shadow-lg"
                    />
                    <h3 className="text-xl font-semibold">정재성</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">중부대학교</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">정보보호학과 / 22학번</p>
                    <div className="flex gap-3 mt-4">
                        <a href="https://github.com/Interludeal" target="_blank" className="hover:opacity-80">
                        <img src="github.png" className="w-5 h-5" />
                        </a>
                        <a href="https://jbu-2025-2-personal.vercel.app/" target="_blank" className="hover:opacity-80">
                        <img src="cleck.png" className="w-5 h-5" />
                        </a>
                    </div>
                </div>  
            </div>
        </div>
        <div className="items-start py-10">
            <img src="on.png" className="w-40 pt-10" id="Team_Project"></img>
            <p className='pt-3'>25-2 웹서버보안프로그래밍 팀 프로젝트로 진행한 웹사이트 입니다.</p>
            <p><a href='https://github.com/neighborhood-on/neighborhood_on' className='underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'>링크</a>를 통해 Github Repository에 접속하실 수 있습니다.</p>
            <p>사진을 클릭하면 Demo App으로 이동됩니다.</p>
            <div className="grid sm:grid-cols-2 gap-4 pt-3">
                <a href='https://neighborhood-on-cu5h.vercel.app/'>
                    <img src="team.png"></img>
                </a>
                <a href='https://neighborhood-on-cu5h.vercel.app/'>
                    <img src="team2.png"></img>
                </a>
                <a href='https://neighborhood-on-cu5h.vercel.app/'>
                    <img src="team3.png"></img>
                </a>
                <a href='https://neighborhood-on-cu5h.vercel.app/'>
                    <img src="team4.png"></img>
                </a>
            </div>
        </div>
        </section>
    </main>
  )
}
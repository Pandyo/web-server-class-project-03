import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed w-full z-30 top-0 left-0 backdrop-blur-xl bg-white/30 dark:bg-slate-900/30 border-b border-violet-50 dark:border-slate-700/40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="md:text-5xl font-bold text-lg tracking-tight">
            <Link href="/" >Park Hyesu</Link>
            </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/about" className="hidden md:inline-block bg-gray-800 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg transform hover:scale-105 transition">About</Link>
            <Link href="/graph" className="hidden md:inline-block bg-gray-800 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg transform hover:scale-105 transition">New Projects</Link>
            <Link href="/projects" className="hidden md:inline-block bg-gray-800 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg transform hover:scale-105 transition">Old Projects</Link>
            <Link href="/demo" className="hidden md:inline-block bg-gray-800 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg transform hover:scale-105 transition">Demo</Link>
            <Link href="/repos" className="hidden md:inline-block bg-gray-800 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg transform hover:scale-105 transition">GitHub</Link>
            <Link href="/chat" className="hidden md:inline-block bg-gray-800 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg transform hover:scale-105 transition">Chat HPT</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

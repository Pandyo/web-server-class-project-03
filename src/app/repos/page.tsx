import { Repository } from '../types/repo'
import Link from 'next/link'
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'

const username = 'Pandyo'
const token = process.env.GITHUB_TOKEN;

export default async function ReposPage() {

  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const repos = await response.json()
  console.log(repos)
  return (
    <main className="relative flex flex-col min-h-screen pt-24 md:pt-28 bg-white dark:bg-[#0b1020] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
        <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <div>
        <h2 className="text-6xl font-bold mb-4 flex items-center justify-center">GitHub</h2>
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Repository</h2>
        <div className="items-start py-10">
        <ul>
            {repos.map((repo: Repository) => (
            <li key={repo.id} className='bg-blue-50 m-4 p-4 rounded-md'>
                <Link href={`/repos/${repo.name}`}>
                <h3 className='text-xl font-bold'>{repo.name}</h3>
                <p>{repo.description}</p>
                <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-1'>
                    <FaStar /> {repo.stargazers_count}
                    </span>
                    <span className='flex items-center gap-1'>
                    <FaCodeBranch /> {repo.forks_count}
                    </span>
                    <span className='flex items-center gap-1'>
                    <FaEye /> {repo.watchers_count}
                    </span>
                </div>
                </Link>
            </li>
            ))}
        </ul>
        </div>
        </div>
        </section>
    </main>
  )
}
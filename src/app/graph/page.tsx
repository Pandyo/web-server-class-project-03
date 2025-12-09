'use client'

import { useState, useEffect } from 'react';
import MyMindMap from '../components/MyMindMap';

interface ProjectItem {
    slug: string;
    name: string;
}

export default function ProjectPage() {
    const [selectedProject, setSelectedProject] = useState('');
    const [projectList, setProjectList] = useState<ProjectItem[]>([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/projects");
                if (!res.ok) {
                    throw new Error(`Failed to fetch projects: ${res.statusText}`);
                }
                
                const data: ProjectItem[] = await res.json();
                setProjectList(data);
                
                if (data.length > 0) {
                    setSelectedProject(data[0].slug);
                }
            } catch (error) {
                console.error("Error loading project list:", error);
                setProjectList([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

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
        <main className="relative flex flex-col min-h-screen pt-12 md:pt-20 bg-white dark:bg-[#0b1020] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
            
            <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 w-full z-20 shadow-md">                
                <nav className="max-w-6xl mx-auto px-6 flex space-x-4 overflow-x-auto py-2">
                    {isLoading ? (
                        <span className="px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                            프로젝트 목록 로딩 중...
                        </span>
                    ) : projectList.length === 0 ? (
                        <span className="px-4 py-2 text-sm font-medium whitespace-nowrap text-red-500 dark:text-red-400">
                            불러올 프로젝트가 없습니다.
                        </span>
                    ) : (
                        projectList.map((project) => (
                            <button
                                key={project.slug}
                                onClick={() => setSelectedProject(project.slug)}
                                className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                                    selectedProject === project.slug
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {project.name}
                            </button>
                        ))
                    )}
                </nav>
            </div>

            <section id="project-content" className="flex-grow max-w-6xl mx-auto px-6 py-10 w-full">
                <div className="w-full h-[70vh] border border-gray-300 dark:border-gray-700 rounded-xl shadow-xl">
                    {!isLoading && selectedProject && <MyMindMap projectSlug={selectedProject} />}
                </div>

            </section>
        </main>
    )
}
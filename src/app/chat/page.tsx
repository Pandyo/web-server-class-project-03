'use client'
import ClientOnly from '../components/ClientOnly'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react' // 👈 useRef, useEffect 임포트

const questionGuides = [
    "다른 질문이 하고싶어",
    "재학",
    "관심 분야",
    "블로그 정보",
    "기술 스택",
    "활동 이력",
    "중부대학교 정보보안 동아리 S.C.P",
    "WhiteHat School 3rd",
    "Offensive Cloud Security Team Beaver Dam",
];

export default function ChatPage() {

    const handleGuideClick = (question: string) => {
        setUserMsg(question);

        const chatSection = document.getElementById('chat-section');
        if (chatSection) {
            chatSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const [userMsg, setUserMsg] = useState("");
    const [chat, setChat] = useState<{ from: string; msg: string }[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null); // 👈 채팅 컨테이너 ref 생성

    const sendMessage = async () => {
        if (!userMsg.trim()) return;

        const messageToSend = userMsg; 
        
        // 1. 사용자 메시지 추가
        setChat((prev) => [...prev, { from: "user", msg: messageToSend }]);
        setUserMsg(""); 

        try {
            // 2. API 호출
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageToSend })
            });
    
            const data = await res.json();
    
            // 3. 봇 응답 추가
            setChat((prev) => [...prev, { from: "bot", msg: data.answer }]);
        } catch (error) {
            console.error("Chat API error:", error);
            setChat((prev) => [...prev, { from: "bot", msg: "죄송합니다. 메시지를 처리하는 중 오류가 발생했습니다." }]);
        }
    };
    
    // 👈 chat 상태가 업데이트될 때마다 스크롤을 맨 아래로 이동 (자동 스크롤 기능)
    useEffect(() => {
        if (chatContainerRef.current) {
            // behavior: 'smooth'를 추가하여 부드러운 스크롤 효과를 줍니다.
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chat]);

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

            <section id="chat-section" className="w-full mx-auto py-13 relative z-10">

                <div className="w-full max-w-6xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">Chat HPT (NoLLM)</h2>

                    <div 
                        ref={chatContainerRef} // 👈 ref 연결
                        className="h-[60vh] shrink-0 overflow-y-auto bg-white dark:bg-gray-900 p-4 rounded-lg border"
                    >
                        {chat.map((c, i) => (
                            <div key={i} className={`mb-3 ${c.from === "user" ? "text-right" : ""}`}>
                                <span
                                className={`inline-block px-3 py-2 rounded-lg whitespace-pre-line max-w-2xl ${ // 👈 max-w-2xl 적용
                                                    c.from === "user"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-300 dark:bg-gray-700 dark:text-white"
                                                }`}
                                    {...(c.from === "bot" ? { dangerouslySetInnerHTML: { __html: c.msg } } : {})} // 👈 HTML 렌더링 적용
                                >
                                    {c.from === "user" ? c.msg : null}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage();
                            }}
                            className="flex-1 flex gap-2"
                        >
                            <input
                                value={userMsg}
                                onChange={(e) => setUserMsg(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="질문을 입력하세요..."
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                disabled={!userMsg.trim()}
                            >
                                전송
                            </button>
                        </form>
                    </div>
                </div>

                <div className="w-full max-w-6xl mx-auto mt-8 relative">
                    <div className="absolute inset-x-0 bottom-0 h-4 bg-gray-400 dark:bg-gray-600 rounded-b-lg shadow-inner z-0 transform translate-y-1"></div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-2xl border-t-4 border-blue-500 dark:border-blue-400 relative z-10">
                        <h3 className="text-xl font-semibold flex items-center mb-4 text-blue-600 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.405 9.172 5 7.5 5S4.168 5.405 3 6.253v13C4.168 18.405 5.828 18 7.5 18s3.332.405 4.5 1.253m0-13C13.168 5.405 14.828 5 16.5 5s3.332.405 4.5 1.253v13C19.832 18.405 18.172 18 16.5 18s-3.332.405-4.5 1.253" />
                            </svg>
                            빠른 질문 가이드
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {questionGuides.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleGuideClick(question)}
                                    className="text-left p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors shadow-sm text-sm"
                                >
                                    <span className="text-blue-500 dark:text-blue-300 mr-2">&gt;</span> {question}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

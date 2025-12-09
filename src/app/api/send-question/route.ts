import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true,
    debug: true,
});

export async function POST(req: NextRequest) {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
        console.error("ADMIN_EMAIL 환경 변수가 설정되지 않았습니다.");
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    try {
        const { questionEmail, questionText } = await req.json(); 

        if (!questionEmail || !questionText) {
            return NextResponse.json({ message: 'Missing required fields (email or text).' }, { status: 400 });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: adminEmail,
            replyTo: questionEmail,
            subject: `[Chat HPT 문의] 사용자 질문 도착: ${questionEmail}`,
            html: `
                <p><strong>질문 내용:</strong></p>
                <div style="border: 1px solid #ccc; padding: 10px; border-radius: 4px; background-color: #f9f9f9;">
                    ${questionText.replace(/\n/g, '<br>')}
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: '질문이 성공적으로 전송되었습니다.' }, { status: 200 });

    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json({ message: '질문 전송 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
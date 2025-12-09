import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const dbName = "nollm"; 

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return Response.json({ answer: "메시지를 입력해주세요." });
    }

    const db = client.db(dbName);
    const scp = db.collection("bot");

    const result = await scp.findOne({
      question: { $regex: message, $options: "i" }
    });

    if (!result) {
      return Response.json({ answer: "등록되지 않은 질문입니다." });
    }

    return Response.json({ answer: result.answer });
  } catch (err) {
    console.error(err);
    return Response.json({ answer: "오류가 발생했습니다." });
  }
}

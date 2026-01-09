from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import asyncio
from fastapi.middleware.cors import CORSMiddleware

try:
    # prefer relative imports when used as a package
    from .sessions import create_session, get_history, append_user, append_assistant, trim_history
    from .gemini_client import ask_gemini
except Exception:
    # fallback when running main.py directly
    from sessions import create_session, get_history, append_user, append_assistant, trim_history
    from gemini_client import ask_gemini
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Subject Tutor Chatbot - Backend")

# Allow CORS for local frontend dev servers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = """
You are a friendly human tutor focused on one subject (e.g., Python). Speak slowly and simply. Provide step-by-step explanations, one daily-life example, and then ask one small follow-up question. Define any technical term in plain words immediately.
Keep replies medium length. If action is 'reexplain', make the explanation simpler and include a fresh example. If action is 'quiz', produce 1-3 short quiz questions and expected answers.
"""

class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str
    action: Optional[str] = "message"

class ChatResponse(BaseModel):
    session_id: str
    reply: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    # session
    sid = req.session_id or create_session()
    # append user message
    append_user(sid, req.message)
    # trim history to keep token usage bounded
    trim_history(sid, max_pairs=8)

    history = get_history(sid)

    try:
        reply = await ask_gemini(SYSTEM_PROMPT, history, action=req.action)
    except Exception as e:
        # return a graceful assistant message
        reply = "Sorry — I'm having trouble contacting the tutor service. Please try again."

    append_assistant(sid, reply)

    return {"session_id": sid, "reply": reply}


if __name__ == '__main__':
    # Allow running the app directly for simple dev usage.
    import uvicorn
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    uvicorn.run(app, host='127.0.0.1', port=port)

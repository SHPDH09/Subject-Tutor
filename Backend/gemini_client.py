import os
import json
from typing import List, Dict
import httpx
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY="AIzaSyD45jIY-wCd31YYVBC-7KOITve19yEPr40"
GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
async def ask_gemini(system_prompt: str, messages: List[Dict[str, str]], action: str = "message") -> str:
    """
    Wrapper for Gemini Free API. If no API key is present, returns a simple simulated reply.
    messages: list of {role, content}
    action: one of message|reexplain|quiz
    """
    # Simple simulation when no API key is configured or key is invalid
    if not GEMINI_API_KEY or GEMINI_API_KEY == "AIzaSyD45jIY-wCd31YYVBC-7KOITve19yEPr40":
        # Build a simple templated reply that follows the tutor rules
        user_latest = next((m['content'] for m in reversed(messages) if m['role']=='user'), "")
        if action == 'reexplain':
            return f"Okay — I'll explain again more simply.\n\nStep 1: ... (short steps). Example: imagine explaining to a friend.\n\nOne small question: What part is still unclear?"
        if action == 'quiz':
            return "Quiz: 1) What is X? (Answer: ...)\n2) True/False: ...\n\nSend your answers and I'll check."
        # default reply simulation
        return f"Tutor reply to: '{user_latest}'\n\n(If Gemini key is set in the server, this would call the real API.)\nOne small question: Can you try an example?"

    # If a real key exists, call Gemini HTTP API (example shape - adapt to provider docs)
    headers = {"Content-Type": "application/json"}
    url = f"{GEMINI_API_URL}?key={GEMINI_API_KEY}"
    # Build contents for Gemini: system as first user message, then conversation
    contents = []
    if system_prompt:
        contents.append({"role": "user", "parts": [{"text": system_prompt}]})
        contents.append({"role": "model", "parts": [{"text": "Understood, I'll act as a friendly subject tutor."}]})
    for m in messages:
        role = "model" if m["role"] == "assistant" else "user"
        contents.append({"role": role, "parts": [{"text": m["content"]}]})
    payload = {
        "contents": contents,
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 512}
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(url, headers=headers, json=payload)
        r.raise_for_status()
        data = r.json()
        # adapt this according to actual Gemini response format
        if 'candidates' in data and len(data['candidates']) > 0:
            return data['candidates'][0]['content']['parts'][0]['text']
        # fallback
        return json.dumps(data)


if __name__ == '__main__':
    # Simple test when run directly
    import asyncio
    async def test():
        system = "You are a tutor."
        messages = [{"role": "user", "content": "Hello"}]
        result = await ask_gemini(system, messages)
        print("Test reply:", result)
    asyncio.run(test())

from typing import List, Dict
import uuid

# Simple in-memory session store: {session_id: [ {role, content}, ... ] }
_sessions: Dict[str, List[Dict[str, str]]] = {}

def create_session() -> str:
    sid = str(uuid.uuid4())
    _sessions[sid] = []
    return sid

def get_history(session_id: str):
    return _sessions.get(session_id, [])

def append_user(session_id: str, text: str):
    _sessions.setdefault(session_id, []).append({"role": "user", "content": text})

def append_assistant(session_id: str, text: str):
    _sessions.setdefault(session_id, []).append({"role": "assistant", "content": text})

def trim_history(session_id: str, max_pairs: int = 8):
    # keep last max_pairs user+assistant pairs
    h = _sessions.get(session_id, [])
    # each pair ~2 messages; approximate limit
    keep = max_pairs * 2
    if len(h) > keep:
        _sessions[session_id] = h[-keep:]

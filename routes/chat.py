from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests

router = APIRouter()

class Message(BaseModel):
    text: str

class Response(BaseModel):
    text: str

# 配置 Mistral AI API 密钥和端点
MISTRAL_API_KEY = "yoVjrsVXZwAHgwxUga8zP3TH9tBR7Pquz9"
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat"

def call_mistral_api(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "prompt": prompt,
        "max_tokens": 150
    }
    response = requests.post(MISTRAL_API_URL, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()["choices"][0]["text"]
    else:
        raise HTTPException(status_code=response.status_code, detail="Mistral AI API error")

@router.post("/chat", response_model=Response)
async def chat_with_ai(message: Message):
    user_message = message.text.lower()

    if "历史数据" in user_message:
        return {"text": "您可以在历史数据页面查看过往的开奖信息。"}
    elif "预测" in user_message:
        return {"text": "您可以在预测结果页面获取最新的预测号码。"}
    elif "频率" in user_message:
        return {"text": "号码出现频率分析可以帮助您了解哪些号码更常出现。"}
    elif "温度系数" in user_message or "随机性" in user_message:
        return {"text": "温度系数越高，预测结果的随机性越大。"}
    else:
        # 调用 Mistral AI API
        response_text = call_mistral_api(user_message)
        return {"text": response_text}

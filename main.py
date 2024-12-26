from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

# 创建 FastAPI 实例
app = FastAPI()

# 添加 CORS 中间件（如果需要）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头
)

# 加载预训练模型
nlp = pipeline("text-generation")

# 定义根路径处理
@app.get("/")
async def read_root():
    return {"message": "Welcome to the API. Use /chat endpoint for text generation."}

# 定义一个示例路由
@app.get("/chat")
async def chat(prompt: str):
    response = nlp(prompt, max_length=150, num_return_sequences=1)
    return {"text": response[0]["generated_text"]}

# 运行应用程序
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

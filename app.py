from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)

model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat()

@app.route("/chat", methods=["POST"])
def chat_route():
    data = request.get_json()
    prompt = data.get("prompt", "")
    response = chat.send_message(prompt)
    #print(response.__dir__())
    return jsonify({"response": response._result.candidates[0].content.parts[0].text})

if __name__ == "__main__":
    app.run(debug=True)

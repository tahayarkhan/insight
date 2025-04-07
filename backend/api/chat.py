from flask import Flask, request, jsonify
import cohere
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()

# Initialize Cohere API client
co = cohere.Client(os.getenv("COHERE_API_KEY"))

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'reply': 'Please provide a prompt.'}), 400

    # Adjust the prompt for a more balanced, conversational response
    if prompt.lower() in ['hello', 'hi', 'hey']:
        response_text = "Hello! How can I assist you with your investment and financial planning today? Feel free to ask any questions related to the stock market or investment strategies."
        return jsonify({'reply': response_text})

    # For other prompts, provide professional insights related to investments
    investment_prompt = f"Behave as a professional investment advisor. Provide concise and straightforward responses, avoiding excessive jargon or unnecessary details. Only provide relevant information related to the stock market, investment strategies, or financial forecasting. \n\n{prompt}"

    response = co.generate(
        model='command-r-plus-08-2024',
        prompt=investment_prompt,
        max_tokens=250,  # Limit the response length for more manageable replies
        temperature=0.5
    )

    reply = response.generations[0].text.strip()
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)

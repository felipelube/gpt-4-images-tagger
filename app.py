from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory

from lib.image_processing import get_image_details
from lib.prompt import send_prompt

app = Flask(__name__, static_url_path='',
            static_folder='static',)

load_dotenv()

@app.route('/')
def home():
    return send_from_directory("static", "index.html")

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']

    if file.filename == '':
        return 'No selected file'

    image_base64, dominant_color, pallete = get_image_details(file)
    response = send_prompt(image_base64, dominant_color, pallete)

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

# GPT-4 Images Tagger
A small app to add tags to your images using OpenAI GPT-4 with Vision

## Set-up
### Requirements
- Python 3.11 or later
- Node.js 20 or later
- An OpenAI key

### Install instructions
1. Clone the repository and get into its folder
2. Create a new python virtual env for it: `python -m venv .venv`
3. Activate the virtual env: `. .venv/bin/activate`
4. Install the python packages: `pip install -r requirements.txt`
5. Go to the frontend folder: `cd frontend`
6. Install the frontend dependencies: `npm i`
7. Build the frontend: `npm run build`
8. Go back to the root folder: `cd ..`
9. Set your OPEN_AI_API_KEY environment variable in the `.env` file
10. Run the application with `python app.py`. It should be accessible at `http://localhost:5000`.

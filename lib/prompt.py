import os

import requests


def send_prompt(image_base64, dominant_color, pallete):
    api_key = os.getenv("OPEN_AI_API_KEY")

    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}

    image_url = f"data:image/jpeg;base64,{image_base64}"

    payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """
                        Act as an expert image stock photographer to come with compeling tags that describe the provided
                        image, so it can have more chances to be sold in a stock images platform.
                        Please do not provide any preamble or explanation, each one separated by a comma and wrapped by
                        quotes.
                        Consider that the main color of the image is: {dominant_color}.
                        Consider that the pallete of the colors of the image is: {pallete}.
                        Return the answer as a JSON object only containing the tags as an array. No markdown, please.
                    """,
                    },
                    {"type": "image_url", "image_url": {"url": image_url}},
                ],
            }
        ],
        "max_tokens": 300,
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )
    return response.json()

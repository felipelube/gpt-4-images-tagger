import base64
from io import BytesIO

from colorthief import ColorThief
from PIL import Image


def get_image_details(file):
    image = Image.open(file)


    buffered = BytesIO()
    image.save(buffered, format="JPEG")

    color_thief = ColorThief(buffered)

    image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    color_info = [color_thief.get_color(), *color_thief.get_palette()]


    dominant_color, *pallete = list(map(lambda x: '#%02x%02x%02x' % x, color_info))

    return image_base64, dominant_color, pallete

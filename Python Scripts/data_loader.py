import json


def load_data(filename):
    with open(filename, 'r') as file:
        data = json.load(file)

    return data['data']
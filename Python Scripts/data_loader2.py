import json


def load_data(filename):
    with open(filename,'r') as file:
        data = json.load(file)

    x = data['x']
    y = data['y']
    return x,y
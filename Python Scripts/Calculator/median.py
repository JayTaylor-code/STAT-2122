from data_loader import load_data


def median():
    data = sorted(load_data('data.json')['data'])
    size = load_data('data.json')['size']
    if (size % 2 == 0):
        m = (data[size//2 - 1] + data[size//2]) / 2
    else:
        m = data[size//2]
    return m


def median_of(data,size):
    if (size % 2 == 0):
        m = (data[size//2 - 1] + data[size//2]) / 2
    else:
        m = data[size//2]
    return m


if __name__ == '__main__':
    print('Median: ',median())
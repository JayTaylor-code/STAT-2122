from data_loader import load_data


def median():
    data = sorted(load_data('data.json'))
    n = len(data)
    if (n % 2 == 0):
        m = (data[n//2 - 1] + data[n//2]) / 2
    else:
        m = data[n//2]
    return m


def median_of(data):
    n = len(data)
    if (n % 2 == 0):
        m = (data[n//2 - 1] + data[n//2]) / 2
    else:
        m = data[n//2]
    return m


if __name__ == '__main__':
    print('Median: ',median())
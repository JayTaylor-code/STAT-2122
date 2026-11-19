from data_loader import load_data


def mean():
    data = load_data('data.json')['data']
    size = load_data('data.json')['size']
    m = sum(data) / (size - 1)
    return m


def mean_of(data,size):
    return sum(data) / (size - 1)


if __name__ == '__main__':
    print('Mean: ',mean())
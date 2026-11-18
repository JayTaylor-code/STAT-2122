from data_loader import load_data


def mean():
    data = load_data('data.json')['data']
    size = load_data('data.json')['size']
    m = sum(data) / size
    return m


def mean_of(data,size):
    return sum(data) / size


if __name__ == '__main__':
    print('Mean: ',mean())
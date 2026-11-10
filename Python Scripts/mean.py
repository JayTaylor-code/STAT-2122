from data_loader import load_data


def mean():
    data = load_data('data.json')
    m = sum(data) / len(data)
    return m


def mean_of(data):
    return sum(data) / len(data)


if __name__ == '__main__':
    print('Mean: ',mean())
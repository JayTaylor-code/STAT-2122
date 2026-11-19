from data_loader import load_data
from mean import mean,mean_of


def variance():
    data = load_data('data.json')['data']
    size = load_data('data.json')['size']
    m = mean()
    v = sum((x - m) ** 2 for x in data) / (size - 1)
    return v


def variance_of(data,size):
    m = mean_of(data,size)
    v = sum((x - m) ** 2 for x in data) / (size - 1)
    return v


if __name__ == '__main__':
    print('Variance: ',variance())
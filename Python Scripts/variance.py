from data_loader import load_data
from mean import mean,mean_of


def variance():
    data = load_data('data.json')
    m = mean()
    v = sum((x - m) ** 2 for x in data) / len(data)
    return v


def variance_of(data):
    m = mean_of(data)
    v = sum((x - m) ** 2 for x in data) / len(data)
    return v


if __name__ == '__main__':
    print('Variance: ',variance())
from data_loader2 import load_data
from mean import mean_of


def covariance():
    x,y = load_data('data2.json')
    x_mean = mean_of(x)
    y_mean = mean_of(y)
    cov = sum((a - x_mean) * (b - y_mean) for a,b in zip(x,y)) / len(x)
    return cov


if __name__ == '__main__':
    print('Covariance: ',covariance())
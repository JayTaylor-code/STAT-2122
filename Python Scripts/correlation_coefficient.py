from data_loader2 import load_data
from mean import mean_of
from standard_deviation import standard_deviation_of
from covariance import covariance


def correlation_coefficient():
    x,y = load_data('data2.json')
    x_mean = mean_of(x)
    y_mean = mean_of(y)
    std_x = standard_deviation_of(x)
    std_y = standard_deviation_of(y)
    r = covariance() / (std_x * std_y)
    return r


if __name__ == '__main__':
    print("Correlation Coefficient: ",correlation_coefficient())
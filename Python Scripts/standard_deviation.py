from math import sqrt
from variance import variance,variance_of


def standard_deviation():
    std_dev = sqrt(variance())
    return std_dev


def standard_deviation_of(data):
    std_dev = sqrt(variance_of(data))
    return std_dev


if __name__ == '__main__':
    print('Standard Deviation: ',standard_deviation())
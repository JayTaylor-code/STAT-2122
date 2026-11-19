import math
from mean import mean_of
from standard_deviation import standard_deviation_of


def confidence_interval_95(data,size):
    if (size < 2):
        raise ValueError("At least two data points are required.")
    m = mean_of(data,size)
    std_dev = standard_deviation_of(data,size)
    se = std_dev / math.sqrt(size)
    z = 1.96
    margin_error = z * se
    lower = m - margin_error
    upper = m + margin_error
    return (m,lower,upper)
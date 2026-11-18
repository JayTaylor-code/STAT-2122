import math
from mean import mean
from standard_deviation import standard_deviation


def confidence_interval_95(data,size):
    if (size < 2):
        raise ValueError("At least two data points are required.")
    m = mean()
    std_dev = standard_deviation()
    se = std_dev / math.sqrt(size)
    z = 1.96
    margin_error = z * se
    lower = m - margin_error
    upper = m + margin_error
    return (m,lower,upper)
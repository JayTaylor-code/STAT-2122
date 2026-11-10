from data_loader2 import load_data
from mean import mean,mean_of
from median import median,median_of
from standard_deviation import standard_deviation,standard_deviation_of
from variance import variance,variance_of
from covariance import covariance
from correlation_coefficient import correlation_coefficient


def main():
    print('\nData from \"data.json\"\n')
    print('Mean: ',mean())
    print('Median: ', median())
    print('Variance: ', variance())
    print('Standard Deviation: ',standard_deviation())
    print('\n=================================================================\n')
    print('Data from \"data2.json\"\n')
    x,y = load_data('data2.json')
    print('Mean of X: ',mean_of(x))
    print('Median of X: ',median_of(x))
    print('Variance of X: ',variance_of(x))
    print('Standard Deviation of X: ',standard_deviation_of(x))
    print('\n')
    print('Mean of Y: ',mean_of(y))
    print('Median of Y: ',median_of(y))
    print('Variance of Y: ',variance_of(y))
    print('Standard Deviation of Y: ',standard_deviation_of(y))
    print('\n')
    print('Covariance of X and Y: ',covariance())
    print('\n')
    print('Correlation Coefficient of X and Y: ',correlation_coefficient())


if __name__ == '__main__':
    main()
#include "covariance.h"
#include "mean.h"

double covariance(double x[], double y[], int size) {
    double xMean = mean(x,size);
    double yMean = mean(y,size);
    double sum = 0;
    for (int i = 0; i < size; i++) {
        sum += ((x[i] - xMean) * (y[i] - yMean));
    }
    return (sum / (size - 1));
}
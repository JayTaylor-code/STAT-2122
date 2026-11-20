#include "correlationCoefficient.h"
#include "covariance.h"
#include "standardDeviation.h"

double correlation(double x[], double y[], int size) {
    return (covariance(x,y,size) / (standardDeviation(x,size) * standardDeviation(y,size)));
}
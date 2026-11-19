#include <cmath>
#include <stdexcept>
#include "confidenceInterval.h"
#include "mean.h"
#include "standardDeviation.h"

ConfidenceInterval confidenceInterval(double data[], int size, double z) {
    if (size < 2) {
        throw std::invalid_argument("At least two data points are required.");
    }
    double m = mean(data,size);
    double stdDev = standardDeviation(data,size);
    double se = stdDev / std::sqrt(size);
    double marginError = z * se;
    ConfidenceInterval result;
    result.mean = m;
    result.lower = m - marginError;
    result.upper = m + marginError;
    result.confidenceLevel = (std::erf(z / std::sqrt(2.0))) * 100.0;
    return result;
}
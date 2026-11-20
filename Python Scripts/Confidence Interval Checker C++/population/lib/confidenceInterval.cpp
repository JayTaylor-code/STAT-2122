#include "confidenceInterval.h"
#include "getZCritical.h"
#include <cmath>

ConfidenceInterval confidenceInterval(double mean, double standardDeviation, int size, double confidenceLevel) {
    double z = getZCritical(confidenceLevel);
    double standardError = standardDeviation / std::sqrt(size);
    double marginError = z * standardError;
    ConfidenceInterval result;
    result.lower = mean - marginError;
    result.upper = mean + marginError;
    result.zCritical = z;
    result.standardError = standardError;
    return result;
}
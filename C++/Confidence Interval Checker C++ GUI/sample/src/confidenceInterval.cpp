#include "confidenceInterval.h"
#include "getTCritical.h"
#include <cmath>

ConfidenceInterval confidenceInterval(double mean, double standardDeviation, int size, double confidenceLevel) {
    double t = getTCritical(confidenceLevel, size);
    double standardError = standardDeviation / std::sqrt(size);
    double marginOfError = t * standardError;
    ConfidenceInterval result;
    result.lower = mean - marginOfError;
    result.upper = mean + marginOfError;
    result.tCritical = t;
    result.standardError = standardError;
    return result;
}
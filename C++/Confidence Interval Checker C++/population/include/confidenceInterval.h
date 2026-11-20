#ifndef CONFIDENCE_INTERVAL_H
#define CONFIDENCE_INTERVAL_H

struct ConfidenceInterval {
    double lower;
    double upper;
    double zCritical;
    double standardError;
};

ConfidenceInterval confidenceInterval(double mean, double standardDeviation, int size, double confidenceLevel);

#endif
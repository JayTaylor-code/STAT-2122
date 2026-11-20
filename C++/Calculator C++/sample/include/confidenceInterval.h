#ifndef CONFIDENCEINTERVAL_H
#define CONFIDENCEINTERVAL_H

struct ConfidenceInterval {
    double mean;
    double lower;
    double upper;
    double confidenceLevel;
};

ConfidenceInterval confidenceInterval(double data[], int size, double z);

#endif
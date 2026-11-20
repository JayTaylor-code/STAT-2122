#include "getTCritical.h"
#include <boost/math/distributions/students_t.hpp>

double getTCritical(double confidenceLevel, int size) {
    boost::math::students_t dist(size - 1);
    double alpha = 1.0 - confidenceLevel;
    return quantile(dist, 1.0 - alpha / 2.0);
}
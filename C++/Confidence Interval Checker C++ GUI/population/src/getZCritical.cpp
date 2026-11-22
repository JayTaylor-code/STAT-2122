#include "getZCritical.h"
#include <boost/math/distributions/normal.hpp>

double getZCritical(double confidenceLevel) {
    boost::math::normal standardNormal;
    double alpha = 1.0 - confidenceLevel;
    return quantile(standardNormal, 1.0 - (alpha / 2.0));
}
#include "standardDeviation.h"
#include "variance.h"
#include <cmath>

double standardDeviation(double data[], int size) {
    return std::sqrt(variance(data,size));
}
#include "median.h"
#include <algorithm>

double median(double data[], int size) {
    std::sort(data, data + size);
    if (size % 2 == 0) {
        return (data[size / 2 - 1] + data[size / 2]) / 2.0;
    }
    return data[size / 2];
}
#include "mean.h"

double mean(double data[], int size) {
    double sum = 0;
    for (int i = 0; i < size; i++) {
        sum += data[i];
    }
    return (sum / (size - 1));
}
#include "variance.h"
#include "mean.h"

double variance(double data[], int size) {
    double avg = mean(data,size);
    double sum = 0;
    for (int i = 0; i < size; i++) {
        sum += (data[i] - avg) * (data[i] - avg);
    }
    return (sum / (size - 1));
}
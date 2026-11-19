#include <iostream>
#include "mean.h"
#include "median.h"
#include "variance.h"
#include "standardDeviation.h"
#include "covariance.h"
#include "correlationCoefficient.h"
#include "confidenceInterval.h"
#include "dataLoader.h"
#include "dataLoader2.h"
#include "confidenceDataLoader.h"

int main() {
    double* data = nullptr;
    int size;
    loadData("data.json",data,size);
    std::cout << "Data from \"data.json\"" << std::endl << std::endl;
    std::cout << "Mean: " << mean(data,size) << std::endl;
    std::cout << "Median: " << median(data,size) << std::endl;
    std::cout << "Variance: " << variance(data,size) << std::endl;
    std::cout << "Standard Deviation: " << standardDeviation(data,size) << std::endl;
    delete[] data;
    size = 0;

    double z;
    loadData2("confidence_data.json",data,size,z);
    ConfidenceInterval ci = confidenceInterval(data,size,z);
    std::cout << std::endl << "Confidence Interval from \"confidence_data.json\"" << std::endl << std::endl;
    std::cout << "Sample Mean: " << ci.mean << std::endl;
    std::cout << static_cast<int>(ci.confidenceLevel) << "%-Confidence Interval: [" << ci.lower << ", " << ci.upper << "]" << std::endl;
    size = 0;
    
    double* x = nullptr;
    double* y = nullptr;
    loadData3("data2.json",x,y,size);
    std::cout << std::endl << "Data from \"data2.json\"" << std::endl << std::endl;
    std::cout << "Mean of X: " << mean(x,size) << std::endl;
    std::cout << "Median of X: " << median(x,size) << std::endl;
    std::cout << "Variance of X: " << variance(x,size) << std::endl;
    std::cout << "Standard Deviation of X: " << standardDeviation(x,size) << std::endl;
    
    std::cout << std::endl << "Mean of Y: " << mean(y,size) << std::endl;
    std::cout << "Median of Y: " << median(y,size) << std::endl;
    std::cout << "Variance of Y: " << variance(y,size) << std::endl;
    std::cout << "Standard Deviation of Y: " << standardDeviation(y,size) << std::endl;

    std::cout << std::endl << "Covariance of X and Y: " << covariance(x,y,size) << std::endl;
    std::cout << "Correlation Coefficient of X and Y: " << correlation(x,y,size) << std::endl;
    delete[] x;
    delete[] y;
    size = 0;

    std::cout << std::endl << "Press Enter to exit...";
    std::cin.get();

    return 0;
}
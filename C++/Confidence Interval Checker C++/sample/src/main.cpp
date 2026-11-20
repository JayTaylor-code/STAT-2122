#include <iostream>
#include <iomanip>
#include <limits>
#include "confidenceInterval.h"
#ifdef _WIN32
#define NOMINMAX
#include <windows.h>
#endif

int main() {
    #ifdef _WIN32
    SetConsoleOutputCP(CP_UTF8);
    #endif
    double mean;
    double standardDeviation;
    int size;
    double confidenceLevel;
    std::cout << "Approximate Confidence Interval Calculator" << std::endl;
    std::cout << "-----------------------------------------------" << std::endl;
    std::cout << "Enter sample mean (x\u0304): ";
    std::cin >> mean;
    std::cout << "Enter sample standard deviation (s): ";
    std::cin >> standardDeviation;
    std::cout << "Enter sample size (n): ";
    std::cin >> size;
    std::cout << "Enter confidence level (0.95, 0.99, etc.): ";
    std::cin >> confidenceLevel;
    ConfidenceInterval ci = confidenceInterval(mean,standardDeviation,size,confidenceLevel);
    std::cout << std::endl << "Results" << std::endl;
    std::cout << "-----------------------------------------------" << std::endl;
    std::cout << "Confidence Level : " << (confidenceLevel * 100) << "%" << std::endl;
    std::cout << std::fixed << std::setprecision(6);
    std::cout << "t Critical Value : " << ci.tCritical << std::endl;
    std::cout << "Estimated SE     : " << ci.standardError << std::endl;
    std::cout << "Lower Bound      : " << ci.lower << std::endl;
    std::cout << "Upper Bound      : " << ci.upper << std::endl;
    std::cout << std::endl << "Press Enter to exit...";
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(),'\n');
    std::cin.get();
    return 0;
}
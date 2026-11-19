#include "dataLoader2.h"
#include "../nlohmann/json.hpp"
#include <fstream>

void loadData3(const char* filename, double*& x, double*& y, int& size) {
    std::ifstream file(filename);
    nlohmann::json j;
    file >> j;
    size = j["size"];
    x = new double[size];
    y = new double[size];
    for (int i = 0; i < size; i++) {
        x[i] = j["x"][i];
        y[i] = j["y"][i];
    }
}
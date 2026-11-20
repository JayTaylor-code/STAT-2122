#include "dataLoader.h"
#include "../nlohmann/json.hpp"
#include <fstream>

void loadData(const char* filename, double*& data, int& size) {
    std::ifstream file(filename);
    nlohmann::json j;
    file >> j;
    size = j["size"];
    data = new double[size];
    for (int i = 0; i < size; i++) {
        data[i] = j["data"][i];
    }
}
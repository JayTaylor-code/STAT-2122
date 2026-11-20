cmake_minimum_required(VERSION 3.16)

project(StatisticsProject)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(include)

add_executable(statistics
    main.cpp
    lib/mean.cpp
    lib/median.cpp
    lib/variance.cpp
    lib/standardDeviation.cpp
    lib/covariance.cpp
    lib/correlationCoefficient.cpp
    lib/dataLoader.cpp
    lib/dataLoader2.cpp
    lib/confidenceInterval.cpp
    lib/confidenceDataLoader.cpp
)

install(TARGETS statistics RUNTIME DESTINATION bin)
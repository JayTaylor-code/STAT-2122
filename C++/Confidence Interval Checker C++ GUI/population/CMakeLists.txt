cmake_minimum_required(VERSION 3.16)
project(PopulationConfidenceInterval)
set(CMAKE_CXX_STANDARD 20)
find_package(Qt6 REQUIRED COMPONENTS Widgets)
qt_standard_project_setup()
qt_add_executable(PopulationConfidenceInterval WIN32
    src/main.cpp
    src/mainwindow.cpp
    src/confidenceInterval.cpp
    src/getZCritical.cpp
    resources.qrc
    app.rc
)
target_include_directories(PopulationConfidenceInterval PRIVATE
    ${CMAKE_SOURCE_DIR}/include
    ${CMAKE_SOURCE_DIR}/include/boost
)
target_link_libraries(PopulationConfidenceInterval PRIVATE
    Qt6::Widgets
)
install(TARGETS PopulationConfidenceInterval
    RUNTIME DESTINATION ${CMAKE_SOURCE_DIR}/bin
)

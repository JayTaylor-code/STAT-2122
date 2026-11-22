cmake_minimum_required(VERSION 3.16)
project(PopulationConfidenceInterval)
set(CMAKE_CXX_STANDARD 20)
find_package(Qt6 REQUIRED COMPONENTS Widgets)
qt_standard_project_setup()
qt_add_executable(SampleConfidenceInterval WIN32
    src/main.cpp
    src/mainwindow.cpp
    src/confidenceInterval.cpp
    src/getTCritical.cpp
    resources.qrc
    app.rc
)
target_include_directories(SampleConfidenceInterval PRIVATE
    ${CMAKE_SOURCE_DIR}/include
    ${CMAKE_SOURCE_DIR}/include/boost
)
target_link_libraries(SampleConfidenceInterval PRIVATE
    Qt6::Widgets
)
install(TARGETS SampleConfidenceInterval
    RUNTIME DESTINATION ${CMAKE_SOURCE_DIR}/bin
)

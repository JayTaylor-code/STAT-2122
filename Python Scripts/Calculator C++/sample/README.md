# Compile the Calculator

## With Cmake

```
cmake -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
ninja -C build
```

**To install the Calculator:**

```
cmake --install build
```

## With G++

```
g++ main.cpp lib/*.cpp -Iinclude -o statistics
```

## With Clang++

```
clang++ main.cpp lib/*.cpp -Iinclude -std=c++17 -Wall -Wextra -pedantic -o statistics
```

**For Windows:**

```
clang++ main.cpp lib/*.cpp -Iinclude -std=c++17 -Wall -Wextra -pedantic -o statistics.exe
```

**Debug Build:**

```
clang++ main.cpp lib/*.cpp -Iinclude -std=c++17 -Wall -Wextra -pedantic -g -O0 -o statistics
```

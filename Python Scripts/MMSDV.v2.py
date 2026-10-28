import numpy as np

data = [165, 225, 185, 341, 77, 227, 176, 154, 224, 204, 94]

mean = np.mean(data)
median = np.median(data)
std_dev = np.std(data, ddof=1)
variance = np.var(data, ddof=1)

print("Mean: ", mean)
print("Median: ", median)
print("Standard Deviation: ", std_dev)
print("Variance: ", variance)

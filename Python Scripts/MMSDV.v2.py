import numpy as np

data = [12, 15, 18, 22, 25, 30]

mean = np.mean(data)
median = np.median(data)
std_dev = np.std(data, ddof=1)
variance = np.var(data, ddof=1)

print("Mean: ", mean)
print("Median: ", median)
print("Standard Deviation: ", std_dev)
print("Variance: ", variance)

data = [12, 15, 18, 22, 25, 30]

mean = sum(data) / len(data)

sorted_data = sorted(data)
n = len(sorted_data)
mid = n // 2

if n % 2 == 0:
    median = (sorted_data[mid - 1] + sorted_data[mid]) / 2
else:
    median = sorted_data[mid]

variance = sum((x - mean) ** 2 for x in data) / (len(data) - 1)

std_dev = variance ** 0.5

print("Mean: ", mean)
print("Median: ", median)
print("Standard deviation: ", std_dev);
print("Variance: ", variance)

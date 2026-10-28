numbers = [165, 225, 185, 341, 77, 227, 176, 154, 224, 204, 94]
sorted_numbers = sorted(numbers)
n = len(sorted_numbers)
mid = n // 2

if n % 2 == 0:
    median = (sorted_numbers[mid - 1] + sorted_numbers[mid]) / 2
else:
    median = sorted_numbers[mid]

print("The median is: ", median)

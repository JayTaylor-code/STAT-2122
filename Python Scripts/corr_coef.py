raw_x = input("Enter the first sample set: ")
raw_y = input("Enter the second sample set: ")

raw_x = raw_x.replace('[', '').replace(']', '').strip()
raw_y = raw_y.replace('[', '').replace(']', '').strip()

tmp_x = raw_x.replace(',', ' ').split()
tmp_y = raw_y.replace(',', ' ').split()

def convert_value(v):
    if v.isdigit() or (v.startswith('-') and v[1:].isdigit()):
        return int(v)
    try:
        return float(v)
    except ValueError:
        raise ValueError(f"Invalid number: {v}")

x = [convert_value(v) for v in tmp_x]
y = [convert_value(v) for v in tmp_y]

if len(x) != len(y):
    raise ValueError("Both sample sets must have the same number of elements.")

n = len(x)

sum_x = sum(x)
sum_y = sum(y)

sum_xy = 0
sum_x2 = 0
sum_y2 = 0

for i in range(n):
    sum_xy += x[i] * y[i]
    sum_x2 += x[i] ** 2
    sum_y2 += y[i] ** 2

numerator = (n * sum_xy) - (sum_x * sum_y)
denominator = (((n * sum_x2) - (sum_x ** 2)) * ((n * sum_y2) - (sum_y ** 2))) ** 0.5

corr_coef = numerator / denominator

print(f'\nCorrelation Coefficient: {corr_coef:.2f}')

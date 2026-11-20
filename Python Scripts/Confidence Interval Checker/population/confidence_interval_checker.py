import math
from scipy.stats import norm


def confidence_interval(mean,std_dev,size,confidence_level):
    """
    Calculates an approximate confidence interval:

    mean ± z(alpha/2) * SE_hat

    where SE_hat = σ / sqrt(n)
    """
    alpha = 1 - confidence_level
    z_critical = norm.ppf(1 - alpha / 2)
    se_hat = std_dev / math.sqrt(size)
    margin_of_error = z_critical * se_hat
    lower = mean - margin_of_error
    upper = mean + margin_of_error
    return (lower,upper,z_critical,se_hat)


def main():
    print("Approximate Confidence Interval Calculator")
    print("-" * 40)
    mean = float(input("Enter population mean (x̄): "))
    std_dev = float(input("Enter population standard deviation (σ): "))
    size = int(input("Enter population size (n): "))
    confidence_level = float(input("Enter confidence level (e.g., 0.95, 0.99): "))
    (lower,upper,z,se_hat) = confidence_interval(mean,std_dev,size,confidence_level)
    print("\nResults")
    print("-" * 40)
    print(f"Confidence Level : {confidence_level:.0%}")
    print(f"z Critical Value : {z:.6f}")
    print(f"Estimated SE     : {se_hat:.6f}")
    print(f"Lower Bound      : {lower:.6f}")
    print(f"Upper Bound      : {upper:.6f}")


if __name__ == "__main__":
    main()
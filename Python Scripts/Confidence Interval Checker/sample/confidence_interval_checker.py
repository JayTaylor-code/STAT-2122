import math
from scipy.stats import t


def confidence_interval(mean,sample_std_dev,sample_size,confidence_level):
    """
    Sample confidence interval using the t-distribution:

    x̄ ± t(alpha/2, n-1) * s/sqrt(n)
    """
    alpha = 1 - confidence_level
    degrees_of_freedom = sample_size - 1
    t_critical = t.ppf((1 - alpha / 2),degrees_of_freedom)
    se = sample_std_dev / math.sqrt(sample_size)
    margin_of_error = t_critical * se
    lower = mean - margin_of_error
    upper = mean + margin_of_error
    return (lower,upper,t_critical,se,degrees_of_freedom)


def main():
    print("Sample Confidence Interval Calculator")
    print("-" * 40)
    mean = float(input("Enter sample mean (x̄): "))
    sample_std_dev = float(input("Enter sample standard deviation (s): "))
    sample_size = int(input("Enter sample size (n): "))
    confidence_level = float(input("Enter confidence level (e.g., 0.95, 0.99): "))
    (lower,upper,t_value,se,df) = confidence_interval(mean,sample_std_dev,sample_size,confidence_level)
    print("\nResults")
    print("-" * 40)
    print(f"Confidence Level : {confidence_level:.0%}")
    print(f"Degrees Freedom  : {df}")
    print(f"t Critical Value : {t_value:.6f}")
    print(f"Estimated SE     : {se:.6f}")
    print(f"Lower Bound      : {lower:.6f}")
    print(f"Upper Bound      : {upper:.6f}")


if __name__ == "__main__":
    main()
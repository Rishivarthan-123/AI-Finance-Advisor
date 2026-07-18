import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

from synthetic_data.generator import SyntheticDataGenerator

customer, transactions = SyntheticDataGenerator.generate()

print(customer)

print()

print(f"Generated {len(transactions)} transactions")

print()

print("Files created successfully.")
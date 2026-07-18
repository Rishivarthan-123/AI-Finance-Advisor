import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

from synthetic_data.customer_generator import CustomerGenerator

customer = CustomerGenerator.generate()

print(customer)
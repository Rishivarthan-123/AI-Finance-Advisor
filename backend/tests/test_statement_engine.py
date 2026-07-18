import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

from statement_engine.header_detector import HeaderDetector

sample_table = [

    ["STATE BANK OF INDIA"],

    ["Statement Period"],

    ["Txn Date", "Narration", "Withdrawal", "Deposit", "Balance"],

    ["01/07/2026", "SWIGGY", "450", "", "18000"],

    ["02/07/2026", "Salary Credit", "", "35000", "53000"]

]

header_index, mapping = HeaderDetector.detect(sample_table)

print(header_index)
print(mapping)
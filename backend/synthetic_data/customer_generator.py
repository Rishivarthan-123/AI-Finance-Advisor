import random


class CustomerGenerator:

    FIRST_NAMES = [
        "Rahul", "Arun", "Karthik", "Vignesh", "Rohit",
        "Priya", "Ananya", "Sneha", "Meera", "Divya"
    ]

    LAST_NAMES = [
        "Sharma", "Kumar", "Reddy", "Patel",
        "Nair", "Iyer", "Singh", "Gupta"
    ]

    CITIES = [
        "Chennai",
        "Bangalore",
        "Hyderabad",
        "Mumbai",
        "Delhi",
        "Coimbatore",
        "Pune"
    ]

    PROFESSIONS = [
        {
            "name": "Software Engineer",
            "salary": (50000, 120000)
        },
        {
            "name": "Teacher",
            "salary": (30000, 60000)
        },
        {
            "name": "Business Owner",
            "salary": (80000, 250000)
        },
        {
            "name": "Doctor",
            "salary": (100000, 300000)
        },
        {
            "name": "Student",
            "salary": (5000, 20000)
        },
        {
            "name": "Freelancer",
            "salary": (25000, 150000)
        }
    ]

    @staticmethod
    def generate():

        profession = random.choice(
            CustomerGenerator.PROFESSIONS
        )

        income = random.randint(
            profession["salary"][0],
            profession["salary"][1]
        )

        return {

            "name":
                random.choice(CustomerGenerator.FIRST_NAMES)
                + " " +
                random.choice(CustomerGenerator.LAST_NAMES),

            "age":
                random.randint(20, 60),

            "city":
                random.choice(CustomerGenerator.CITIES),

            "occupation":
                profession["name"],

            "monthly_income":
                income

        }
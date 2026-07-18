from datetime import datetime

from database import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, DateTime


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    fullname: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(120),
        unique=True,
        nullable=False
    )

    phone: Mapped[str] = mapped_column(
        String(15),
        unique=True,
        nullable=False
    )

    password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    age: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    occupation: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    monthly_income: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    savings_goal: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    risk_level: Mapped[str] = mapped_column(
        String(50),
        default="Low"
    )

    investment_experience: Mapped[str] = mapped_column(
        String(50),
        default="Beginner"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "email": self.email,
            "phone": self.phone,
            "age": self.age,
            "occupation": self.occupation,
            "monthly_income": self.monthly_income,
            "savings_goal": self.savings_goal,
            "risk_level": self.risk_level,
            "investment_experience": self.investment_experience,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
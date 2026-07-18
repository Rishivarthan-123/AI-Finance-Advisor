from datetime import datetime
from database import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, Date, DateTime, ForeignKey


class Reminder(db.Model):
    __tablename__ = "reminders"

    def __init__(
        self,
        user_id: int,
        title: str,
        amount: float,
        category: str,
        due_date,
        status: str = "Pending"
    ):
        self.user_id = user_id
        self.title = title
        self.amount = amount
        self.category = category
        self.due_date = due_date
        self.status = status

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    amount: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    category: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    due_date: Mapped[datetime] = mapped_column(
        Date,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="Pending"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )
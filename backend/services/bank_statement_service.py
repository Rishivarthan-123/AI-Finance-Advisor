import os
import traceback

from werkzeug.utils import secure_filename
from services.category_service import CategoryService
from database import db
from models.bank_statement import BankStatement
from models.statement_transaction import StatementTransaction

from statement_engine.processor import StatementProcessor


class BankStatementService:

    UPLOAD_FOLDER = "uploads"

    @staticmethod
    def upload_statement(user_id, file):

        try:

            if file is None:

                return {
                    "success": False,
                    "message": "No file uploaded."
                }

            os.makedirs(
                BankStatementService.UPLOAD_FOLDER,
                exist_ok=True
            )

            filename = secure_filename(file.filename)

            filepath = os.path.join(
                BankStatementService.UPLOAD_FOLDER,
                filename
            )

            file.save(filepath)

            # --------------------------
            # Create Statement Record
            # --------------------------

            statement = BankStatement(

                user_id=user_id,

                file_name=filepath,

                original_name=filename,

                bank_name="Unknown",

                account_number="",

                statement_period=""

            )

            db.session.add(statement)

            db.session.commit()

            # --------------------------
            # Process Statement
            # --------------------------

            transactions = StatementProcessor.process(
                filepath
            )

            print(f"Found {len(transactions)} transactions")

            # --------------------------
            # Save Transactions
            # --------------------------

            for tx in transactions:

                transaction = StatementTransaction(

                    statement_id=statement.id,

                    date=tx["date"],

                    description=tx["description"],

                    debit=float(tx["debit"]),

                    credit=float(tx["credit"]),

                    balance=float(tx["balance"]),

                    category=CategoryService.predict(
                        tx["description"]
                    ),

                    merchant=tx["description"]

                )

                db.session.add(transaction)

            db.session.commit()

            return {

                "success": True,

                "statement_id": statement.id,

                "count": len(transactions),

                "transactions": transactions,

                "message": "Statement uploaded successfully."

            }

        except Exception as e:

            db.session.rollback()

            traceback.print_exc()

            return {

                "success": False,

                "message": str(e)

            }
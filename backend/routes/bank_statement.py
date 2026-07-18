from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db

from models.bank_statement import BankStatement
from models.statement_transaction import StatementTransaction
from models.transaction import Transaction

from services.bank_statement_service import BankStatementService

statement_bp = Blueprint(
    "statement",
    __name__
)


# =====================================================
# Upload Statement
# =====================================================
@statement_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload():

    if "file" not in request.files:

        return jsonify({

            "success": False,

            "message": "No file uploaded."

        }), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify({

            "success": False,

            "message": "Please choose a file."

        }), 400

    user_id = int(get_jwt_identity())

    result = BankStatementService.upload_statement(
        user_id,
        file
    )

    if result["success"]:

        return jsonify(result), 200

    return jsonify(result), 400


# =====================================================
# Preview Statement
# =====================================================
@statement_bp.route("/<int:statement_id>/preview", methods=["GET"])
@jwt_required()
def preview(statement_id):

    statement = db.session.get(BankStatement, statement_id)

    if statement is None:

        return jsonify({

            "success": False,

            "message": "Statement not found."

        }), 404

    rows = StatementTransaction.query.filter_by(
        statement_id=statement_id
    ).all()

    transactions = []

    for row in rows:

        transactions.append({

            "id": row.id,

            "date": str(row.date),

            "description": row.description,

            "debit": row.debit,

            "credit": row.credit,

            "balance": row.balance,

            "category": row.category,

            "merchant": row.merchant

        })

    return jsonify({

        "success": True,

        "statement_id": statement.id,

        "count": len(transactions),

        "transactions": transactions

    })


# =====================================================
# Confirm Import
# =====================================================
@statement_bp.route("/<int:statement_id>/confirm", methods=["POST"])
@jwt_required()
def confirm(statement_id):

    user_id = int(get_jwt_identity())

    statement = db.session.get(BankStatement, statement_id)

    if statement is None:

        return jsonify({

            "success": False,

            "message": "Statement not found."

        }), 404

    rows = StatementTransaction.query.filter_by(
        statement_id=statement_id
    ).all()

    if len(rows) == 0:

        return jsonify({

            "success": False,

            "message": "No transactions found."

        }), 404

    imported = 0

    for row in rows:

        # Skip rows with missing date or zero amount
        if row.date is None:
            continue

        amount = row.credit if (row.credit or 0) > 0 else (row.debit or 0)

        if amount == 0:
            continue

        # Ensure title is never None (breaks JS .toLowerCase())
        title = (row.description or "").strip() or "Unnamed Transaction"

        tx = Transaction(

            user_id=user_id,

            title=title,

            amount=amount,

            type="Income" if (row.credit or 0) > 0 else "Expense",

            category=row.category or "Uncategorized",

            payment_method="Bank Statement",

            description=row.description or "",

            transaction_date=row.date,

            source="Bank Statement"

        )

        db.session.add(tx)

        imported += 1

    db.session.commit()

    return jsonify({

        "success": True,

        "imported": imported,

        "message": "Statement imported successfully."

    })
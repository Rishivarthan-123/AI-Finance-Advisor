import os
from synthetic_data.bank_templates import BANK_TEMPLATES
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph
)
from reportlab.lib.styles import getSampleStyleSheet


class PDFExporter:

    @staticmethod
    def export(customer, transactions, filename, bank="HDFC"):

        os.makedirs(
            "synthetic_data/output",
            exist_ok=True
        )

        filepath = os.path.join(
            "synthetic_data/output",
            filename
        )

        doc = SimpleDocTemplate(
            filepath,
            pagesize=A4
        )

        styles = getSampleStyleSheet()

        elements = []

        template = BANK_TEMPLATES.get(bank, BANK_TEMPLATES["HDFC"])
        elements.append(
            Paragraph(
                f"<b>{template['title']}</b>",
                styles["Title"]
            )
        )

        elements.append(
            Paragraph(
                f"Customer : {customer['name']}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Occupation : {customer['occupation']}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph(
                f"Monthly Income : ₹{customer['monthly_income']}",
                styles["Normal"]
            )
        )

        elements.append(
            Paragraph("<br/>", styles["Normal"])
        )

        data = [[
    template["date"],
    template["description"],
    "Category",
    template["debit"],
    template["credit"],
    template["balance"]
]]

        for t in transactions:

            data.append([

                str(t["date"]),

                t["description"],

                t["category"],

                f"{t['debit']:.2f}",

                f"{t['credit']:.2f}",

                f"{t['balance']:.2f}"

            ])

        table = Table(data)

        table.setStyle(

            TableStyle([

                ("BACKGROUND",(0,0),(-1,0),colors.darkblue),

                ("TEXTCOLOR",(0,0),(-1,0),colors.white),

                ("GRID",(0,0),(-1,-1),1,colors.black),

                ("BACKGROUND",(0,1),(-1,-1),colors.beige),

                ("ALIGN",(0,0),(-1,-1),"CENTER"),

                ("FONTNAME",(0,0),(-1,0),"Helvetica-Bold")

            ])

        )

        elements.append(table)

        doc.build(elements)

        return filepath
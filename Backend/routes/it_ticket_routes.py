print("IT Ticket Routes Loaded")

from flask import Blueprint, request, jsonify
from database.db import get_db_connection

ticket_bp = Blueprint("tickets", __name__)

# ADD TICKET
@ticket_bp.route("/add-ticket", methods=["POST"])
def add_ticket():

    data = request.json

    department = data.get("department")
    issue_type = data.get("issue_type")
    description = data.get("description")
    priority = data.get("priority")
    status = data.get("status")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""

            INSERT INTO IT_Tickets
            (
                department,
                issue_type,
                description,
                priority,
                status
            )

            VALUES (?, ?, ?, ?, ?)

        """,
        (
            department,
            issue_type,
            description,
            priority,
            status
        ))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Ticket Added Successfully"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# GET ALL TICKETS
@ticket_bp.route("/tickets", methods=["GET"])
def get_tickets():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM IT_Tickets
        """)

        rows = cursor.fetchall()

        tickets = []

        for row in rows:

            tickets.append({

                "ticket_id": row[0],
                "department": row[1],
                "issue_type": row[2],
                "description": row[3],
                "priority": row[4],
                "status": row[5]
            })

        cursor.close()
        conn.close()

        return jsonify(tickets)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

@ticket_bp.route(
    "/update-ticket/<int:id>",
    methods=["PUT"]
)
def update_ticket(id):

    data = request.json

    status = data.get("status")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE IT_Tickets
            SET status = ?
            WHERE ticket_id = ?
            """,
            (status, id)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Ticket Updated Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@ticket_bp.route(
    "/delete-ticket/<int:id>",
    methods=["DELETE"]
)
def delete_ticket(id):

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            DELETE FROM IT_Tickets
            WHERE ticket_id = ?
            """,
            (id,)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Ticket Deleted Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
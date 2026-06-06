from flask import Blueprint, request, jsonify
from database.db import get_db_connection

production_bp = Blueprint("production", __name__)

# ADD PRODUCTION

@production_bp.route("/add-production", methods=["POST"])
def add_production():

    data = request.json

    batch_id = data.get("batch_id")
    product_name = data.get("product_name")
    planned_quantity = data.get("planned_quantity")
    produced_quantity = data.get("produced_quantity")
    status = data.get("status")
    production_date = data.get("production_date")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO Production
            (
                batch_id,
                product_name,
                planned_quantity,
                produced_quantity,
                status,
                production_date
            )

            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                batch_id,
                product_name,
                planned_quantity,
                produced_quantity,
                status,
                production_date
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Production Added Successfully"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# GET PRODUCTIONS

@production_bp.route("/productions", methods=["GET"])
def get_productions():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT * FROM Production
            """
        )

        rows = cursor.fetchall()

        productions = []

        for row in rows:

            productions.append({

                "production_id": row[0],
                "batch_id": row[1],
                "product_name": row[2],
                "planned_quantity": row[3],
                "produced_quantity": row[4],
                "status": row[5],
                "production_date": str(row[6])
            })

        cursor.close()
        conn.close()

        return jsonify(productions)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@production_bp.route("/update-production/<int:id>", methods=["PUT"])
def update_production(id):

    data = request.json

    status = data.get("status")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE Production
            SET status = ?
            WHERE production_id = ?
            """,
            (status, id)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Production Updated Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

@production_bp.route("/delete-production/<int:id>", methods=["DELETE"])
def delete_production(id):

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            DELETE FROM Production
            WHERE production_id = ?
            """,
            (id,)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Production Deleted Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
from flask import Blueprint, request, jsonify
from database.db import get_db_connection

workflow_bp = Blueprint("workflow", __name__)

# ADD WORKFLOW
@workflow_bp.route("/add-workflow", methods=["POST"])
def add_workflow():

    data = request.json

    batch_id = data.get("batch_id")
    product_name = data.get("product_name")
    department = data.get("department")
    current_stage = data.get("current_stage")
    status = data.get("status")
    quantity = data.get("quantity")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Workflow_Tracking
            (
                batch_id,
                product_name,
                department,
                current_stage,
                status,
                quantity
            )

            VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            batch_id,
            product_name,
            department,
            current_stage,
            status,
            quantity
        ))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Workflow Added Successfully"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# GET WORKFLOW
@workflow_bp.route("/workflows", methods=["GET"])
def get_workflows():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM Workflow_Tracking
        """)

        rows = cursor.fetchall()

        workflows = []

        for row in rows:

            workflows.append({
                "workflow_id": row[0],
                "batch_id": row[1],
                "product_name": row[2],
                "department": row[3],
                "current_stage": row[4],
                "status": row[5],
                "quantity": row[6]
            })

        cursor.close()
        conn.close()

        return jsonify(workflows)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@workflow_bp.route("/update-workflow/<int:id>", methods=["PUT"])
def update_workflow(id):

    data = request.json

    status = data.get("status")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE Workflow_Tracking
            SET status = ?
            WHERE workflow_id = ?
            """,
            (status, id)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Workflow Updated Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@workflow_bp.route("/delete-workflow/<int:id>", methods=["DELETE"])
def delete_workflow(id):

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            DELETE FROM Workflow_Tracking
            WHERE workflow_id = ?
            """,
            (id,)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Workflow Deleted Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@workflow_bp.route("/edit-workflow/<int:id>", methods=["PUT"])
def edit_workflow(id):

    data = request.json

    product_name = data.get("product_name")
    department = data.get("department")
    current_stage = data.get("current_stage")
    status = data.get("status")
    quantity = data.get("quantity")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE Workflow_Tracking
            SET
                product_name = ?,
                department = ?,
                current_stage = ?,
                status = ?,
                quantity = ?
            WHERE workflow_id = ?
            """,
            (
                product_name,
                department,
                current_stage,
                status,
                quantity,
                id
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Workflow Updated Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
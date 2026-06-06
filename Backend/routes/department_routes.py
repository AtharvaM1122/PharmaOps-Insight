from flask import Blueprint, request, jsonify
from database.db import get_db_connection

department_bp = Blueprint(
    "department",
    __name__
)

# ADD DEPARTMENT

@department_bp.route(
    "/add-department",
    methods=["POST"]
)
def add_department():

    data = request.json

    department_name = data.get(
        "department_name"
    )

    department_head = data.get(
        "department_head"
    )

    employee_count = data.get(
        "employee_count"
    )

    status = data.get(
        "status"
    )

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO Departments
            (
                department_name,
                department_head,
                employee_count,
                status
            )

            VALUES (?, ?, ?, ?)
            """,
            (
                department_name,
                department_head,
                employee_count,
                status
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({

            "message":
            "Department Added Successfully"

        }), 201

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500


# GET DEPARTMENTS

@department_bp.route(
    "/departments",
    methods=["GET"]
)
def get_departments():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT * FROM Departments
            """
        )

        rows = cursor.fetchall()

        departments = []

        for row in rows:

            departments.append({

                "department_id": row[0],
                "department_name": row[1],
                "department_head": row[2],
                "employee_count": row[3],
                "status": row[4]

            })

        cursor.close()
        conn.close()

        return jsonify(
            departments
        )

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500
    
@department_bp.route(
    "/update-department/<int:id>",
    methods=["PUT"]
)
def update_department(id):

    data = request.json

    status = data.get("status")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE Departments
            SET status = ?
            WHERE department_id = ?
            """,
            (status, id)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message":
            "Department Updated Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@department_bp.route(
    "/delete-department/<int:id>",
    methods=["DELETE"]
)
def delete_department(id):

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            DELETE FROM Departments
            WHERE department_id = ?
            """,
            (id,)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message":
            "Department Deleted Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
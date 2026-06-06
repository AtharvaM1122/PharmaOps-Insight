from flask import Blueprint, request, jsonify
from database.db import get_db_connection
import bcrypt

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    department = data.get("department")

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Users
            (name, email, password, department, role)
            VALUES (?, ?, ?, ?, ?)
        """,
        (
            name,
            email,
            hashed_password.decode("utf-8"),
            department,
            "user"
        ))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "User Registered Successfully"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    

#-------------------------------------------------------------

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM Users WHERE email = ?",
            (email,)
        )

        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user:

            stored_password = user[3]

            if bcrypt.checkpw(
                password.encode("utf-8"),
                stored_password.encode("utf-8")
            ):

                return jsonify({
                    "message": "Login Successful",
                    "name": user[1],
                    "email": user[2],
                    "department": user[4],
                    "role": user[5]
                }), 200

        return jsonify({
            "error": "Invalid Email or Password"
        }), 401

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
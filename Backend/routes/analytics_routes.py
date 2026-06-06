from flask import Blueprint, jsonify
from database.db import get_db_connection

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/dashboard-stats", methods=["GET"])
def dashboard_stats():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        # TOTAL WORKFLOWS
        cursor.execute("""
            SELECT COUNT(*)
            FROM Workflow_Tracking
        """)

        total_workflows = cursor.fetchone()[0]

        # PENDING WORKFLOWS
        cursor.execute("""
            SELECT COUNT(*)
            FROM Workflow_Tracking
            WHERE status = 'Pending'
        """)

        pending_workflows = cursor.fetchone()[0]

        # COMPLETED WORKFLOWS
        cursor.execute("""
            SELECT COUNT(*)
            FROM Workflow_Tracking
            WHERE status = 'Completed'
        """)

        completed_workflows = cursor.fetchone()[0]

        # RUNNING WORKFLOWS

        cursor.execute("""
            SELECT COUNT(*)
            FROM Workflow_Tracking
            WHERE status = 'Running'
        """)

        running_workflows = cursor.fetchone()[0]

        # DELAYED WORKFLOWS

        cursor.execute("""
            SELECT COUNT(*)
            FROM Workflow_Tracking
            WHERE status = 'Delayed'
        """)

        delayed_workflows = cursor.fetchone()[0]

        # HIGH PRIORITY TICKETS

        cursor.execute("""
            SELECT COUNT(*)
            FROM IT_Tickets
            WHERE priority = 'High'
        """)

        high_priority_tickets = cursor.fetchone()[0]

        # MOST ACTIVE DEPARTMENT

        cursor.execute("""
            SELECT TOP 1
                department,
                COUNT(*) AS total
            FROM Workflow_Tracking
            GROUP BY department
            ORDER BY total DESC
        """)

        most_active_department = cursor.fetchone()[0]

        # ACTIVE DEPARTMENTS
        cursor.execute("""
            SELECT COUNT(DISTINCT department)
            FROM Workflow_Tracking
        """)

        active_departments = cursor.fetchone()[0]

        cursor.close()
        conn.close()

        return jsonify({

            "total_workflows": total_workflows,

            "pending_workflows": pending_workflows,

            "running_workflows": running_workflows,

            "completed_workflows": completed_workflows,

            "delayed_workflows": delayed_workflows,

            "active_departments": active_departments,

            "high_priority_tickets":high_priority_tickets,

            "most_active_department":most_active_department
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


    
@analytics_bp.route("/department-stats", methods=["GET"])
def department_stats():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT department, COUNT(*)
            FROM Workflow_Tracking
            GROUP BY department
        """)

        rows = cursor.fetchall()

        data = []

        for row in rows:

            data.append({

                "department": row[0],
                "count": row[1]
            })

        cursor.close()
        conn.close()

        return jsonify(data)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@analytics_bp.route("/delayed-workflows", methods=["GET"])
def delayed_workflows():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""

            SELECT
                batch_id,
                product_name,
                department,
                status

            FROM Workflow_Tracking

            WHERE status = 'Delayed'

        """)

        rows = cursor.fetchall()

        delayed = []

        for row in rows:

            delayed.append({

                "batch_id": row[0],
                "product_name": row[1],
                "department": row[2],
                "status": row[3]
            })

        cursor.close()
        conn.close()

        return jsonify(delayed)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    

@analytics_bp.route("/ticket-stats", methods=["GET"])
def ticket_stats():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT COUNT(*)
            FROM IT_Tickets
        """)
        total_tickets = cursor.fetchone()[0]

        cursor.execute("""
            SELECT COUNT(*)
            FROM IT_Tickets
            WHERE status = 'Pending'
        """)
        pending_tickets = cursor.fetchone()[0]

        cursor.execute("""
            SELECT COUNT(*)
            FROM IT_Tickets
            WHERE status = 'Completed'
        """)
        completed_tickets = cursor.fetchone()[0]

        cursor.execute("""
            SELECT COUNT(*)
            FROM IT_Tickets
            WHERE priority = 'High'
        """)
        high_priority = cursor.fetchone()[0]

        cursor.close()
        conn.close()

        return jsonify({

            "total_tickets": total_tickets,
            "pending_tickets": pending_tickets,
            "completed_tickets": completed_tickets,
            "high_priority": high_priority

        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    

@analytics_bp.route("/ticket-priority-stats", methods=["GET"])
def ticket_priority_stats():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT priority, COUNT(*)
            FROM IT_Tickets
            GROUP BY priority
        """)

        rows = cursor.fetchall()

        data = []

        for row in rows:

            data.append({
                "priority": row[0],
                "count": row[1]
            })

        cursor.close()
        conn.close()

        return jsonify(data)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

@analytics_bp.route(
    "/department-workload",
    methods=["GET"]
)
def department_workload():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                department,
                COUNT(*)
            FROM Workflow_Tracking
            GROUP BY department
        """)

        rows = cursor.fetchall()

        data = []

        for row in rows:

            data.append({

                "department": row[0],
                "count": row[1]

            })

        cursor.close()
        conn.close()

        return jsonify(data)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@analytics_bp.route(
    "/production-trend",
    methods=["GET"]
)
def production_trend():

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                production_date,
                SUM(produced_quantity)
            FROM Production
            GROUP BY production_date
            ORDER BY production_date
        """)

        rows = cursor.fetchall()

        data = []

        for row in rows:

            data.append({

                "date": str(row[0]),
                "quantity": row[1]

            })

        cursor.close()
        conn.close()

        return jsonify(data)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
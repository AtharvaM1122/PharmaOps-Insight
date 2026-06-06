from flask import Flask
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.workflow_routes import workflow_bp
from routes.analytics_routes import analytics_bp
from routes.it_ticket_routes import ticket_bp
from routes.production_routes import production_bp
from routes.department_routes import department_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(workflow_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(ticket_bp)
app.register_blueprint(production_bp)
app.register_blueprint(department_bp)

@app.route("/")
def home():

    return {
        "message": "Backend Running"
    }

if __name__ == "__main__":
    app.run(debug=True)
from app import create_app,db
from waitress import serve
from flask_migrate import Migrate


app = create_app()


migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)



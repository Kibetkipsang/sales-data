from flask import Flask
from .config import config
from .extensions import db, migrate
from .routes.upload_routes import upload_bp
from .models import sales


def create_app():
    app = Flask(__name__)

    # load configurations settins from config
    app.config.from_object(config)
    # initialise flask extensions (sqlalchemy and migrate)

    db.init_app(app)
    migrate.init_app(app, db)

    # register blueprints
    app.register_blueprint(upload_bp, url_prefix='/api')

    return app
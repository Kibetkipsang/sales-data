
from flask import Flask
from .config import Config
from .extensions import db, migrate, jwt, cors
from .routes.upload_routes import upload_bp
from .routes.auth_routes import auth_bp       
from .routes.root import root_bp   
from .routes.analytics_routes import analytics_bp



# Import models so they are registered with SQLAlchemy
from .models.sales import Sales
from .models.user import User                 

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    cors.init_app(app) 
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register routes
    app.register_blueprint(upload_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(root_bp)
    app.register_blueprint(analytics_bp)

    return app

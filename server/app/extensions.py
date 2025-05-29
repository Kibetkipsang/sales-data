from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# instanciate migrate and sql alchemy

db = SQLAlchemy()
migrate = Migrate()
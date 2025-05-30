import os


class Config:

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres:salespassword@localhost/sales_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # define folder for uploaded files
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "salespassword")


config = Config()
import os


class config:

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres:salespassword@localhost/sales_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # define folder for uploaded files
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
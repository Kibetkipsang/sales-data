from ..extensions import db


class Sales(db.Model):
    __tablename__ = "sales"


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    product = db.Column(db.String(100), nullable=False)
    region = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    revenue = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"< Sale {self.product} on {self.date}>"
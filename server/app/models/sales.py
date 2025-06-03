from ..extensions import db

class Sales(db.Model):
    __tablename__ = "sales"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=True)  
    product = db.Column(db.String(100), nullable=True)  
    region = db.Column(db.String(50), nullable=True) 
    quantity = db.Column(db.Integer, nullable=True)  
    revenue = db.Column(db.Float, nullable=True)  
    payment_method = db.Column(db.String(50), nullable=True) 
    gender = db.Column(db.String(20), nullable=True)  
    age = db.Column(db.Integer, nullable=True) 

    def __repr__(self):
        return f"<Sale {self.product} on {self.date}>"

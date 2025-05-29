# this is the file upload endpoint
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import pandas as pd
import datetime as datetime

from ..extensions import db
from ..models.sales import Sales
from ..services.analysis_service import clean_sales_data

upload_bp = Blueprint('upload_bp', __name__)

# allowed file extensions
ALLOWED_EXTENSIONS = {'csv', 'xls', 'xlsx'}

# Check if uploaded file has the allowed file extensions
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Define your routes below this
@upload_bp.route('/upload-sales', methods=['POST'])
@jwt_required()
def upload_sales():
    
    user_id = get_jwt_identity()

    if 'file' not in request.files:
        return jsonify({"error" : "No file provided!"}), 400
    
    file = request.files["file"]

    if file.filename == '':
        return jsonify({"error" : "No file selected!"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join("uploads", filename)
        os.makedirs("uploads", exist_ok=True)
        file.save(filepath)

        try:
        # read files into pandas data frame
            df = pd.read_csv(filepath) if filename.endswith(".csv") else pd.read_excel(filepath)
        # clean and validate the data
            df = clean_sales_data(df)

        # convert df rows into sales object
            for _, row in df.iterrows():
                sale = Sales(
                    user_id = user_id,
                    date = pd.to_datetime(row["date"]).date(),
                    product = row["product"],
                    region = row["region"],
                    quantity = int(row["quantity"]),
                    revenue = float(row["revenue"])
                )
                db.session.add(sale)
            db.session.commit()

            return jsonify({"message": "Sales data uploaded and processed successfully"}), 201
    
        except Exception as e:
            db.session.rollback()
            return jsonify({"error" : str(e)}),500
    
    else:
        return jsonify({"error": "Unsupported file type!"}), 400
    

# SALES SUMMARY

@upload_bp.route("/summary", methods=["GET"])
@jwt_required()
def get_summary():

    user_id = get_jwt_identity()

    try:
        sales = Sales.query.filter_by(user_id=user_id).all()

        if not sales:
            return jsonify({"message" : "No sale data found"}), 404
        
        total_oders = len(sales)
        total_quantity = sum(s.quantity for s in sales)
        total_revenue = sum(s.revenue for s in sales)
        avg_order_value = total_revenue/total_oders if total_oders > 0 else 0

        return jsonify({
            "total_orders" : total_oders,
            "total_quantity" : total_quantity,
            "total_revenue" : round(total_revenue, 2),
            "avg_order_value" : round(avg_order_value, 2)
        }), 200
    
    except Exception as e:
        return jsonify({"error" : str(e)}), 500
    
# SALES BY MONTH
@upload_bp.route("/sales-by-month", methods=["GET"])
@jwt_required
def get_sales_by_month():
    user_id = get_jwt_identity()

    try:

        sales = Sales.query.filter_by(user_id=user_id).all()

        if not sales:
            return jsonify({"Message" : "No sales data available!"}), 404
        
        # convert to dataframe for easier aggregation

        import pandas as pd
        data = [{
            "date" : sale.date,
            "revenue" : sale.revenue
        } for sale in sales]

        df = pd.DataFrame(data)

        # extract the month-year from date
        df['month'] = df['date'].dt.to_period('M')
        # Group by month and sum revenue
        summary = df.groupby('month').sum(numeric_only=True).reset_index()
        summary['month'] = summary['month'].astype(str)

        return jsonify(summary.to_dict(orient="records")), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# SALES BY CATEGORY

@upload_bp.route("/sales-by-category", methods=["GET"])
@jwt_required()
def sales_by_category():
    user_id = get_jwt_identity()

    try:
        
        sales = Sales.query.filter_by(user_id=user_id).all()

        if not sales:
            return jsonify({"message": "No sales data available"}), 404

        # Use pandas to aggregate
        import pandas as pd

        data = [{
            "product": sale.product,
            "revenue": sale.revenue
        } for sale in sales]

        df = pd.DataFrame(data)

        # Group by product category and sum revenue
        summary = df.groupby('product').sum(numeric_only=True).reset_index()
        summary = summary.rename(columns={"product": "category"})

        return jsonify(summary.to_dict(orient="records")), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# SALES BY REGION/COUNTRY
@upload_bp.route("/sales-by-region", methods=["GET"])
@jwt_required()
def sales_by_region():
    user_id = get_jwt_identity()

    try:

        sales = Sales.query.filter_by(user_id=user_id).all()

        if not sales:
            return jsonify({"message": "No sales data available"}), 404

       
        import pandas as pd

        data = [{
            "region": sale.region,
            "revenue": sale.revenue
        } for sale in sales]

        df = pd.DataFrame(data)

        # Group by region and sum revenue
        summary = df.groupby('region').sum(numeric_only=True).reset_index()

        return jsonify(summary.to_dict(orient="records")), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@upload_bp.route("/sales-by-payment-method", methods=["GET"])
@jwt_required()
def sales_by_payment_method():
    user_id = get_jwt_identity()

    try:
    
        sales = Sales.query.filter_by(user_id=user_id).all()

        if not sales:
            return jsonify({"message": "No sales data available"}), 404

    
        import pandas as pd

        data = [{
            "payment_method": sale.payment_method,
            "revenue": sale.revenue
        } for sale in sales]

        df = pd.DataFrame(data)

        # Group by payment method
        summary = df.groupby("payment_method").sum(numeric_only=True).reset_index()

        return jsonify(summary.to_dict(orient="records")), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# SALES BY GENDER
@upload_bp.route("/sales-by-gender", methods=["GET"])
@jwt_required()
def sales_by_gender():
    user_id = get_jwt_identity()

    try:
        # Get sales data
        sales = Sales.query.filter_by(user_id=user_id).all()

        if not sales:
            return jsonify({"message": "No sales data found"}), 404

        # Convert to DataFrame
        import pandas as pd

        data = [{
            "gender": sale.gender,
            "revenue": sale.revenue
        } for sale in sales]

        df = pd.DataFrame(data)

        # Group by gender
        summary = df.groupby("gender").sum(numeric_only=True).reset_index()

        return jsonify(summary.to_dict(orient="records")), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@upload_bp.route("/sales-by-age-group", methods=["GET"])
@jwt_required()
def sales_by_age_group():
    user_id = get_jwt_identity()

    try:
        sales = Sales.query.filter_by(user_id=user_id).all()

        if not sales:
            return jsonify({"message": "No sales data found"}), 404

        import pandas as pd

        # Create DataFrame
        data = [{"age": s.age, "gender": s.gender, "revenue": s.revenue} for s in sales]
        df = pd.DataFrame(data)

        # Create age brackets
        bins = [0, 17, 24, 34, 44, 54, 64, 100]
        labels = ["<18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
        df["age_group"] = pd.cut(df["age"], bins=bins, labels=labels, right=False)

        # Group by age_group and gender
        summary = df.groupby(["age_group", "gender"]).sum(numeric_only=True).reset_index()

        return jsonify(summary.to_dict(orient="records")), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# DOWNLOAD THE SUMMARY
# Download all user sales as a CSV file
@upload_bp.route("/download-report", methods=["GET"])
@jwt_required()
def download_report():
    user_id = get_jwt_identity()

    try:
        sales = Sales.query.filter_by(user_id=user_id).all()

        if not sales:
            return jsonify({"message": "No sales data found"}), 404

        import pandas as pd
        from flask import make_response

        data = [{
            "date": s.date,
            "product": s.product,
            "region": s.region,
            "quantity": s.quantity,
            "revenue": s.revenue,
            "payment_method": s.payment_method,
            "gender": s.gender,
            "age": s.age
        } for s in sales]

        df = pd.DataFrame(data)

        # Convert to CSV
        response = make_response(df.to_csv(index=False))
        response.headers["Content-Disposition"] = "attachment; filename=sales_report.csv"
        response.headers["Content-Type"] = "text/csv"

        return response

    except Exception as e:
        return jsonify({"error": str(e)}), 500




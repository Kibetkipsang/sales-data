# uploaded file cleaning logic
# Clean and validate uploaded sales data.
# Expects columns: date, product, region, quantity, revenue
# Returns cleaned DataFrame or raises error if invalid

import pandas as pd

def clean_sales_data(df):

    expected_columns = {'date', 'product', 'region', 'quantity', 'revenue'}

    if not expected_columns.issubset(df.columns.str.lower()):
        raise ValueError("Missing required columns in uploaded file")

    df.columns = [col.lower for col in df.columns]
    # drop the rows with missing data
    df.dropna(subset=["date", "product", "region", "quantity", "revenue"], inplace=True)

    # validate data types
    df['quantity'] = pd.to_numeric(df['quantity'], errors='coerce')
    df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')
    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    df.dropna(subset=['quantity', 'revenue', 'date'], inplace=True)

    return df
from flask import Blueprint, jsonify

root_bp = Blueprint("root_bp", __name__)

@root_bp.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Sales Data API!"})
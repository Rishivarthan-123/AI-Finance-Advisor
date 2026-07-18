from flask import jsonify


def success_response(
    message="Success",
    data=None,
    status_code=200
):
    """
    Standard success response.

    Example:
    return success_response(
        message="Transaction Added",
        data=result,
        status_code=201
    )
    """

    response = {
        "success": True,
        "message": message,
        "data": data
    }

    return jsonify(response), status_code


def error_response(
    message="Something went wrong",
    errors=None,
    status_code=400
):
    """
    Standard error response.

    Example:
    return error_response(
        message="Invalid Credentials",
        status_code=401
    )
    """

    response = {
        "success": False,
        "message": message,
        "errors": errors
    }

    return jsonify(response), status_code


def validation_error(errors):
    """
    Validation error response.

    Example:
    return validation_error({
        "email":"Invalid Email",
        "password":"Password required"
    })
    """

    response = {
        "success": False,
        "message": "Validation Failed",
        "errors": errors
    }

    return jsonify(response), 422


def not_found_response(resource="Resource"):
    """
    Resource not found response.
    """

    response = {
        "success": False,
        "message": f"{resource} not found.",
        "errors": None
    }

    return jsonify(response), 404


def unauthorized_response():
    """
    Unauthorized response.
    """

    response = {
        "success": False,
        "message": "Unauthorized access.",
        "errors": None
    }

    return jsonify(response), 401


def forbidden_response():
    """
    Forbidden response.
    """

    response = {
        "success": False,
        "message": "Access forbidden.",
        "errors": None
    }

    return jsonify(response), 403


def server_error_response(
    message="Internal Server Error"
):
    """
    Internal server error response.
    """

    response = {
        "success": False,
        "message": message,
        "errors": None
    }

    return jsonify(response), 500
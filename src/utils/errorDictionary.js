import { MAX_MOCK_ITEMS } from "./constants.js";

export const ERROR_CODES = {
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    INVALID_USER_ROLE: "INVALID_USER_ROLE",
    FORBIDDEN_CREATE_ADMIN_ROLE: "FORBIDDEN_CREATE_ADMIN_ROLE",
    USER_EXISTS_WITH_EMAIL: "USER_EXISTS_WITH_EMAIL",
    INVALID_ORDER_API_KEY: "INVALID_ORDER_API_KEY",
    ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
    CUSTOMER_NOT_FOUND: "CUSTOMER_NOT_FOUND",
    ORDER_MUST_HAVE_ONE_ITEM: "ORDER_MUST_HAVE_ONE_ITEM",
    DELIVERY_NOT_FOUND: "DELIVERY_NOT_FOUND",
    DRIVER_NOT_FOUND: "DRIVER_NOT_FOUND",
    USER_IS_NOT_DRIVER: "USER_IS_NOT_DRIVER",
    INVALID_MOCK_QUANTITY: "INVALID_MOCK_QUANTITY",
    INVALID_MOCK_QUANTITY_MAX: "INVALID_MOCK_QUANTITY_MAX",
    STORAGE_NOT_FOUND: "STORAGE_NOT_FOUND",
    OWNER_NOT_FOUND: "OWNER_NOT_FOUND",
    OWNER_MUST_BE_STORE_ROLE: "OWNER_MUST_BE_STORE_ROLE"
}

export const ERROR_DICTIONARY = {
    "INTERNAL_SERVER_ERROR": {
        statusCode: 500,
        message: "Error interno en el servidor"
    },
    "ROUTE_NOT_FOUND": {
        statusCode: 404,
        message: "Ruta no encontrada"
    },
    "USER_NOT_FOUND": {
        statusCode: 404,
        message: "Usuario no encontrado"
    },
    "VALIDATION_ERROR": {
        statusCode: 400,
        message: "Faltan campos obligatorios"
    },
    "INVALID_USER_ROLE": {
        statusCode: 400,
        message: "Rol inválido"
    },
    "FORBIDDEN_CREATE_ADMIN_ROLE": {
        statusCode: 403,
        message: "No se puede crear un usuario admin"
    },
    "USER_EXISTS_WITH_EMAIL": {
        statusCode: 400,
        message: "Ya existe un usuario con ese email"
    },
    "INVALID_ORDER_API_KEY": {
        statusCode: 500,
        message: "Configuración inválida: falta API Key"
    },
    "ORDER_NOT_FOUND": {
        statusCode: 404,
        message: "Pedido no encontrado"
    },
    "CUSTOMER_NOT_FOUND": {
        statusCode: 404,
        message: "El cliente especificado no existe"
    },
    "ORDER_MUST_HAVE_ONE_ITEM": {
        statusCode: 400,
        message: "El pedido debe tener al menos un item"
    },
    "DELIVERY_NOT_FOUND": {
        statusCode: 404,
        message: "Entrega no encontrada"
    },
    "DRIVER_NOT_FOUND": {
        statusCode: 404,
        message: "Repartidor no encontrado"
    },
    "USER_IS_NOT_DRIVER": {
        statusCode: 400,
        message: "El usuario no es driver"
    },
    "INVALID_MOCK_QUANTITY": {
        statusCode: 400,
        message: "qty debe ser un número entero mayor a 0"
    },
    "INVALID_MOCK_QUANTITY_MAX": {
        statusCode: 400,
        message: `qty no puede superar ${MAX_MOCK_ITEMS}`
    },
    "STORAGE_NOT_FOUND": {
        statusCode: 404,
        message: "Comercio no encontrado"
    },
    "OWNER_NOT_FOUND": {
        statusCode: 404,
        message: "Propietario no encontrado"
    },
    "OWNER_MUST_BE_STORE_ROLE": {
        statusCode: 400,
        message: "El propietario debe tener rol store"
    }
}
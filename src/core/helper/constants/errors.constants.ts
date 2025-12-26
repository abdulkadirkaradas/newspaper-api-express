export const ERROR_HANDLER = {
  PRISMA_ERROR: {
    P2002: {
      code: "P2002",
      message: "Duplicate value error, unique constraint violated",
    },
    P2003: {
      code: "P2003",
      message: "Foreign key constraint violation",
    },
    P2025: {
      code: "P2025",
      message: "Record not found",
    },
    DEFAULT_ERROR_MESSAGE: "Prisma request error",
  },
  ZOD_ERROR: {
    validationError: "Validation error",
  },
  INTERNAL_SERVER_ERROR: "Internal server error",
} as const;

export const GENERIC_FILE_UPLOAD_ERRORS = {
  unAllowedFileFormat: "Only JPG, PNG, and GIF formats are allowed!",
} as const;

export const MIDDLEWARE_ERRORS = {
  AUTH: {
    UNAUTHORIZED_ACTION: "Unauthorized action",
    RENEW_REFRESH_TOKEN:
      "Please provide the refresh token to renew the access token",
    INVALID_REFRESH_TOKEN: "Invalid or expired refresh token",
  },
  ROLE: {
    UNAUTHORIZED_REQUEST: "Unauthorized request",
    USER_NOT_AUTHORIZED: "Current user are not granted for this operation",
  },
} as const;

class PrismaErrors {

    P2000: PrismaErrors.ErrorInstance = { message: "Too long", status: 400 }
    P2001: PrismaErrors.ErrorInstance = { message: "Not found", status: 404 }
    P2002: PrismaErrors.ErrorInstance = { message: "Already exists", status: 409 }
    P2003: PrismaErrors.ErrorInstance = { message: "FK failed", status: 400 }
    P2004: PrismaErrors.ErrorInstance = { message: "Constraint failed", status: 400 }

    P2005: PrismaErrors.ErrorInstance = { message: "Invalid type", status: 400 }
    P2006: PrismaErrors.ErrorInstance = { message: "Invalid value", status: 400 }
    P2007: PrismaErrors.ErrorInstance = { message: "Validation error", status: 400 }

    P2011: PrismaErrors.ErrorInstance = { message: "Null violation", status: 400 }
    P2012: PrismaErrors.ErrorInstance = { message: "Missing value", status: 400 }
    P2015: PrismaErrors.ErrorInstance = { message: "Relation not found", status: 404 }
    P2018: PrismaErrors.ErrorInstance = { message: "Required records missing", status: 404 }
    P2025: PrismaErrors.ErrorInstance = { message: "Dependent records not found",status: 404 }

    P1000: PrismaErrors.ErrorInstance = { message: "Auth failed", status: 401 }
    P1001: PrismaErrors.ErrorInstance = { message: "DB unreachable", status: 503 }
    P1008: PrismaErrors.ErrorInstance = { message: "Timeout", status: 504 }
    P1017: PrismaErrors.ErrorInstance = { message: "Connection closed", status: 503 }

}

namespace PrismaErrors {
    export type ErrorInstance = { message: string, status: number }
}

export default PrismaErrors
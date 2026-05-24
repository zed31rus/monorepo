class PrismaErrors {
	P2000: PrismaErrorInstance = { message: 'Too long', status: 400 };
	P2001: PrismaErrorInstance = { message: 'Not found', status: 404 };
	P2002: PrismaErrorInstance = { message: 'Already exists', status: 409 };
	P2003: PrismaErrorInstance = { message: 'FK failed', status: 400 };
	P2004: PrismaErrorInstance = { message: 'Constraint failed', status: 400 };

	P2005: PrismaErrorInstance = { message: 'Invalid type', status: 400 };
	P2006: PrismaErrorInstance = { message: 'Invalid value', status: 400 };
	P2007: PrismaErrorInstance = { message: 'Validation error', status: 400 };

	P2011: PrismaErrorInstance = { message: 'Null violation', status: 400 };
	P2012: PrismaErrorInstance = { message: 'Missing value', status: 400 };
	P2015: PrismaErrorInstance = { message: 'Relation not found', status: 404 };
	P2018: PrismaErrorInstance = { message: 'Required records missing', status: 404 };
	P2025: PrismaErrorInstance = { message: 'Dependent records not found', status: 404 };

	P1000: PrismaErrorInstance = { message: 'Auth failed', status: 401 };
	P1001: PrismaErrorInstance = { message: 'DB unreachable', status: 503 };
	P1008: PrismaErrorInstance = { message: 'Timeout', status: 504 };
	P1017: PrismaErrorInstance = { message: 'Connection closed', status: 503 };
}

export type PrismaErrorInstance = { message: string; status: number };

export default PrismaErrors;

export type AuditLogEventType =
	| "packet_generated"
	| "data_update"
	| "signals_changed"
	| "packet_reviewed"
	| "packet_approved"
	| "override_recorded"
	| "trade_executed";

export interface AuditLogMetadata {
	[key: string]: unknown;
}

export interface AuditLog {
	id?: number;
	event_type: AuditLogEventType;
	description: string;
	ticker?: string | null;
	packet_month?: string | null;
	metadata?: AuditLogMetadata;
	notes?: string | null;
	timestamp?: string;
	user?: string;
}

/**
 * Validates an AuditLog object
 */
export function validateAuditLog(log: unknown): log is AuditLog {
	if (typeof log !== "object" || log === null) {
		return false;
	}

	const auditLog = log as Partial<AuditLog>;

	if (!auditLog.event_type || typeof auditLog.event_type !== "string") {
		return false;
	}

	const validEventTypes: AuditLogEventType[] = [
		"packet_generated",
		"data_update",
		"signals_changed",
		"packet_reviewed",
		"packet_approved",
		"override_recorded",
		"trade_executed",
	];

	if (!validEventTypes.includes(auditLog.event_type)) {
		return false;
	}

	if (!auditLog.description || typeof auditLog.description !== "string") {
		return false;
	}

	if (auditLog.ticker !== undefined && auditLog.ticker !== null && typeof auditLog.ticker !== "string") {
		return false;
	}

	if (auditLog.packet_month !== undefined && auditLog.packet_month !== null && typeof auditLog.packet_month !== "string") {
		return false;
	}

	if (auditLog.metadata !== undefined && (typeof auditLog.metadata !== "object" || auditLog.metadata === null)) {
		return false;
	}

	if (auditLog.notes !== undefined && auditLog.notes !== null && typeof auditLog.notes !== "string") {
		return false;
	}

	return true;
}

/**
 * Creates a new AuditLog entry
 */
export function createAuditLog(
	eventType: AuditLogEventType,
	description: string,
	options?: Partial<Omit<AuditLog, "event_type" | "description">>
): AuditLog {
	const log: AuditLog = {
		event_type: eventType,
		description,
		timestamp: options?.timestamp || new Date().toISOString(),
		user: options?.user || "System",
		...options,
	};

	if (!validateAuditLog(log)) {
		throw new Error("Invalid AuditLog data");
	}

	return log;
}

/**
 * Formats an AuditLog for display
 */
export function formatAuditLog(log: AuditLog): string {
	const parts = [log.description];
	if (log.ticker) {
		parts.push(`(${log.ticker})`);
	}
	if (log.packet_month) {
		parts.push(`[${log.packet_month}]`);
	}
	return parts.join(" ");
}

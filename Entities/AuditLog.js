{
	"name": "AuditLog",
		"type": "object",
			"properties": {
		"event_type": {
			"type": "string",
				"enum": [
					"packet_generated",
					"data_update",
					"signals_changed",
					"packet_reviewed",
					"packet_approved",
					"override_recorded",
					"trade_executed"
				]
		},
		"description": {
			"type": "string"
		},
		"ticker": {
			"type": "string"
		},
		"packet_month": {
			"type": "string"
		},
		"metadata": {
			"type": "object"
		},
		"notes": {
			"type": "string"
		}
	},
	"required": [
		"event_type",
		"description"
	]
}
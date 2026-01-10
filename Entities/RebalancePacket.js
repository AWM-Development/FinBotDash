{
	"name": "RebalancePacket",
		"type": "object",
			"properties": {
		"month": {
			"type": "string",
				"description": "Packet month (e.g., January 2026)"
		},
		"strategy_id": {
			"type": "string"
		},
		"status": {
			"type": "string",
				"enum": [
					"pending",
					"reviewed",
					"approved",
					"executed"
				],
					"default": "pending"
		},
		"target_allocations": {
			"type": "array",
				"items": {
				"type": "object",
					"properties": {
					"ticker": {
						"type": "string"
					},
					"target_weight": {
						"type": "number"
					},
					"current_weight": {
						"type": "number"
					}
				}
			}
		},
		"proposed_trades": {
			"type": "array",
				"items": {
				"type": "object",
					"properties": {
					"action": {
						"type": "string"
					},
					"ticker": {
						"type": "string"
					},
					"amount": {
						"type": "number"
					},
					"shares": {
						"type": "number"
					},
					"reason": {
						"type": "string"
					},
					"notes": {
						"type": "string"
					}
				}
			}
		},
		"tax_notes": {
			"type": "object"
		},
		"ai_explanation": {
			"type": "object"
		},
		"regime": {
			"type": "string"
		},
		"risk_posture": {
			"type": "string"
		},
		"reviewed_at": {
			"type": "string",
				"format": "date-time"
		},
		"approved_at": {
			"type": "string",
				"format": "date-time"
		},
		"reviewer_notes": {
			"type": "string"
		}
	},
	"required": [
		"month"
	]
}
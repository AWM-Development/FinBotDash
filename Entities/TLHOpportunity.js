{
	"name": "TLHOpportunity",
		"type": "object",
			"properties": {
		"ticker": {
			"type": "string"
		},
		"unrealized_loss": {
			"type": "number"
		},
		"replacement_ticker": {
			"type": "string"
		},
		"wash_sale_end_date": {
			"type": "string",
				"format": "date"
		},
		"status": {
			"type": "string",
				"enum": [
					"available",
					"added_to_packet",
					"executed",
					"expired"
				],
					"default": "available"
		},
		"notes": {
			"type": "string"
		}
	},
	"required": [
		"ticker",
		"unrealized_loss"
	]
}
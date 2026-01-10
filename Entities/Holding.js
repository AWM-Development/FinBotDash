{
	"name": "Holding",
		"type": "object",
			"properties": {
		"ticker": {
			"type": "string"
		},
		"shares": {
			"type": "number"
		},
		"current_value": {
			"type": "number"
		},
		"cost_basis": {
			"type": "number"
		},
		"unrealized_gain_loss": {
			"type": "number"
		},
		"asset_class": {
			"type": "string",
				"enum": [
					"equity",
					"bonds",
					"real_assets",
					"cash"
				]
		},
		"purchase_date": {
			"type": "string",
				"format": "date"
		}
	},
	"required": [
		"ticker",
		"shares"
	]
}
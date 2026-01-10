{
	"name": "Strategy",
		"type": "object",
			"properties": {
		"name": {
			"type": "string",
				"description": "Strategy name"
		},
		"version": {
			"type": "string"
		},
		"description": {
			"type": "string"
		},
		"is_baseline": {
			"type": "boolean",
				"default": false
		},
		"settings": {
			"type": "object",
				"description": "Strategy configuration settings"
		},
		"status": {
			"type": "string",
				"enum": [
					"active",
					"paper",
					"archived"
				],
					"default": "active"
		}
	},
	"required": [
		"name"
	]
}
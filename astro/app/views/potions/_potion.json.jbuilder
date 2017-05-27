json.extract! potion, :id, :bonus_power.integer, :bonus_health.integer, :owner.string, :used.integer, :created_at, :updated_at
json.url potion_url(potion, format: :json)

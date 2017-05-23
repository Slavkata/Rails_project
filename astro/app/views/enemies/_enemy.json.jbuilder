json.extract! enemy, :id, :name.string, :power.integer, :health.integer, :created_at, :updated_at
json.url enemy_url(enemy, format: :json)

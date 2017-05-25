json.extract! gadget, :id, :name.string, :owner.string, :bonus_health.integer, :bonus_power.integer, :equipped.integer, :created_at, :updated_at
json.url gadget_url(gadget, format: :json)

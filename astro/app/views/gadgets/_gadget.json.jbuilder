json.extract! gadget, :id, :name.string, :bonus_health.integer, :bonus_power.integer, :owner.string, :created_at, :updated_at
json.url gadget_url(gadget, format: :json)

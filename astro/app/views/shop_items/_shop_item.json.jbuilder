json.extract! shop_item, :id, :name, :type, :mainstat, :secondarystat, :mainstat_name, :secondarystat_name, :price, :created_at, :updated_at
json.url shop_item_url(shop_item, format: :json)

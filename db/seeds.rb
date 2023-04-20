User.create(email: "demo@example.net", password: "123123")

json = ActiveSupport::JSON.decode(File.read('db/seeds/activities.json'))
json.each do |record|
  Activity.create!(record)
end
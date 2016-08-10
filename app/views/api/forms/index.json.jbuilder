json.array! @forms do |form|
  json.title form.title
  json.created_at form.created_at.to_s.split(" ")[0]
  json.id form.id
end

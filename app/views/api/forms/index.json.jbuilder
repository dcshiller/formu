json.array! @currentUser.forms do |form|
  json.title form.title
  json.created_at form.created_at.to_s.split(" ")[0]
  json.id form.id
  json.responses do json.array! form.responses do |response|
      json.id response.id
      json.created_at response.created_at.to_s.split(" ")[0]
    end
  end
end

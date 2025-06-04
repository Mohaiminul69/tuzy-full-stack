FactoryBot.define do
  factory :destination do
    name { "Paris" }
    description { "City of Light" }
    short_description { "Romantic city" }
    price { "1200" }
    img_src { "paris.jpg" }
  end
end

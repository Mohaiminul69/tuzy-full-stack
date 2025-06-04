FactoryBot.define do
  factory :package do
    name { 'Adventure Package' }
    price { '2500' }
    description { 'An exciting and adventurous travel experience' }
    short_description { 'Adventure travel' }
    img_src { 'adventure.jpg' }
  end
end

FactoryBot.define do
  factory :gallary_image do
    sequence(:img_src) { |n| "image#{n}.jpg" }
  end
end

FactoryBot.define do
  factory :review do
    rating { 4 }
    comment { "Great experience" }
    association :user

    trait :for_destination do
      association :destination
    end

    trait :for_package do
      association :package
    end
  end
end

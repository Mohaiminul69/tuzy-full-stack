FactoryBot.define do
  factory :booking do
    user
    phone_number { "1234567890" }
    address { "Mirpur Dhaka" }
    credit_card_number { "4111111111111111" }
    booking_date { "2025-06-05" }

    trait :with_destination do
      destination
    end

    trait :with_package do
      package
    end
  end
end

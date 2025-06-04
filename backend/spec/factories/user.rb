FactoryBot.define do
  factory :user do
    first_name { "Dew" }
    last_name  { "Haven" }
    date_of_birth { "1995-02-02" }
    img_src { "abc.jpg" }
    email { "dew@gmail.com" }
    password { "asd123" }
    password_confirmation { "asd123" }
  end
end

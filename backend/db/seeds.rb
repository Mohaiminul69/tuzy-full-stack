# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


destinations = [
  {
    name: "London",
    price: "300",
    short_description: "Visit United Kingdom with Tuzy.",
    description: "London is the capital of United Kingdom. It is very famous for the London Bridge, Ferris wheel, and Big Ben",
    img_src: "https://i.ibb.co/zmHw3d2/pexels-nikita-khandelwal-800532.jpg"
  },
  {
    name: "Venice",
    price: "100",
    short_description: "Visit Venice the beautiful city of Italy.",
    description: "Venice is beautiful city of Italy famous for its river canals and boat rides",
    img_src: "https://i.ibb.co/6XD8HKF/pexels-pixabay-258196.jpg"
  },
  {
    name: "Delhi",
    price: "150",
    short_description: "Visit Taj Mahal the beautiful monument of India.",
    description: "Delhi is the capital of India. It is mainly famous for the Taj Mahal",
    img_src: "https://i.ibb.co/JryB98D/15-155705-taj-mahal-india-travel-destinations-architecture-taj-mahal.jpg"
  },
  {
    name: "Rome",
    price: "180",
    short_description: "Visit Rome the beautiful city of Italy.",
    description: "The Metropolitan City of Rome, is known for its stunning architecture, with the Colleseum, Pantheon, and Trevi Fountain as the main attractions.",
    img_src: "https://i.ibb.co/StjJyYg/pexels-davi-pimentel-2064827.jpg"
  },
  {
    name: "Bali",
    price: "300",
    short_description: "Visit Bali the beautiful island of Indonesia.",
    description: "Bali Indonesia. Also known as the Land of the Gods is famous for its stunning beaches and magical temples, Bali has virtually every kind of natural beauty.",
    img_src: "https://i.ibb.co/86prszs/pexels-timur-kozmenko-2474689.jpg"
  },
  {
    name: "Saint Martin",
    price: "100",
    short_description: "Visit Saint Martin the beautiful island of Bangladesh.",
    description: "Saint Martin is one of the most beautiful visiting places of Bangladesh. It has fresh blue water with corals, beautiful sandy beaches, a lot of coconut trees",
    img_src: "https://i.ibb.co/jR5dSWj/ashraful-pranto-cnbw-Gzh-Y-jk-unsplash.jpg"
  },
  {
    name: "Cox's Bazar",
    price: "100",
    short_description: "Visit Cox's Bazar the Longest beach of the world.",
    description: "Cox's Bazar is famous mostly for its long natural sandy beach. It is located 150 km (93 mi) south of the city of Chittagong. Cox's Bazar is also known by the name Panowa.",
    img_src: "https://i.ibb.co/q76gYk4/ashraful-pranto-s-Z90-UEv0-CHw-unsplash.jpg"
  }
]

destinations.each do |destination|
  Destination.create!(destination)
end

puts "✅ Seeded #{Destination.count} destinations"


gallary_images = [
  {
    "key": 1,
    "img": "https://i.ibb.co/jR5dSWj/ashraful-pranto-cnbw-Gzh-Y-jk-unsplash.jpg"
  },
  {
    "key": 2,
    "img": "https://i.ibb.co/zmHw3d2/pexels-nikita-khandelwal-800532.jpg"
  },
  {
    "key": 3,
    "img": "https://i.ibb.co/86prszs/pexels-timur-kozmenko-2474689.jpg"
  },
  {
    "key": 4,
    "img": "https://i.ibb.co/tpKVHPN/pexels-artem-beliaikin-853199.jpg"
  },
  {
    "key": 5,
    "img": "https://i.ibb.co/6XD8HKF/pexels-pixabay-258196.jpg"
  },
  {
    "key": 6,
    "img": "https://i.ibb.co/JryB98D/15-155705-taj-mahal-india-travel-destinations-architecture-taj-mahal.jpg"
  },
  {
    "key": 7,
    "img": "https://i.ibb.co/StjJyYg/pexels-davi-pimentel-2064827.jpg"
  },
  {
    "key": 8,
    "img": "https://i.ibb.co/q14zSQh/pexels-amine-m-siouri-2055556.jpg"
  }
]

gallary_images.each do |img|
  GallaryImage.create!(img_src: img[:img])
end

puts "✅ Seeded #{GallaryImage.count} gallary_images"
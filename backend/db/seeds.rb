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
    price: "1200",
    short_description: "Discover London's charm, culture, and history.",
    description: "London is the capital of the United Kingdom, known for its rich history, iconic landmarks, and vibrant culture. Discover famous sites like Big Ben, the London Eye, Buckingham Palace, and the British Museum. The city offers world-class shopping, diverse cuisine, and beautiful parks like Hyde Park. London perfectly blends tradition and modern life, making it a must-visit for travelers from around the globe.",
    img_src: "https://i.ibb.co/zmHw3d2/pexels-nikita-khandelwal-800532.jpg"
  },
  {
    name: "Venice",
    price: "850",
    short_description: "Romantic gondola rides and historic canals await.",
    description: "Venice, a city built on water, is a romantic getaway like no other. Known for its gondola rides, beautiful canals, and Renaissance architecture, Venice is full of charm and history. Visit the stunning St. Mark’s Basilica, cross the famous Rialto Bridge, and enjoy fresh Italian cuisine by the water. Every corner feels like a scene from a movie, making it truly unforgettable.",
    img_src: "https://i.ibb.co/6XD8HKF/pexels-pixabay-258196.jpg"
  },
  {
    name: "Delhi",
    price: "600",
    short_description: "Historic Delhi, gateway to the Taj Mahal.",
    description: "Delhi is the vibrant capital of India, rich in history, culture, and bustling street life. Explore ancient landmarks like the Red Fort, Qutub Minar, and Humayun’s Tomb. As a gateway to the Taj Mahal, Delhi offers easy access to one of the world’s wonders. The city is also known for its colorful markets, delicious street food, and a unique blend of the old and the new.",
    img_src: "https://i.ibb.co/JryB98D/15-155705-taj-mahal-india-travel-destinations-architecture-taj-mahal.jpg"
  },
  {
    name: "Rome",
    price: "950",
    short_description: "Experience ancient Rome’s timeless architectural wonders.",
    description: "Rome, the Eternal City, is an open-air museum filled with ancient ruins, Renaissance art, and baroque architecture. Visit the Colosseum, the Vatican, the Pantheon, and the Trevi Fountain all in a day. The city offers incredible Italian cuisine, romantic piazzas, and centuries of history waiting to be explored. Whether you're wandering cobblestone streets or savoring gelato, Rome always leaves a lasting impression.",
    img_src: "https://i.ibb.co/StjJyYg/pexels-davi-pimentel-2064827.jpg"
  },
  {
    name: "Bali",
    price: "750",
    short_description: "Relax in Bali’s beaches, temples, and nature.",
    description: "Bali is a tropical paradise in Indonesia, famed for its stunning beaches, lush rice terraces, and spiritual culture. Discover ancient temples, surf on crystal-clear waves, and relax in luxury resorts. Whether you're exploring the vibrant nightlife in Seminyak or meditating in Ubud's serene forests, Bali offers something magical for every traveler. It’s a peaceful escape full of natural beauty and welcoming locals.",
    img_src: "https://i.ibb.co/86prszs/pexels-timur-kozmenko-2474689.jpg"
  },
  {
    name: "Saint Martin",
    price: "400",
    short_description: "Unwind on Saint Martin’s pristine island beaches.",
    description: "Saint Martin is a small island paradise in Bangladesh, known for its clear blue waters, coral reefs, and peaceful environment. It’s a perfect spot for beach lovers and those seeking a quiet retreat. Explore the sandy shores, watch breathtaking sunsets, and enjoy fresh seafood under coconut trees. Far from the rush of city life, this island offers serenity and natural charm at its finest.",
    img_src: "https://i.ibb.co/jR5dSWj/ashraful-pranto-cnbw-Gzh-Y-jk-unsplash.jpg"
  },
  {
    name: "Cox's Bazar",
    price: "450",
    short_description: "Explore the world’s longest natural sandy beach.",
    description: "Cox’s Bazar in Bangladesh is home to the longest uninterrupted sandy beach in the world. Stretching over 120 kilometers, it’s a favorite destination for locals and tourists alike. Relax on the shore, enjoy beach sports, and explore nearby attractions like Himchari and Inani Beach. The lively beachfront, fresh seafood, and breathtaking views make it a perfect coastal getaway full of charm and fun.",
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

packages = [
  {
    "type": "package",
    "name": "Honeymoon",
    "price": "950",
    "short_description": "Romantic getaway for newlyweds in paradise.",
    "description": "Celebrate your honeymoon with Tuzy in the most romantic settings imaginable. Enjoy secluded beaches, luxurious accommodations, and intimate experiences designed just for two. Whether you're watching sunsets over the ocean or sharing candlelit dinners, this is the perfect way to begin your journey together. While we can’t provide the spouse, we promise to deliver unforgettable memories. Leave the planning to us and focus on what matters—each other.",
    "img": "https://i.ibb.co/17jX1FB/pexels-asad-photo-maldives-1024967.jpg"
  },
  {
    "type": "package",
    "name": "Camping",
    "price": "350",
    "short_description": "Experience nature with campfires and starry skies.",
    "description": "Reconnect with nature and escape the ordinary with our all-inclusive camping package. Whether you're traveling solo or with friends, Tuzy provides all the essentials for a perfect outdoor getaway. Explore scenic trails, gather around cozy campfires, and sleep under starlit skies. Our tour team ensures safety and fun, so you can relax and enjoy the wilderness. Make new friends or bond with old ones in a peaceful, natural setting.",
    "img": "https://i.ibb.co/0qQ4Ppv/pexels-andrea-piacquadio-3777017.jpg"
  },
  {
    "type": "package",
    "name": "Adventure",
    "price": "720",
    "short_description": "Thrilling experiences for the wild-hearted traveler.",
    "description": "If you're looking for a thrill, our adventure package is perfect for you. Join Tuzy on unforgettable expeditions that may include hiking, rafting, zip-lining, or climbing. With expert guides and top-notch gear, you'll push your limits while staying safe. Whether you're flying solo or bringing friends, every experience is designed to excite, challenge, and inspire. It's time to break free from routine and dive into true adventure.",
    "img": "https://i.ibb.co/xFLfW7X/pexels-jahoo-clouseau-382177.jpg"
  },
  {
    "type": "package",
    "name": "Savings",
    "price": "280",
    "short_description": "Budget-friendly travel with full-on experiences.",
    "description": "Travel doesn’t have to break the bank. Our savings package is ideal for budget-conscious explorers who still want to experience the best of the world. Enjoy thoughtfully planned itineraries, great company, and stunning locations—all at an affordable price. Whether you're healing from a breakup, seeking new perspectives, or simply craving adventure, this trip will leave you refreshed and inspired. Bring your friends or make new ones along the way.",
    "img": "https://i.ibb.co/NN3Jrt1/pexels-alexander-mils-2068975.jpg"
  }
]

packages.each do |package|
  Package.create!({ name: package[:name], price: package[:price], description: package[:description], short_description: package[:short_description], img_src: package[:img] })
end

puts "✅ Seeded #{Package.count} packages"

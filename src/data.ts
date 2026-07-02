import { Attraction, Accommodation, Restaurant, TourismEvent, GalleryItem, BlogPost, FAQ, Establishment } from "./types";


export const ATTRACTIONS: Attraction[] = [
  {
    id: "tinuyan-falls",
    name: "Tinuy-an Falls",
    description: "The 'Niagara of the Philippines', a majestic 95-meter wide, three-tiered waterfall cascading amidst a deep emerald rainforest.",
    longDescription: "Known as the Crown Jewel of Bislig City, Tinuy-an Falls is a majestic multi-tiered waterfall that stretches 95 meters wide and plunges 55 meters high. Its name comes from the word 'tinuyo-an,' meaning an intentional act. The misty spray creates gorgeous natural rainbows on sunny mornings, typically between 9:00 AM and 11:00 AM. Visitors can take a bamboo raft (balsa) ride to get right under the cascading waters for a natural hydro-massage, or climb the paved stairs to the second and third tiers for breathtaking vantage points.",
    category: "Waterfalls",
    image: "/assets/images/Tinuy.an Featured 1.webp",
    distance: "18 km",
    travelTime: "35 mins",
    difficulty: "Easy",
    bestTime: "08:00 AM - 11:00 AM",
    entranceFee: "₱50.00 (Standard) / Children under 12 Free",
    openingHours: "06:00 AM - 05:00 PM daily",
    travelTips: [
      "Visit in the morning to catch the spectacular rainbow reflecting off the mist.",
      "Wear sturdy non-slip water shoes if you plan to climb up the stairs to the upper levels.",
      "Rent a local cottage or bamboo balsa to enjoy a pristine dining experience by the pool.",
      "Bring water-resistant cases or dry bags for your electronics and cameras."
    ],
    nearbyAttractions: ["Sian Falls", "Hinayagan Cave", "Lake 77"],
    nearbyRestaurants: ["Food in a Box", "Brew Side Cafe"],
    accessibility: "Wheelchair accessible lower viewing deck, paved pathways. Upper tiers require climbing stone steps.",
    coordinates: { lat: 8.1706, lng: 126.2291 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tinuy-an+Falls,+Bislig,+Surigao+del+Sur,+Philippines",
    rating: 4.9
  },
  {
    id: "enchanted-river",
    name: "Hinatuan Enchanted River",
    description: "A world-famous deep, crystal-clear saltwater spring river displaying deep sapphire and turquoise hues, wrapped in legend.",
    longDescription: "Located in neighboring Hinatuan (just 40 minutes from Bislig), the Enchanted River is an absolute must-visit. Its crystal-clear saltwater spring seems to emerge magically from a deep underwater cave system that remains largely unexplored. No one knows exactly where the saltwater comes from. At 12:00 PM daily, the river is cleared of swimmers for the 'Hinatuan Hymn,' during which a school of large fish mysteriously appears from the deep to be fed by park rangers. Swimming is permitted in dedicated safe zones downriver to protect the fragile spring source.",
    category: "Rivers",
    image: "/assets/images/Enchanted River Featured 1.jpg",
    distance: "24 km",
    travelTime: "40 mins",
    difficulty: "Easy",
    bestTime: "11:30 AM - 01:00 PM (for the feeding ritual)",
    entranceFee: "₱100.00 (Adults) / ₱30.00 (Children)",
    openingHours: "07:00 AM - 05:00 PM daily",
    travelTips: [
      "The world-famous fish-feeding ceremony takes place exactly at 12:00 PM. Arrive early to secure a good viewing spot.",
      "To protect the marine ecosystem, standard sunscreen and soaps are prohibited before swimming. Use eco-friendly alternatives.",
      "Life vests are strictly mandatory for all swimming activities and are included or rentable on-site.",
      "Hire a local motorized boat at the mouth of the river to explore nearby islands and coastal seafood stalls."
    ],
    nearbyAttractions: ["Kawa-Kawa Hot Stone Bath", "Hinatuan Cold Spring", "Harip Beach"],
    nearbyRestaurants: ["Fabella Coffee", "Brew Side Cafe"],
    accessibility: "Paved steps with handrails lead down to the water. Floating docks and walkways are highly stable.",
    coordinates: { lat: 8.4357, lng: 126.3683 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hinatuan+Enchanted+River,+Hinatuan,+Surigao+del+Sur,+Philippines",
    rating: 4.8
  },
  {
    id: "kawa-kawa-sa-awog",
    name: "Kawa-kawa sa Awog (Kawa-kawa Falls)",
    description: "Kawa-kawa Falls, located in Bislig, Surigao del Sur, is a captivating natural wonder known for its unique shape, resembling a series of woks or bowls.",
    longDescription: "Kawa-kawa Falls, located in Bislig, Surigao del Sur, is a captivating natural wonder known for its unique shape, resembling a series of woks or bowls. The waterfall flows down from the mountains, creating several natural pools, perfect for swimming and relaxation. The clear, flowing water adds to the serene atmosphere. For thrill-seekers, diving decks offer an exciting way to enjoy the falls. Small cottages are scattered around the area for visitors to rest. Accessible by bus or private vehicle, the falls are reachable via a mostly concrete and passable road, making it an easy and enjoyable destination for nature lovers.",
    category: "Waterfalls",
    image: "/assets/images/kawa-kawa featured 1.webp",
    distance: "28 km",
    travelTime: "45 mins",
    difficulty: "Easy",
    bestTime: "08:00 AM - 04:00 PM (for sunny swimming and diving)",
    entranceFee: "₱20.00 / Cottage rentals range from ₱300.00 to ₱500.00",
    openingHours: "07:00 AM - 05:00 PM daily",
    travelTips: [
      "Bring extra clothes and swimwear as the natural pools are incredibly refreshing and perfect for swimming.",
      "Rent one of the local bamboo cottages to safely keep your belongings and rest between swims.",
      "Try out the designated diving platforms if you're a thrill-seeker, but always check water depth first.",
      "Ensure you bring your own food and refreshments as there are no large restaurants directly at the falls."
    ],
    nearbyAttractions: ["Tinuy-an Falls", "Hinayagan Cave"],
    nearbyRestaurants: ["Brew Side Cafe", "Fabella Coffee"],
    accessibility: "Accessible by bus or private vehicle via a mostly concrete and passable road, with a short walk to the main pools.",
    coordinates: { lat: 8.2450, lng: 126.2300 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kawa-Kawa+Falls,+Bislig,+Surigao+del+Sur,+Philippines",
    rating: 4.7
  },
  {
    id: "hagonoy-island",
    name: "Hagonoy Island",
    description: "An uninhabited tropical island with glistening powdery white sand, swaying coconut palms, and crystal coastal waters.",
    longDescription: "Hagonoy Island is a slice of pure, untouched beach paradise located in the waters of Bislig Bay. This uninhabited sandbar features fine, powdery white sand that shifts gracefully with the seasonal ocean currents. A single stand of coconut palms dominates the center of the island, offering a picturesque shade. The clear waters surrounding the island are rich in marine life, making it a spectacular destination for snorkeling, beach bumming, and dining on fresh seafood caught and cooked on-site by local boatmen.",
    category: "Beaches",
    image: "/assets/images/hagonoy featured 1.jpg",
    distance: "4.5 km (offshore)",
    travelTime: "25 mins boat ride",
    difficulty: "Easy",
    bestTime: "07:00 AM - 02:00 PM (during low to medium tide)",
    entranceFee: "₱20.00 / Boat rentals from Baywalk range from ₱1,500.00 to ₱2,000.00",
    openingHours: "Daylight hours only",
    travelTips: [
      "Rent an outrigger boat (bangka) early in the morning from the Bislig Baywalk pier.",
      "Bring your own snorkel, mask, and reef-safe sunscreen, as there are no commercial shops on the island.",
      "Ask your boat captain to help purchase fresh crabs or fish from passing fishermen to grill on the island.",
      "Pack all waste back with you to preserve the island's strict trash-free policy."
    ],
    nearbyAttractions: ["Bislig Baywalk", "Chocolate Beach"],
    nearbyRestaurants: ["Food in a Box"],
    accessibility: "Requires boarding and disembarking a pump boat directly onto the shallow beach water.",
    coordinates: { lat: 8.2415, lng: 126.3752 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hagonoy+Island,+Bislig,+Surigao+del+Sur,+Philippines",
    rating: 4.7
  },
  {
    id: "hinayagan-cave",
    name: "Hinayagan Cave",
    description: "An enchanting limestone cave with a natural skylight dome that lets sunbeams illuminate an emerald pool.",
    longDescription: "Located in Brgy. San Jose, Bislig City, Hinayagan Cave is a remarkable geological wonder. The name 'Hinayagan' is derived from the Kamayo word for 'illuminated' or 'brightened'. Inside, the cave features a spectacular, open circular limestone dome that acts as a natural ceiling skylight. Around midday, spectacular shafts of golden sunlight pierce through the opening, dramatically illuminating the cave's inner chambers and a tranquil pool of emerald water. The cave is decorated with stunning stalactites, stalagmites, and unique mineral flowstones.",
    category: "Caves",
    image: "/assets/images/Hinayagan Cave Featured 1.jpg",
    distance: "12 km",
    travelTime: "20 mins",
    difficulty: "Moderate",
    bestTime: "11:00 AM - 01:00 PM (for the overhead sunbeam effect)",
    entranceFee: "₱30.00 (includes safety helmet and local guide guide)",
    openingHours: "08:00 AM - 04:00 PM daily",
    travelTips: [
      "Always go with a registered local tour guide guide. Helmets are strictly required inside.",
      "Wear sturdy shoes with good traction, as the cave floor and rocky pathways can be slippery.",
      "Bring a waterproof headlamp or flashlight to inspect the stunning rock formations closely.",
      "Keep silence inside to respect the local bat colonies roosting in the deep crevices."
    ],
    nearbyAttractions: ["Tinuy-an Falls", "Sian Falls"],
    nearbyRestaurants: ["Brew Side Cafe"],
    accessibility: "Requires trekking down a natural forest path and entering a semi-steep cave opening. Slippery surfaces.",
    coordinates: { lat: 8.1611, lng: 126.2625 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hinayagan+Cave,+Bislig,+Surigao+del+Sur,+Philippines",
    rating: 4.5
  },
  {
    id: "lake-77",
    name: "Lake 77",
    description: "A tranquil, mirror-like eco-lake bordered by lush forest canopies, perfect for calming kayaking and bird-watching.",
    longDescription: "Lake 77 is a serene freshwater lake tucked deep within the lush green woodlands of Brgy. Sibaroy, Bislig City. Originally established during the early logging era, this hidden lake has evolved into a flourishing, peaceful sanctuary for native birds and water plants. The water is remarkably still, reflecting the emerald forest canopy like a perfect mirror. Visitors can rent manual kayaks, stand-up paddleboards, or cozy floating bamboo cottages to spend a relaxing day disconnected from the digital world.",
    category: "Parks",
    image: "/assets/images/Lake 77 Featured 1.jpg",
    distance: "15 km",
    travelTime: "25 mins",
    difficulty: "Easy",
    bestTime: "06:00 AM - 09:00 AM (ideal for birdwatching) or late afternoon",
    entranceFee: "₱30.00 / Kayak rental ₱100.00 per hour",
    openingHours: "07:00 AM - 05:00 PM daily",
    travelTips: [
      "Bring binoculars if you enjoy bird-watching; you might spot unique Philippine hornbills and kingfishers.",
      "Rent a floating bamboo raft to enjoy a peaceful, quiet picnic in the middle of the lake.",
      "The road leading to the lake can be muddy after rainfall; a sturdy 4-wheel drive or local habal-habal is recommended.",
      "Perfect spot for meditation, reading, and enjoying untouched forest therapy."
    ],
    nearbyAttractions: ["Tinuy-an Falls", "Forester's Park"],
    nearbyRestaurants: ["Fabella Coffee"],
    accessibility: "Flat paths lead directly to the lakeside boarding deck. Easy access for all age groups.",
    coordinates: { lat: 8.1834, lng: 126.2081 },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lake+77,+Bislig,+Surigao+del+Sur,+Philippines",
    rating: 4.6
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "food-in-a-box",
    name: "Food in a Box",
    description: "A hip, contemporary restaurant hub offering magnificent Kamayo-style seafood platters and modern Filipino favorites.",
    category: "Seafood",
    image: "/assets/images/Food in a Box featured 1.jpg",
    specialty: ["Kamayo Mud Crabs in Garlic-Butter", "Sizzling Squid Sisig", "Pristine Bislig Tuna Sashimi"],
    priceRange: "₱250 - ₱600 per person",
    contact: "+63 917 888 1234",
    socialMedia: "facebook.com/foodinaboxbislig",
    website: "https://food-in-a-box-fiab-114507837221.asia-southeast1.run.app",
    operatingHours: "10:00 AM - 10:00 PM daily",
    coordinates: { lat: 8.2114, lng: 126.3488 },
    mapUrl: "https://www.google.com/maps/search/Food+in+a+Box+Bislig",
    rating: 4.7
  },
  {
    id: "brew-side-cafe",
    name: "Brew Side Cafe",
    description: "The favorite local specialty cafe, known for its cold brews, aesthetic wooden interiors, and gourmet artisan pastries.",
    category: "Cafe",
    image: "/assets/images/brew side cafe featured 1.jpg",
    specialty: ["Mindanao Highland Cold Brew", "Tablea Chocolate Lava Cake", "Salted Caramel Spanish Latte"],
    priceRange: "₱120 - ₱250 per person",
    contact: "+63 908 777 5678",
    socialMedia: "facebook.com/breysidecafebislig",
    website: "https://brewsidebislig.com",
    operatingHours: "08:00 AM - 11:00 PM daily",
    coordinates: { lat: 8.2098, lng: 126.3512 },
    mapUrl: "https://www.google.com/maps/search/Brew+Side+Cafe+Bislig",
    rating: 4.8
  },
  {
    id: "fabella-coffee",
    name: "Fabella Coffee",
    description: "An elegant, premium cafe and roastery showcasing single-origin Mindanao Arabica and local Kamayo snacks.",
    category: "Cafe",
    image: "/assets/images/Fabella Cafe Featured 1.jpg",
    specialty: ["Drip Mount Apo Arabica", "Kamayo Cassava Bibingka", "Ice Cream Waffle Sandwich"],
    priceRange: "₱150 - ₱300 per person",
    contact: "+63 919 666 4321",
    socialMedia: "instagram.com/fabellacoffee",
    website: "https://fabellacoffee.ph",
    operatingHours: "07:00 AM - 10:00 PM daily",
    coordinates: { lat: 8.2081, lng: 126.3533 },
    mapUrl: "https://www.google.com/maps/search/Fabella+Coffee+Bislig",
    rating: 4.9
  }
];

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: "harip-beach",
    name: "Harip Beach Resort",
    description: "An eco-luxury beachfront resort offering stunning wooden cottages, surfing waves, and coconut tree swings.",
    category: "Beachfront",
    image: "/assets/images/Harip Resort Featured 1.webp",
    priceRange: "₱2,500 - ₱6,000 per night",
    amenities: ["Oceanfront View", "Infinity Hammocks", "Surfboard Rentals", "Outdoor Bamboo Showers", "Free WiFi", "Beachside Barbecue Grill"],
    contact: "+63 920 111 9999",
    socialMedia: "facebook.com/haripbeachresort",
    website: "https://harip-beach-resort-114507837221.asia-southeast1.run.app",
    operatingHours: "24/7 Front Desk / Check-in 2:00 PM",
    coordinates: { lat: 8.4412, lng: 126.4215 },
    mapUrl: "https://www.google.com/maps/search/Harip+Beach+Resort",
    rating: 4.7
  },
  {
    id: "hinatuan-cold-spring",
    name: "Hinatuan Cold Spring Resort",
    description: "A serene, natural freshwater spring resort surrounded by forest canopies, offering refreshing ice-cold dips.",
    category: "Eco Lodge",
    image: "/assets/images/Enchanted River Featured 2.jpg",
    priceRange: "₱1,200 - ₱3,500 per night (Cabins and Cottages available)",
    amenities: ["Natural Spring Pool", "Bamboo Floating Cottages", "Native Karaoke Pavilions", "Campgrounds", "On-site Local Canteen"],
    contact: "+63 930 444 8888",
    socialMedia: "facebook.com/hinatuancoldspring",
    website: "https://hinatuancoldspring.com",
    operatingHours: "08:00 AM - 08:00 PM for day-trips, 24/7 for overnight cabins",
    coordinates: { lat: 8.4114, lng: 126.3524 },
    mapUrl: "https://www.google.com/maps/search/Hinatuan+Cold+Spring+Resort",
    rating: 4.5
  },
  {
    id: "kawa-kawa",
    name: "Kawa-Kawa Jungle Bath & Lodge",
    description: "An authentic, nature-inspired eco-lodge featuring traditional giant hot stone baths, set in a peaceful rainforest valley.",
    category: "Eco Lodge",
    image: "/assets/images/kawa-kawa featured 1.webp",
    priceRange: "₱1,800 - ₱4,000 per night",
    amenities: ["Traditional Giant Kawa Hot Baths", "Forest Canopy Boardwalks", "Organic Herbal Tea Garden", "Yoga & Meditation Shala", "Local Tour Guides"],
    contact: "+63 940 555 7777",
    socialMedia: "instagram.com/kawakawajungle",
    website: "https://kawakawajungle.com",
    operatingHours: "08:00 AM - 09:00 PM",
    coordinates: { lat: 8.4231, lng: 126.3611 },
    mapUrl: "https://www.google.com/maps/search/Kawa-Kawa+Hot+Stone+Bath+Hinatuan",
    rating: 4.8
  }
];

export const EVENTS: TourismEvent[] = [
  {
    id: "karawasan",
    title: "Karawasan Festival",
    date: "September 17 - 18",
    month: "SEP",
    day: "17",
    description: "The primary cultural festival of Bislig City, celebrated through vibrant, nature-inspired street dancing, ethnic chants, and indigenous games representing the Kamayo tribe's appreciation of crab harvests (Karawasan translates to crab abundance).",
    type: "Festival",
    image: "/assets/images/Harip Featured 2.jpg"
  },
  {
    id: "charter-day",
    title: "Bislig City Charter Day",
    date: "September 18",
    month: "SEP",
    day: "18",
    description: "A grand anniversary celebration featuring dynamic agricultural trade fairs, coastal regattas, musical concerts, and the highly anticipated Search for Miss Bislig.",
    type: "Community",
    image: "/assets/images/Harip Resort Featured 1.webp"
  },
  {
    id: "tinuyan-swim",
    title: "Tinuy-an Eco Trail Marathon",
    date: "May 24",
    month: "MAY",
    day: "24",
    description: "An annual sports-tourism marathon that tests participants' stamina along rugged tropical rainforest terrains, finishing directly at the base pool of the magnificent Tinuy-an Falls.",
    type: "Sports",
    image: "/assets/images/Tinuy.an Featured 2.webp"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Dawn over Tinuy-an Cascades",
    category: "Waterfalls",
    image: "/assets/images/Tinuy.an Featured 3.webp",
    author: "Romer Amper"
  },
  {
    id: "gal-2",
    title: "Mystical Deep Sapphire Blue",
    category: "Rivers",
    image: "/assets/images/Enchanted River Featured 2.jpg",
    author: "Alvin Santos"
  },
  {
    id: "gal-3",
    title: "Bislig Bay Sunrise Glow",
    category: "Drone",
    image: "/assets/images/Harip Featured 3.jpg",
    author: "Elena Cruz"
  },
  {
    id: "gal-4",
    title: "White Sandbar of Hagonoy Island",
    category: "Beaches",
    image: "/assets/images/hagonoy featured 2.jpg",
    author: "Mark Diaz"
  },
  {
    id: "gal-5",
    title: "Traditional Kamayo Tribal Headdress",
    category: "People",
    image: "/assets/images/Harip Resort Featured 1.webp",
    author: "Lani Perez"
  },
  {
    id: "gal-6",
    title: "Delicious Garlic-Butter Mud Crabs",
    category: "Food",
    image: "/assets/images/Food in a Box featured 1.jpg",
    author: "Chef Mike"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Ultimate 3-Day Bislig City Eco-Adventure Itinerary",
    excerpt: "Discover the best way to maximize your weekend in Bislig, from chasing morning rainbows at Tinuy-an Falls to swimming with mystical fish at the Enchanted River.",
    content: "Planning a trip to the eastern coast of Mindanao? Bislig City, together with the nearby town of Hinatuan, forms a powerhouse eco-tourism circuit that you shouldn't miss. On your first day, start early at 8:00 AM to catch the magnificent morning rainbow at Tinuy-an Falls. After enjoying a bamboo balsa ride, enjoy lunch at Brew Side Cafe. For Day 2, visit the magical Hinatuan Enchanted River just in time for the 12:00 PM fish feeding ritual. Spend your final day island hopping on the powdery white sand of Hagonoy Island.",
    date: "June 25, 2026",
    author: "Tourism Officer",
    readTime: "5 min read",
    category: "Travel Guide",
    image: "/assets/images/Tinuy.an Featured 1.webp"
  },
  {
    id: "blog-2",
    title: "The Legends of the Enchanted River: Myth vs Science",
    excerpt: "Why is the Enchanted River saltwater? Why do the fish only appear when the hymn plays? Dive into the fascinating mysteries and scientific theories.",
    content: "For generations, the local Kamayo people have passed down legends of spirits, fairies, and mermaids guarding the deep turquoise pool of Hinatuan. Legend has it that the unique sapphire-blue color was created by fairies stirring jade and sapphires into the water. Scientifically, the river is a unique estuarine karst spring, where an underwater limestone cave system feeds clean saltwater from the Pacific Ocean directly into the basin. The daily fish feeding remains an incredible spectacle of animal behavior.",
    date: "May 18, 2026",
    author: "Cultural Heritage Specialist",
    readTime: "7 min read",
    category: "Hidden Gem",
    image: "/assets/images/Enchanted River Featured 3.jpg"
  }
];

export const FAQS: FAQ[] = [
  {
    question: "How do I travel to Bislig City?",
    answer: "The nearest major airports are Francisco Bangoy International Airport (Davao City) and Bancasi Airport (Butuan City). From Davao or Butuan, you can take a comfortable air-conditioned passenger bus (such as Bachelor Express) or hire a private van directly to Bislig City (Mangagoy Terminal). The road trip takes approximately 4-5 hours from Butuan, and 5-6 hours from Davao.",
    category: "Transportation"
  },
  {
    question: "When is the best season to visit Tinuy-an Falls?",
    answer: "Swimming is strictly prohibited in the main deep blue pool area to protect the extremely fragile marine ecosystem and cave structures. However, a beautifully designated and secure swimming zone is open just 100 meters downriver, where you can enjoy the same crystal-clear saltwater flow.",
    category: "Safety & Rules"
  }
];

export const ESTABLISHMENTS: Establishment[] = [
  {
    id: "gaisano-bislig",
    name: "Gaisano Capital Bislig",
    description: "The premier shopping mall in Bislig City, offering department stores, a supermarket, food outlets, and retail shopping.",
    longDescription: "Gaisano Capital Bislig serves as the primary modern retail center for locals and visiting tourists in Surigao del Sur. Strategically located along the highway in Brgy. Cumawas, it features a comprehensive supermarket for grocery needs, a department store offering apparel, electronics, and home items, plus a food court housing popular national chains. It is the perfect stop to buy supplies, withdraw cash from multiple stable ATMs, or take a cool break in its fully air-conditioned spaces.",
    category: "Shops & Malls",
    image: "/assets/images/Gaisano Capital Bislig.jpg",
    location: "National Highway, Brgy. Cumawas, Bislig City",
    contact: "+63 86 853 1234",
    socialMedia: "facebook.com/gaisanocapitalbislig",
    website: "https://www.gaisanocapital.com",
    operatingHours: "09:00 AM - 08:30 PM daily",
    coordinates: { lat: 8.2125, lng: 126.3578 },
    mapUrl: "https://www.google.com/maps/search/Gaisano+Capital+Bislig",
    rating: 4.4
  },
  {
    id: "mangagoy-market",
    name: "Mangagoy Public Market & Commercial Center",
    description: "The bustling commercial heart of Bislig, where you can buy fresh seafood, dried fish (sapan-sapan), local fruits, and traditional Kamayo delicacies.",
    longDescription: "If you want to experience the authentic local lifestyle, the Mangagoy Public Market is a must-visit. Renowned for its rich seafood section, you can purchase fresh-off-the-boat yellowfin tuna, mud crabs, and sea urchins at very affordable prices. The dry section features the famous Kamayo dried fish locally called 'sapan-sapan' or 'tuyo,' which make excellent souvenirs (pasalubong). Local vendors are extremely welcoming and happy to share traditional cooking tips.",
    category: "Shops & Malls",
    image: "/assets/images/Mangagoy public market.webp",
    location: "Espiritu Street, Brgy. Mangagoy, Bislig City",
    contact: "N/A (Public Market Authority)",
    socialMedia: "N/A",
    website: "",
    operatingHours: "04:00 AM - 07:00 PM daily",
    coordinates: { lat: 8.2085, lng: 126.3508 },
    mapUrl: "https://www.google.com/maps/search/Mangagoy+Public+Market",
    rating: 4.5
  },
  {
    id: "7eleven-mangagoy",
    name: "7-Eleven Mangagoy",
    description: "Convenient 24/7 stop for snacks, drinks, basic travel supplies, and automated cash withdrawals in the city center.",
    longDescription: "Located at the heart of the commercial hub in Brgy. Mangagoy, this 7-Eleven store provides reliable 24-hour service for tourists and night travelers. Stocked with ready-to-eat meals, ice-cold beverages, basic toiletries, and emergency phone-load services. It also features a secure in-store ATM, which is highly valuable since commercial banks in the area can occasionally experience long lines.",
    category: "Convenience Stores",
    image: "/assets/images/7 eleven.jpg",
    location: "Espiritu Street, Brgy. Mangagoy, Bislig City",
    contact: "+63 2 8711 0711",
    socialMedia: "facebook.com/711philippines",
    website: "https://www.7-eleven.com.ph",
    operatingHours: "24/7 daily",
    coordinates: { lat: 8.2091, lng: 126.3514 },
    mapUrl: "https://www.google.com/maps/search/7-Eleven+Mangagoy+Bislig",
    rating: 4.2
  },
  {
    id: "sports-complex-courts",
    name: "Bislig City Sports Complex (Pickleball & Tennis)",
    description: "A multi-purpose sports facility featuring modern indoor and outdoor pickleball courts, tennis courts, and basketball fields.",
    longDescription: "The Bislig City Sports Complex is a premium hub for local sports enthusiasts and active visitors. It features newly surfaced, dedicated pickleball courts with tournament-grade net fittings and nighttime lighting. It is highly popular during late afternoons. Guests can rent paddles and balls on-site for a minimal fee, or participate in friendly community games. The complex also hosts tennis courts and standard indoor basketball arenas.",
    category: "Sports & Recreation",
    image: "/assets/images/bislig sports center.jpg",
    location: "Brgy. Poblacion, Bislig City",
    contact: "+63 86 853 6000 (City Sports Office)",
    socialMedia: "facebook.com/bisligcitysports",
    website: "https://bislig.gov.ph/services/sports-complex",
    operatingHours: "05:00 AM - 09:00 PM daily",
    coordinates: { lat: 8.2198, lng: 126.3633 },
    mapUrl: "https://www.google.com/maps/search/Bislig+City+Sports+Complex",
    rating: 4.6
  },
  {
    id: "lawigan-surf-point",
    name: "Lawigan Surf Point",
    description: "An advanced reef break point offering strong, hollow waves for experienced surfers during the northeast monsoon (Amihan) season.",
    longDescription: "Lawigan Surf Point is a hidden gem for seasoned wave riders looking for a challenge in Bislig. Situated further out along the coastal headlands of Brgy. Lawigan, this surf point features a rocky bottom reef break that produces fast, powerful, and hollow right-hand waves. Best visited during early mornings when offshore winds shape the swells beautifully. There are no commercial structures here, offering surfers a raw, wild, and untouched surfing experience in pristine Pacific waters.",
    category: "Surfing & Beaches",
    image: "/assets/images/Lawigan Surf point.jpg",
    location: "Coastal Highway, Brgy. Lawigan, Bislig City",
    contact: "N/A",
    socialMedia: "facebook.com/lawigansurfers",
    website: "",
    operatingHours: "Daylight hours only",
    coordinates: { lat: 8.1678, lng: 126.4112 },
    mapUrl: "https://www.google.com/maps/search/Lawigan+Bislig+Surigao+del+Sur",
    rating: 4.7
  },
  {
    id: "bislig-district-hospital",
    name: "Bislig District Hospital",
    description: "A primary public healthcare facility providing emergency services, medical checks, and patient care for visitors and residents.",
    longDescription: "The Bislig District Hospital is the primary medical facility in the region, offering 24-hour emergency response services, clinical consultations, laboratory diagnostics, and inpatient care. Strategically situated along the main highway, it is equipped to handle standard medical requirements and tourism-related emergencies (such as minor surf injuries or travel sickness) with dedicated staff.",
    category: "Services & Others",
    image: "/assets/images/bislig district hospital.jpg",
    location: "National Highway, Brgy. Caramcam, Bislig City",
    contact: "+63 86 853 2214",
    socialMedia: "N/A",
    website: "https://doh.gov.ph/hospital/bislig-district-hospital",
    operatingHours: "24/7 (Emergency) / 08:00 AM - 05:00 PM (OPD)",
    coordinates: { lat: 8.2162, lng: 126.3564 },
    mapUrl: "https://www.google.com/maps/search/Bislig+District+Hospital",
    rating: 4.1
  },
  {
    id: "petron-mangagoy",
    name: "Petron Station - Mangagoy",
    description: "Full-service gas station equipped with clean restrooms, a small convenience store, air supply, and car diagnostic assistance.",
    longDescription: "Petron Mangagoy is a vital stopover for motorists and road-tripping tourists. Located at the entryway of the commercial center, it offers high-quality fuels, clean and modern public toilets, air pressure machines for tires, and a small convenience store. The station also features a mechanic bay offering basic oil changes and tire repair support.",
    category: "Services & Others",
    image: "/assets/images/Petron Mangagoy.webp",
    location: "National Highway, Brgy. Mangagoy, Bislig City",
    contact: "+63 86 853 4567",
    socialMedia: "facebook.com/petroncorporation",
    website: "https://www.petron.com",
    operatingHours: "05:00 AM - 11:00 PM daily",
    coordinates: { lat: 8.2064, lng: 126.3472 },
    mapUrl: "https://www.google.com/maps/search/Petron+Mangagoy+Bislig",
    rating: 4.3
  },
  {
    id: "d-vet-yard",
    name: "D Vet Yard",
    description: "A trusted local veterinary clinic offering vaccinations, check-ups, pet foods, and health care for dogs, cats, and small animals.",
    longDescription: "D Vet Yard is a premier private veterinary clinic in Bislig City, known for its professional and compassionate care for household pets. Strategically located at the Japus Building on Espiritu Street, it offers routine checkups, deworming, surgical procedures, and standard vaccination schedules. The clinic also features a small pet shop corner stocked with quality pet food, vitamins, and hygiene supplies.",
    category: "Services & Others",
    image: "/assets/images/d vet yard.jpg",
    location: "Japus Bldg, Espiritu St, Brgy. Mangagoy, Bislig City",
    contact: "+63 920 555 1234",
    socialMedia: "facebook.com/dvetyardbislig",
    website: "",
    operatingHours: "08:30 AM - 05:30 PM (Monday to Saturday)",
    coordinates: { lat: 8.2093, lng: 126.3521 },
    mapUrl: "https://www.google.com/maps/search/D+Vet+Yard+Bislig",
    rating: 4.8
  },
  {
    id: "mercury-drug-mangagoy",
    name: "Mercury Drug - Mangagoy",
    description: "The primary 24/7 national pharmacy chain branch in Bislig, providing prescription medications, wellness products, and basic conveniences.",
    longDescription: "Mercury Drug is the most trusted and fully stocked drugstore in Bislig City. Conveniently located on Espiritu Street in the commercial district of Mangagoy, it offers a complete range of prescription drugs, over-the-counter medicines, medical devices, baby care essentials, and nutritional supplements. With standby pharmacists on duty, it is the primary stop for health and emergency medical purchases.",
    category: "Services & Others",
    image: "/assets/images/mercury drug.png",
    location: "Espiritu St, Brgy. Mangagoy, Bislig City",
    contact: "+63 86 853 1122",
    socialMedia: "facebook.com/mercurydrugcorporation",
    website: "https://www.mercurydrug.com",
    operatingHours: "24/7 daily",
    coordinates: { lat: 8.2088, lng: 126.3512 },
    mapUrl: "https://www.google.com/maps/search/Mercury+Drug+Mangagoy+Bislig",
    rating: 4.7
  },
  {
    id: "tgp-mangagoy",
    name: "The Generics Pharmacy (TGP)",
    description: "Providing high-quality and highly affordable generic medicines, vitamins, and healthcare supplements to the Bislig community.",
    longDescription: "TGP (The Generics Pharmacy) on Abarca Street offers highly cost-effective generic alternatives to brand-name medications. Known for its affordable pricing and extensive stock of maintenance medicines, pain relief tablets, and vitamins, it is a highly valued community establishment helping local families and travelers access budget-friendly healthcare.",
    category: "Services & Others",
    image: "/assets/images/generic pharmacy.jpg",
    location: "Abarca St, Brgy. Mangagoy, Bislig City",
    contact: "+63 86 853 3344",
    socialMedia: "facebook.com/tgppharma",
    website: "https://tgp.com.ph",
    operatingHours: "08:00 AM - 07:00 PM daily",
    coordinates: { lat: 8.2096, lng: 126.3503 },
    mapUrl: "https://www.google.com/maps/search/The+Generics+Pharmacy+Mangagoy+Bislig",
    rating: 4.4
  },
  {
    id: "kinilaw-king-bislig",
    name: "Kinilaw King - Bislig",
    description: "Famous local seafood restaurant known for serving the best fresh 'Kinilaw' (Mindanao-style raw tuna ceviche), grilled fish, and seafood platters.",
    longDescription: "Kinilaw King is a culinary landmark in Bislig City, celebrating the rich marine harvest of Mindanao. It is widely famous for its 'Kinilaw'—fresh raw yellowfin tuna cubed and cured in local coconut vinegar, ginger, onions, chilies, and tabon-tabon fruit. The restaurant also serves a mouthwatering selection of grilled squid, buttered crabs, and fresh seafood soup, providing a truly local dining experience.",
    category: "Dining & Cafes",
    image: "/assets/images/kinilaw king bislig.jpg",
    location: "Espiritu St, Brgy. Mangagoy, Bislig City",
    contact: "+63 917 111 2233",
    socialMedia: "facebook.com/kinilawkingbislig",
    website: "",
    operatingHours: "10:30 AM - 09:30 PM daily",
    coordinates: { lat: 8.2081, lng: 126.3498 },
    mapUrl: "https://www.google.com/maps/search/Kinilaw+King+Bislig",
    rating: 4.6
  },
  {
    id: "jollibee-mangagoy",
    name: "Jollibee Mangagoy",
    description: "The absolute favorite Filipino fast-food chain in Bislig City, serving legendary Chickenjoy, Jolly Spaghetti, and burgers to families and travelers.",
    longDescription: "A central gathering point for families in Bislig, Jollibee Mangagoy offers popular quick-service meals with distinct Filipino tastes. Conveniently located on the main coastal highway, it features a drive-thru, kids play area, and is the perfect stop to enjoy iconic Chickenjoy, sweet Jolly Spaghetti, and Peach Mango Pies during your road trip.",
    category: "Dining & Cafes",
    image: "/assets/images/jollibee.png",
    location: "Surigao-Davao Coastal Road, Brgy. Mangagoy, Bislig City",
    contact: "+63 86 853 9999",
    socialMedia: "facebook.com/jollibeephilippines",
    website: "https://www.jollibee.com.ph",
    operatingHours: "07:00 AM - 10:00 PM daily",
    coordinates: { lat: 8.2072, lng: 126.3468 },
    mapUrl: "https://www.google.com/maps/search/Jollibee+Mangagoy+Bislig",
    rating: 4.5
  },
  {
    id: "kirbys-restaurant",
    name: "Kirby's Restaurant",
    description: "A long-standing local restaurant serving delicious, home-cooked Filipino dishes, Chinese-Filipino fusion, and family-sized platters.",
    longDescription: "Kirby's Restaurant is a classic Bislig dining venue popular for family reunions, birthdays, and business lunches. Its extensive menu features local favorites such as Crispy Pata, Pancit Canton, Beef Caldereta, and fresh seafood chop suey. With its comfortable air-conditioned seating and warm service, it provides a premium local dining environment.",
    category: "Dining & Cafes",
    image: "/assets/images/kirbys.jpg",
    location: "Espiritu St, Brgy. Mangagoy, Bislig City",
    contact: "+63 86 853 4455",
    socialMedia: "facebook.com/kirbysrestaurantbislig",
    website: "",
    operatingHours: "09:00 AM - 09:00 PM daily",
    coordinates: { lat: 8.2079, lng: 126.3501 },
    mapUrl: "https://www.google.com/maps/search/Kirby%27s+Restaurant+Bislig",
    rating: 4.5
  },
  {
    id: "dmr-pharmacy",
    name: "DMR Pharmacy",
    description: "A localized pharmacy stocking prescription medications, over-the-counter drugs, and homeopathic/herbal health supplements.",
    longDescription: "DMR Pharmacy on Espiritu Street is a convenient neighborhood health shop offering standard prescription drugs, local generic medicines, skin care products, and wellness vitamins. Known for its quick service and accommodating pharmacists, it is a highly accessible healthcare spot in the commercial center.",
    category: "Services & Others",
    image: "/assets/images/dmr pharmacy.jpg",
    location: "Espiritu St, Brgy. Mangagoy, Bislig City",
    contact: "+63 930 222 1122",
    socialMedia: "facebook.com/dmrpharmacybislig",
    website: "",
    operatingHours: "08:00 AM - 08:00 PM daily",
    coordinates: { lat: 8.2090, lng: 126.3517 },
    mapUrl: "https://www.google.com/maps/search/DMR+Pharmacy+Mangagoy+Bislig",
    rating: 4.3
  },
  {
    id: "generika-bislig",
    name: "Generika Drugstore",
    description: "A well-known national generic drugstore chain offering affordable, high-quality generic medicines and health products in Poblacion.",
    longDescription: "Located in the historical Poblacion district of Bislig, Generika Drugstore provides affordable healthcare access. They specialize in high-quality generic equivalents of maintenance medicines and seasonal vitamins, backed by helpful patient consulting services. It is a highly trusted local pharmacy option.",
    category: "Services & Others",
    image: "/assets/images/generika drugstore.jpg",
    location: "National Highway, Brgy. Poblacion, Bislig City",
    contact: "+63 86 853 7788",
    socialMedia: "facebook.com/generikadrugstoreofficial",
    website: "https://www.generika.com.ph",
    operatingHours: "08:00 AM - 08:00 PM daily",
    coordinates: { lat: 8.2185, lng: 126.3601 },
    mapUrl: "https://www.google.com/maps/search/Generika+Drugstore+Poblacion+Bislig",
    rating: 4.5
  },
  {
    id: "city-vet-office",
    name: "City Veterinary Services Office",
    description: "The local government office providing public veterinary services, pet registration, rabies vaccinations, and livestock care.",
    longDescription: "The City Veterinary Services Office is located inside the City Hall Compound and handles agricultural and domestic animal health programs. Tourists and locals can visit for rabies vaccinations, pet medical consults, or to coordinate animal health certifications. They are highly active in maintaining public health standards across the municipality.",
    category: "Services & Others",
    image: "/assets/images/veterinary bislig.png",
    location: "City Hall Compound, Brgy. Poblacion, Bislig City",
    contact: "+63 86 853 6000",
    socialMedia: "facebook.com/cityvetbislig",
    website: "https://bislig.gov.ph/services/city-veterinary",
    operatingHours: "08:00 AM - 05:00 PM (Monday to Friday)",
    coordinates: { lat: 8.2180, lng: 126.3608 },
    mapUrl: "https://www.google.com/maps/search/City+Veterinary+Services+Office+Bislig",
    rating: 4.2
  }
];

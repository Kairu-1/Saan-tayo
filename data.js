/* =====================================================================
   data.js  —  ALL of your places and menus live here.

   This is the ONLY file you need to edit to update the website.
   Add a place, fix a price, save, refresh the browser. Done.

   HOW THE DATA IS SHAPED (read this once):

   PLACES is a list  [ ... ]
     └─ each place is an object  { ... }  with these fields:
          id           a unique short name, lowercase, no spaces (use dashes)
          name         what shows on the card
          type         "cafe"  or  "restaurant"   (exactly, lowercase)
          city         "Quezon City"  or  "Manila" (exactly, capital letters)
          area         the neighborhood, e.g. "Maginhawa"
          hours        opening hours as plain text
          description  one or two sentences about the place
          updated      when you last checked the prices, as text
          isSample     true = shows a "Sample" tag. DELETE this line for real places.
          menu         a list of categories
            └─ each category:  { category: "Coffee", items: [ ... ] }
                 └─ each item: { name: "Latte", price: 150, note: "optional" }

   RULES THAT PREVENT BUGS:
     - Every { } block needs a comma after it (except the very last one).
     - Text goes in "double quotes". Prices are plain numbers: 150, not "₱150".
     - "note" is optional. Delete the whole note line if you don't need it.
   ===================================================================== */

const PLACES = [

  /* ---------- QUEZON CITY ---------- */

  {
    id: "ube-and-bean",
    name: "Ube & Bean",
    type: "cafe",
    city: "Quezon City",
    area: "Maginhawa, Teachers Village",
    hours: "8:00 AM – 10:00 PM",
    description: "A cozy corner cafe with purple-tinted drinks and pastries. Sample data, replace me!",
    updated: "September 2026",
    isSample: true,
    menu: [
      {
        category: "Coffee",
        items: [
          { name: "Spanish Latte", price: 165, note: "Iced or hot" },
          { name: "Ube Latte", price: 180 },
          { name: "Americano", price: 120 }
        ]
      },
      {
        category: "Pastries",
        items: [
          { name: "Ube Cheese Pandesal", price: 85 },
          { name: "Basque Cheesecake slice", price: 195, note: "Best seller" },
          { name: "Butter Croissant", price: 110 }
        ]
      }
    ]
  },

  {
    id: "lolas-silog-house",
    name: "Lola's Silog House",
    type: "restaurant",
    city: "Quezon City",
    area: "Tomas Morato",
    hours: "6:00 AM – 11:00 PM",
    description: "All-day silog breakfasts and home-style Filipino comfort food. Sample data, replace me!",
    updated: "September 2026",
    isSample: true,
    menu: [
      {
        category: "Silog Meals",
        items: [
          { name: "Tapsilog", price: 185, note: "Beef tapa, garlic rice, egg" },
          { name: "Longsilog", price: 165 },
          { name: "Bangsilog", price: 175, note: "Fried bangus" }
        ]
      },
      {
        category: "Drinks",
        items: [
          { name: "Iced Tea", price: 60 },
          { name: "Calamansi Juice", price: 75 }
        ]
      }
    ]
  },

  {
    id: "katipunan-brew-bar",
    name: "Katipunan Brew Bar",
    type: "cafe",
    city: "Quezon City",
    area: "Katipunan",
    hours: "7:00 AM – 12:00 MN",
    description: "A study-friendly cafe near the universities, with fast wifi and long hours. Sample data, replace me!",
    updated: "September 2026",
    isSample: true,
    menu: [
      {
        category: "Espresso Bar",
        items: [
          { name: "Flat White", price: 150 },
          { name: "Cappuccino", price: 145 },
          { name: "Mocha", price: 160 }
        ]
      },
      {
        category: "Non-Coffee",
        items: [
          { name: "Matcha Latte", price: 170 },
          { name: "Hot Chocolate", price: 140 }
        ]
      }
    ]
  },

  /* ---------- MANILA ---------- */

  {
    id: "intramuros-grill-room",
    name: "Intramuros Grill Room",
    type: "restaurant",
    city: "Manila",
    area: "Intramuros",
    hours: "11:00 AM – 9:00 PM",
    description: "Grilled favorites and Filipino classics inside the walled city. Sample data, replace me!",
    updated: "September 2026",
    isSample: true,
    menu: [
      {
        category: "Mains",
        items: [
          { name: "Chicken Inasal", price: 245 },
          { name: "Sisig", price: 260, note: "Good for sharing" },
          { name: "Kare-Kare", price: 390 }
        ]
      },
      {
        category: "Desserts",
        items: [
          { name: "Halo-Halo", price: 165 },
          { name: "Leche Flan", price: 120 }
        ]
      }
    ]
  },

  {
    id: "malate-matcha-bar",
    name: "Malate Matcha Bar",
    type: "cafe",
    city: "Manila",
    area: "Malate",
    hours: "10:00 AM – 9:00 PM",
    description: "Matcha in every form, plus a few light bites. Sample data, replace me!",
    updated: "September 2026",
    isSample: true,
    menu: [
      {
        category: "Matcha",
        items: [
          { name: "Classic Matcha Latte", price: 175 },
          { name: "Strawberry Matcha", price: 195 },
          { name: "Matcha Affogato", price: 210 }
        ]
      },
      {
        category: "Bites",
        items: [
          { name: "Mochi Donut", price: 95 },
          { name: "Egg Sandwich", price: 155 }
        ]
      }
    ]
  },

  {
    id: "ermita-noodle-house",
    name: "Ermita Noodle House",
    type: "restaurant",
    city: "Manila",
    area: "Ermita",
    hours: "10:00 AM – 10:00 PM",
    description: "Hand-pulled noodles and dumplings, quick and filling. Sample data, replace me!",
    updated: "September 2026",
    isSample: true,
    menu: [
      {
        category: "Noodles",
        items: [
          { name: "Beef Mami", price: 180 },
          { name: "Pancit Canton", price: 210 },
          { name: "Wonton Noodle Soup", price: 195 }
        ]
      },
      {
        category: "Sides",
        items: [
          { name: "Siopao Asado", price: 90 },
          { name: "Pork Dumplings (5 pcs)", price: 140 }
        ]
      }
    ]
  }

  /* TO ADD A NEW PLACE:
     1. Copy one whole { ... } block above.
     2. Paste it right before the final  ];
     3. Put a comma after the block that comes before it.
     4. Change the text, delete the "isSample" line, save. */

];

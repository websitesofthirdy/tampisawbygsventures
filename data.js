/* ============================================================
   EDIT THIS FILE ONLY. Everything on the website comes from here.
   - Prices, names and text below are SAMPLES. Replace with real ones.
   - Photos: put files in the /images folder and write the file name
     (e.g. "images/hero.jpg"). Missing photos show a soft colour block.
   ============================================================ */
window.SITE = {
  name: "Tampisaw",
  operator: "GS Ventures",   // shows as "Tampisaw by GS Ventures". Leave "" to hide.
  tagline: "Island days, boodle lunches and floating cottages.",
  location: "Barangay Sample, Your Town, Your Province",
  currency: "₱",
  heroImage: "images/hero.jpg",
  logos: { gold: "images/logo-gold.png", brown: "images/logo-brown.png" },

  /* Slim banner at the very top. Leave "" to hide. SAMPLE offer, replace with a real one. */
  promo: "Barkada or family of 8 or more? Message us for a group rate.",

  /* Three short reasons to book. Edit freely. */
  perks: [
    ["Reply within the day", "We check your date and message you back with availability."],
    ["Pay by GCash or bank", "A small deposit holds your slot. Balance is paid on the day."],
    ["Rain? We rebook", "If the sea is unsafe, move to another date or get a full refund."]
  ],

  contact: {
    phone: "09XXXXXXXXX",              // used for the "Text us" button
    whatsapp: "639XXXXXXXXX",          // country code, no + or spaces
    messengerPage: "yourfacebookpage", // from facebook.com/yourfacebookpage
    email: "hello@example.com",
    facebook: "https://facebook.com/yourfacebookpage",
    hours: "Open daily, 7:00 AM to 6:00 PM"
  },

  payment: "We confirm availability first, then send GCash or bank details. Your slot is held once the deposit is in.",

  /* Packages: price is per adult. kidPrice is for ages 3 to 12. Under 3 is free. */
  packages: [
    {
      id: "island-day", tag: "Most booked", title: "Island Hopping Day",
      duration: "8 hours", price: 1200, kidPrice: 900,
      blurb: "Boat ride to the sandbars and islets, a swim stop, and a boodle lunch on the beach.",
      includes: ["Boat and boatman", "Boodle lunch", "Life vests", "Environmental fee"],
      image: "images/island-day.jpg"
    },
    {
      id: "floating-day", tag: "Great for groups", title: "Floating Cottage Day",
      duration: "8 hours", price: 450, kidPrice: 300,
      blurb: "Your own cottage on the water. Swim, fish, nap, repeat. Minimum of 7 guests.",
      includes: ["Floating cottage", "Use of tables and grill", "Life vests"],
      image: "images/floating.jpg"
    },
    {
      id: "sunset-food", tag: "Food trip", title: "Seafood Sunset Dinner",
      duration: "3 hours", price: 900, kidPrice: 600,
      blurb: "Grilled catch of the day, shellfish and fruit, served boodle style while the sun goes down.",
      includes: ["Seafood boodle", "Rice and drinks", "Sea-view table"],
      image: "images/sunset.jpg"
    },
    {
      id: "overnight", tag: "Overnight", title: "Overnight Escape",
      duration: "2 days, 1 night", price: 2500, kidPrice: 1800,
      blurb: "Island hopping, dinner, a night by the water and breakfast the next morning.",
      includes: ["Island hopping", "Dinner and breakfast", "Overnight stay", "Boat transfers"],
      image: "images/overnight.jpg"
    }
  ],

  /* Add-ons. unit "pax" = price per guest. unit "flat" = price per order. group: Activity or Food */
  addons: [
    { id: "water-rides", group: "Activity", title: "Inflatable water rides", note: "Speedboat-pulled, 15 minutes", price: 250, unit: "pax" },
    { id: "kayak", group: "Activity", title: "Kayak rental", note: "Per hour, 2 seats", price: 300, unit: "flat" },
    { id: "snorkel", group: "Activity", title: "Snorkel set", note: "Mask, snorkel and fins", price: 150, unit: "pax" },
    { id: "river-cruise", group: "Activity", title: "Mangrove river cruise", note: "1.5 hours", price: 350, unit: "pax" },
    { id: "boodle-s", group: "Food", title: "Seafood boodle", note: "Good for 3 to 4", price: 1100, unit: "flat" },
    { id: "boodle-l", group: "Food", title: "Seafood boodle", note: "Good for 6 to 8", price: 1899, unit: "flat" },
    { id: "bilao", group: "Food", title: "Bilao boodle", note: "Inasal, liempo, salad, rice. Good for 4 to 5", price: 1399, unit: "flat" },
    { id: "fruit", group: "Food", title: "Fruit platter", note: "Seasonal fruit", price: 375, unit: "flat" },
    { id: "lechon", group: "Food", title: "Whole lechon", note: "Order 2 days ahead", price: 7600, unit: "flat" }
  ],

  /* Overnight stays. price is per night for the whole room or cottage. */
  stays: [
    { id: "nipa", title: "Nipa cottage", sleeps: "Up to 4", price: 1800, note: "Fan, shared bathroom, sea breeze" },
    { id: "aircon", title: "Air-conditioned room", sleeps: "Up to 4", price: 3200, note: "Private bathroom, hot shower" },
    { id: "family", title: "Family villa", sleeps: "Up to 8", price: 5500, note: "Two rooms, kitchenette, veranda" }
  ],

  gallery: [
    { src: "images/g1.jpg", alt: "Boat on calm water" },
    { src: "images/g2.jpg", alt: "Floating cottages" },
    { src: "images/g3.jpg", alt: "Seafood boodle on banana leaves" },
    { src: "images/g4.jpg", alt: "Kids on the water rides" },
    { src: "images/g5.jpg", alt: "Sunset over the bay" },
    { src: "images/g6.jpg", alt: "Mangrove river" }
  ],

  faq: [
    ["How do I book?", "Use the trip planner on this page. It writes your inquiry for you and sends it to us on Messenger, WhatsApp or text. We reply with availability and payment details."],
    ["Do I pay online?", "Not on the website. After we confirm your date, you pay a deposit by GCash or bank transfer. The balance is paid on the day."],
    ["What if it rains?", "If the sea is unsafe or the trip is cancelled for weather, we move you to another date or refund you in full."],
    ["Can we bring our own food?", "Yes for picnic lunches on the beach. Grills and tables are available on request."],
    ["Are kids charged?", "Kids 3 to 12 pay the kid rate. Under 3 is free."],
    ["Is there a minimum group size?", "Most packages have no minimum. Floating cottages need at least 7 guests."]
  ]
};

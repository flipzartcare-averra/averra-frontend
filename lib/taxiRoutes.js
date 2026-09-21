// Drives pages/taxi/[slug].js — add a new route/service page by adding an
// entry here, no new page file needed. Distances/durations are
// approximate road figures for description purposes only; the actual
// booking form calculates real distance and fare independently (Google
// Maps + live admin-set meter rates), so nothing here needs to stay in
// perfect sync with pricing.
export const TAXI_PAGES = [
  {
    slug: "chandigarh-to-delhi-taxi",
    from: "Chandigarh",
    to: "Delhi",
    km: 250,
    duration: "4.5–5 hours",
    intro:
      "A fast, well-paved NH44 run connecting Punjab's planned capital to India's capital — the most-booked outstation route out of Chandigarh, popular with business travelers and families alike.",
    highlights: [
      "Smooth national highway for most of the drive, typically under 5 hours",
      "Popular for same-day return trips and airport connections to Delhi's IGI Airport",
      "Available as one-way or round trip, with local sightseeing stops on request",
    ],
  },
  {
    slug: "chandigarh-to-shimla-taxi",
    from: "Chandigarh",
    to: "Shimla",
    km: 115,
    duration: "3–3.5 hours",
    intro:
      "The classic hill-station run up NH5 through pine forests and switchback roads to Himachal's former summer capital — Mall Road, Kufri, and colonial-era architecture await.",
    highlights: [
      "Scenic mountain drive, best started early morning to beat weekend traffic near Shimla",
      "Popular weekend getaway — 2 days/1 night is a common plan",
      "SUV recommended in winter months for hill roads",
    ],
  },
  {
    slug: "chandigarh-to-manali-taxi",
    from: "Chandigarh",
    to: "Manali",
    km: 310,
    duration: "7–8 hours",
    intro:
      "A full-day drive through the Kullu valley to one of North India's most popular mountain destinations — Solang Valley, Old Manali, and gateway treks into the Himalayas.",
    highlights: [
      "Long drive — most riders split it with an overnight stop or start very early",
      "Best road conditions April–June and September–November; winter snow can close sections",
      "SUV or Prime SUV recommended for the mountain stretch beyond Kullu",
    ],
  },
  {
    slug: "chandigarh-to-amritsar-taxi",
    from: "Chandigarh",
    to: "Amritsar",
    km: 230,
    duration: "4–4.5 hours",
    intro:
      "A flat, quick highway drive to the Golden Temple and the Wagah Border ceremony — one of the most-requested single-day outstation trips from Chandigarh.",
    highlights: [
      "Flat highway driving, easy in any cab type",
      "Popular as a single-day round trip — Golden Temple in the morning, Wagah Border in the evening",
      "Try Amritsari kulcha and lassi on the way",
    ],
  },
  {
    slug: "chandigarh-to-dharamshala-taxi",
    from: "Chandigarh",
    to: "Dharamshala",
    km: 240,
    duration: "6–6.5 hours",
    intro:
      "Home to the Dalai Lama's residence and McLeod Ganj's Tibetan culture, monasteries, and mountain cafés — a favorite for travelers seeking a quieter hill destination than Shimla or Manali.",
    highlights: [
      "Hilly roads for the second half of the drive — SUV recommended",
      "McLeod Ganj sits above the main town; confirm your exact drop point when booking",
      "Good base for short treks like Triund",
    ],
  },
  {
    slug: "chandigarh-to-dalhousie-taxi",
    from: "Chandigarh",
    to: "Dalhousie",
    km: 320,
    duration: "7.5–8 hours",
    intro:
      "A colonial-era hill town spread across five hills, less crowded than Shimla or Manali, with cooler weather and views toward the Dhauladhar range.",
    highlights: [
      "One of the longer hill routes from Chandigarh — an early start is worth it",
      "Often combined with a Khajjiar stop en route (\"Mini Switzerland\")",
      "Cooler climate even in peak summer",
    ],
  },
  {
    slug: "chandigarh-to-rishikesh-taxi",
    from: "Chandigarh",
    to: "Rishikesh",
    km: 235,
    duration: "5.5–6 hours",
    intro:
      "The yoga capital of the world on the banks of the Ganges — river rafting, the Beatles Ashram, and the evening Ganga Aarti at Triveni Ghat.",
    highlights: [
      "Mostly flat and hill roads combined — comfortable in a Sedan or SUV",
      "Popular with rafting groups and yoga retreat travelers",
      "Often paired with a Haridwar stop, just 25km away",
    ],
  },
  {
    slug: "chandigarh-to-haridwar-taxi",
    from: "Chandigarh",
    to: "Haridwar",
    km: 210,
    duration: "5–5.5 hours",
    intro:
      "One of Hinduism's holiest cities on the Ganges — Har Ki Pauri ghat and its evening aarti are the main draw, along with easy access to Rishikesh and Dehradun.",
    highlights: [
      "Comfortable highway-and-hill mix, suitable for any cab type",
      "Time your trip to catch the evening Ganga Aarti at Har Ki Pauri",
      "Good jumping-off point for Rishikesh (25km) or Dehradun (55km)",
    ],
  },
  {
    slug: "chandigarh-to-dehradun-taxi",
    from: "Chandigarh",
    to: "Dehradun",
    km: 190,
    duration: "4.5–5 hours",
    intro:
      "Uttarakhand's capital, a green, laid-back city that's also the gateway to Mussoorie, Rishikesh, and Haridwar for a longer Himalayan foot region trip.",
    highlights: [
      "Comfortable drive, good as a single day-trip base for the wider region",
      "Combine with Mussoorie (35km further) for a hill-station add-on",
      "Popular with families visiting Doon School and FRI campus",
    ],
  },
  {
    slug: "chandigarh-to-jaipur-taxi",
    from: "Chandigarh",
    to: "Jaipur",
    km: 415,
    duration: "7.5–8 hours",
    intro:
      "The Pink City — Amber Fort, City Palace, Hawa Mahal, and Rajasthan's royal heritage, a long but popular outstation run for a multi-day Rajasthan trip.",
    highlights: [
      "One of the longer routes on offer — most riders plan an overnight stay rather than a same-day return",
      "Good starting point for a wider Golden Triangle or Rajasthan itinerary",
      "Prime Sedan or SUV recommended for the distance",
    ],
  },
  {
    slug: "chandigarh-to-agra-taxi",
    from: "Chandigarh",
    to: "Agra",
    km: 445,
    duration: "8–8.5 hours",
    intro:
      "Home to the Taj Mahal, Agra Fort, and Fatehpur Sikri — a long-distance run usually booked as part of a multi-day trip rather than a same-day round trip.",
    highlights: [
      "The longest route on offer from Chandigarh — plan for an overnight stay",
      "Best visited early morning for the Taj Mahal to avoid crowds and heat",
      "Often combined with Jaipur and Delhi as a Golden Triangle circuit",
    ],
  },
  {
    slug: "chandigarh-to-ambala-taxi",
    from: "Chandigarh",
    to: "Ambala",
    km: 50,
    duration: "1–1.5 hours",
    intro:
      "A short, quick run down NH44 — mostly booked for onward Ambala Cantt railway station connections or as the first leg of a longer Delhi-bound trip.",
    highlights: [
      "Under 90 minutes on a clear road — no need for an SUV here",
      "Popular for railway station drops and pickups",
      "Often booked as a local/one-way trip rather than a full outstation package",
    ],
  },
  {
    slug: "chandigarh-to-amritsar-airport-taxi",
    from: "Chandigarh",
    to: "Amritsar Airport",
    km: 230,
    duration: "4–5 hours",
    intro:
      "Direct pickup and drop for Sri Guru Ram Dass Jee International Airport (ATQ), timed to your flight rather than a fixed schedule — the same NH1 route as the regular Amritsar city run.",
    highlights: [
      "Flight-number tracking on request, so pickup time adjusts to delays",
      "Same road as the Chandigarh–Amritsar city route via Ludhiana and Jalandhar",
      "Book as one-way if you're only flying in or out, round trip if returning by road",
    ],
  },
  {
    slug: "chandigarh-to-delhi-airport-taxi",
    from: "Chandigarh",
    to: "Delhi Airport",
    km: 260,
    duration: "5–6 hours",
    intro:
      "Direct drop at IGI Airport (DEL) via Ambala and Panipat — a few kilometers and a few minutes longer than the city-center Delhi run, timed around your flight.",
    highlights: [
      "Flight-time-aware pickup, same as our Chandigarh airport service",
      "Slightly longer than the Chandigarh–Delhi city route due to airport approach traffic",
      "Book extra buffer time for Terminal 3 international departures",
    ],
  },
  {
    slug: "chandigarh-to-jalandhar-taxi",
    from: "Chandigarh",
    to: "Jalandhar",
    km: 155,
    duration: "3–4 hours",
    intro:
      "A straightforward Punjab highway run through Ludhiana — a common choice for business travel and family visits across the state.",
    highlights: [
      "Flat, fast highway for the whole drive",
      "Often booked as same-day round trip for business meetings",
      "Comfortable in any cab type",
    ],
  },
  {
    slug: "chandigarh-to-kasauli-taxi",
    from: "Chandigarh",
    to: "Kasauli",
    km: 60,
    duration: "2–2.5 hours",
    intro:
      "The closest genuine hill station to Chandigarh — a quiet colonial-era cantonment town, small enough to see properly in a single day trip.",
    highlights: [
      "Shortest hill-station drive on offer — good for a half-day or full-day trip",
      "Quieter and less commercialized than Shimla",
      "Popular as a local/hourly booking with waiting time built in",
    ],
  },
  {
    slug: "chandigarh-to-khajjiar-taxi",
    from: "Chandigarh",
    to: "Khajjiar",
    km: 350,
    duration: "9–11 hours",
    intro:
      "Known as \"Mini Switzerland\" for its saucer-shaped meadow ringed by deodar forest — usually visited as a short detour on the way to or from Dalhousie rather than as a standalone destination.",
    highlights: [
      "One of the longest drives on offer — most riders combine it with an overnight stay in Dalhousie",
      "Best paired with the Chandigarh to Dalhousie route rather than booked alone",
      "SUV recommended for the mountain roads beyond Pathankot",
    ],
  },
  {
    slug: "chandigarh-to-ludhiana-taxi",
    from: "Chandigarh",
    to: "Ludhiana",
    km: 105,
    duration: "2–3 hours",
    intro:
      "Punjab's largest city and an industrial hub — a quick, flat highway drive that's popular for both business travel and family visits.",
    highlights: [
      "Comfortable under-3-hour highway drive",
      "Frequently booked as a same-day round trip",
      "Good starting point for onward Jalandhar or Amritsar travel",
    ],
  },
  {
    slug: "chandigarh-to-mcleodganj-taxi",
    from: "Chandigarh",
    to: "McLeod Ganj",
    km: 250,
    duration: "6–7 hours",
    intro:
      "The upper, Tibetan-culture half of the Dharamshala area — monasteries, mountain cafés, and the Dalai Lama's residence, sitting above the main town.",
    highlights: [
      "Same route as Chandigarh to Dharamshala, with a short additional climb to McLeod Ganj itself",
      "Confirm your exact drop point when booking — McLeod Ganj and lower Dharamshala are separate areas",
      "Good base for the short Triund trek",
    ],
  },
  {
    slug: "chandigarh-to-mohali-taxi",
    from: "Chandigarh",
    to: "Mohali",
    km: 12,
    duration: "30–60 minutes",
    intro:
      "A short local hop within the tricity area — commonly booked for airport connections, the cricket stadium, or IT park commutes.",
    highlights: [
      "Quick local trip, any cab type works fine",
      "Popular for Chandigarh International Airport connections (the airport itself sits in Mohali)",
      "Best booked as a local/one-way trip rather than outstation",
    ],
  },
  {
    slug: "chandigarh-to-mussoorie-taxi",
    from: "Chandigarh",
    to: "Mussoorie",
    km: 200,
    duration: "5–6 hours",
    intro:
      "The \"Queen of the Hills\" above Dehradun — Mall Road, Kempty Falls, and sweeping Himalayan views, reached via a short climb after the Dehradun leg of the drive.",
    highlights: [
      "Same route as Chandigarh to Dehradun, with an additional hour's climb to Mussoorie",
      "Weekend traffic on the final hill stretch can add significant time — leave early",
      "Good combination trip with Dehradun or Rishikesh",
    ],
  },
  {
    slug: "chandigarh-to-panchkula-taxi",
    from: "Chandigarh",
    to: "Panchkula",
    km: 15,
    duration: "30–60 minutes",
    intro:
      "A short local trip within the tricity — Panchkula sits just across the Chandigarh border in Haryana.",
    highlights: [
      "Quick, simple local trip in any cab type",
      "Popular for Pinjore Gardens day trips, which lie just beyond Panchkula",
      "Best booked as a local trip rather than outstation",
    ],
  },
  {
    slug: "chandigarh-to-patiala-taxi",
    from: "Chandigarh",
    to: "Patiala",
    km: 70,
    duration: "1.5–2 hours",
    intro:
      "The former princely state capital, known for Qila Mubarak and its distinctive Patiala-shahi architecture — a quick, comfortable highway drive from Chandigarh.",
    highlights: [
      "Short, easy drive on a good road",
      "Popular for both day trips and same-day round-trip business travel",
      "Comfortable in a Hatchback or Sedan",
    ],
  },
  {
    slug: "delhi-to-chandigarh-taxi",
    from: "Delhi",
    to: "Chandigarh",
    km: 245,
    duration: "4–5 hours",
    intro:
      "The reverse of our most-booked route — a fast NH44 run from Delhi up to Chandigarh, popular for business travel and Punjab/Himachal-bound trips starting from the capital.",
    highlights: [
      "Same well-paved NH44 highway as the Chandigarh to Delhi run",
      "Available as a one-way pickup from anywhere in Delhi NCR",
      "Good first leg for a longer Punjab or Himachal itinerary",
    ],
  },
  {
    slug: "ludhiana-to-chandigarh-taxi",
    from: "Ludhiana",
    to: "Chandigarh",
    km: 105,
    duration: "2–3 hours",
    intro:
      "A quick, flat highway drive connecting Punjab's largest city to Chandigarh — commonly booked for business travel and airport connections.",
    highlights: [
      "Comfortable under-3-hour drive on a well-maintained road",
      "Popular for Chandigarh International Airport connections",
      "Available one-way or round trip",
    ],
  },
];

export const SERVICE_PAGES = [
  {
    slug: "chandigarh-airport-taxi",
    from: "Chandigarh",
    to: "",
    title: "Chandigarh Airport Taxi",
    intro:
      "Reliable pickup and drop for Chandigarh International Airport (IXC) — flight-timed pickups, meet-and-greet at arrivals, and upfront fares with no surge pricing during peak flight hours.",
    highlights: [
      "Flight-time-aware pickups — tell us your flight number and we track delays",
      "Available for arrivals and departures, any hour",
      "Covers Chandigarh, Mohali, Panchkula, and Zirakpur pickup points",
    ],
  },
  {
    slug: "chandigarh-outstation-taxi",
    from: "Chandigarh",
    to: "",
    title: "Chandigarh Outstation Taxi",
    intro:
      "One-way and round-trip outstation cabs from Chandigarh to anywhere in North India — hill stations, pilgrimage towns, and other major cities, all with upfront, meter-clear pricing.",
    highlights: [
      "One-way and round-trip options for every route below",
      "Hatchback through Prime SUV — pick what fits your group and route",
      "No surge pricing, no hidden tolls or driver-allowance surprises",
    ],
  },
  {
    slug: "chandigarh-local-taxi",
    from: "Chandigarh",
    to: "",
    title: "Chandigarh Local Taxi",
    intro:
      "Hourly and half-day local cabs for getting around Chandigarh and the wider tricity area (Mohali, Panchkula, Zirakpur) — sightseeing, errands, or multiple stops with waiting time built in.",
    highlights: [
      "Book by the hour rather than a fixed point-to-point fare",
      "Covers Chandigarh, Mohali, Panchkula, and Zirakpur",
      "Good fit for a day of sightseeing with several stops (Rock Garden, Sukhna Lake, Rose Garden)",
    ],
  },
  {
    slug: "chandigarh-one-way-taxi",
    from: "Chandigarh",
    to: "",
    title: "Chandigarh One-Way Taxi",
    intro:
      "Pay only for the distance you actually travel — a one-way outstation cab from Chandigarh, without booking a return leg you don't need.",
    highlights: [
      "No return-leg charge — useful when you're flying, training, or busing back",
      "Available on every route this site covers",
      "Same upfront, meter-clear pricing as round-trip bookings",
    ],
  },
  {
    slug: "chandigarh-round-trip-taxi",
    from: "Chandigarh",
    to: "",
    title: "Chandigarh Round-Trip Taxi",
    intro:
      "The same cab and driver for your whole outstation trip, out and back — the simpler option when you know your return date in advance.",
    highlights: [
      "One booking covers both legs of the trip",
      "The same driver, who already knows your itinerary, brings you home",
      "Often more cost-effective than booking two separate one-way trips",
    ],
  },
];

export function findTaxiPage(slug) {
  return (
    TAXI_PAGES.find((p) => p.slug === slug) ||
    SERVICE_PAGES.find((p) => p.slug === slug) ||
    null
  );
}

export function allTaxiSlugs() {
  return [...TAXI_PAGES.map((p) => p.slug), ...SERVICE_PAGES.map((p) => p.slug)];
}

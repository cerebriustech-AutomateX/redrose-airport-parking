export const companyInfo = {
  name: "Red Rose Airport Parking Ltd",
  tradingName: "RedRose Airport Parking",
  airport: "Manchester Airport",
  facilityPostcode: "SK9 4JL",
  operationsPhone: "07707 787612",
  operationsPhoneDisplay: "07707 787612",
  email: "info@redroseparking.co.uk",
  website: "https://redroseparking.com",
  shuttleChargeTotal: 16,
  shuttleChargePerLeg: 8,
  facilityDistance: "3 to 6 miles from Manchester Airport",
  transferTime: "10 to 20 minutes depending on traffic",
  maxShuttleWait: "up to 15 minutes during busy periods",
  pricingValidFrom: "15 June 2026",
  pricingValidUntil: "31 December 2027",
  extraDayParkRide: 5,
  extraDayMeetGreet: 10,
} as const;

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Services", href: "/#services" },
  { label: "Travel Extras", href: "/#travel-extras" },
  { label: "Contact", href: "/#contact" },
] as const;

export const trustPoints = [
  "Manchester Airport Parking",
  "Park & Ride & Meet & Greet",
  "Secure Compounds",
  "Operations Team: 07707 787612",
] as const;

export const parkingServices = [
  { value: "park-ride", label: "Park & Ride" },
  { value: "meet-greet", label: "Meet & Greet" },
] as const;

export const howItWorksSteps = [
  {
    number: "01",
    title: "Book Online",
    description:
      "Choose your dates and service. Full payment is required before your booking is confirmed.",
  },
  {
    number: "02",
    title: "Arrive & Check In",
    description:
      "Drive to our facility (SK9 4JL), call 07707 787612 30 minutes before arrival, and hand your keys in at reception.",
  },
  {
    number: "03",
    title: "Shuttle & Return",
    description:
      "Our shuttle takes you to your terminal. On return, call us after landing and we will collect you from the same drop-off point.",
  },
] as const;

export const whyChooseCards = [
  {
    title: "Secure Parking",
    description:
      "Your vehicle is stored at our secure compounds, located approximately 3 to 6 miles from Manchester Airport.",
  },
  {
    title: "Shuttle Transfers",
    description:
      "Shuttle vehicles are normally available immediately, with an estimated transfer time of 10 to 20 minutes.",
  },
  {
    title: "Clear Instructions",
    description:
      "Step-by-step departure and arrival guidance is provided with your booking confirmation.",
  },
  {
    title: "Operations Support",
    description:
      "Contact our Operations Team on 07707 787612 for assistance at any stage of your journey.",
  },
] as const;

export const serviceCards = [
  {
    title: "Park & Ride",
    description:
      "Drive to our secure facility, hand your keys at reception, and take our shuttle to your departure terminal.",
  },
  {
    title: "Meet & Greet",
    description:
      "Premium convenience at Manchester Airport — a dedicated service for travellers who want the smoothest handover.",
  },
] as const;

export const travelExtraCards = [
  {
    title: "Airport Hotels",
    description:
      "Compare hotel stays near major UK airports through our trusted hotel booking partner.",
  },
] as const;

export const storyCards = [
  {
    title: "Your Booking",
    description:
      "Reserve your dates and service online. Full payment is required before your booking is confirmed.",
  },
  {
    title: "Arrival Instructions",
    description:
      "Drive to SK9 4JL, call 07707 787612 30 minutes before arrival, and check in at reception.",
  },
  {
    title: "Secure Parking",
    description:
      "Your vehicle is stored at our secure compounds while you travel from Manchester Airport.",
  },
  {
    title: "Return Collection",
    description:
      "Call us after landing and our shuttle will return you to the facility to collect your vehicle.",
  },
] as const;

export const departureSteps = [
  "On the day of your departure, drive directly to our parking facility using postcode SK9 4JL.",
  "Call our Operations Team on 07707 787612 approximately 30 minutes before arriving.",
  "Upon arrival, park in the designated area and proceed to reception.",
  "Hand your vehicle keys to a member of staff at reception.",
  "A shuttle driver will transfer you to your departure terminal at Manchester Airport.",
  "A shuttle transportation charge of £16 per vehicle is payable directly to the driver (£8 on departure and £8 on return). Payment can be made by cash or card.",
] as const;

export const arrivalSteps = [
  "After landing and collecting your luggage, call 07707 787612.",
  "Proceed to the same collection point where you were originally dropped off.",
  "Our shuttle driver will collect you and return you to the parking facility.",
  "Upon arrival at the parking facility, your vehicle keys will be returned to you.",
  "Inspect your vehicle before leaving the premises. Any concerns must be reported before departure.",
] as const;

export const importantInfo = [
  {
    title: "Parking Facility",
    body: "Our parking facilities are located approximately 3 to 6 miles from Manchester Airport, with an estimated transfer time of between 10 and 20 minutes depending on traffic conditions.",
  },
  {
    title: "Shuttle Service",
    body: "Shuttle vehicles are normally available immediately. However, during busy periods there may be a waiting time of up to 15 minutes.",
  },
  {
    title: "Shuttle Transportation Charge",
    body: "A shuttle transportation charge of £16 per vehicle applies (£8 each way). This charge contributes towards airport access charges, vehicle operating costs and transfer services. It applies per vehicle (not per passenger), is separate from the parking fee, and is payable directly to the shuttle driver by cash or card.",
  },
] as const;

export const pricingTiers = [
  { days: 1, parkRide: 34, meetGreet: 44 },
  { days: 2, parkRide: 37, meetGreet: 47 },
  { days: 3, parkRide: 40, meetGreet: 50 },
  { days: 4, parkRide: 42, meetGreet: 52 },
  { days: 5, parkRide: 45, meetGreet: 55 },
  { days: 6, parkRide: 47, meetGreet: 57 },
  { days: 7, parkRide: 50, meetGreet: 60 },
  { days: 8, parkRide: 52, meetGreet: 62 },
  { days: 9, parkRide: 53, meetGreet: 63 },
  { days: 10, parkRide: 55, meetGreet: 65 },
  { days: 11, parkRide: 57, meetGreet: 67 },
  { days: 12, parkRide: 60, meetGreet: 70 },
  { days: 13, parkRide: 63, meetGreet: 73 },
  { days: 14, parkRide: 65, meetGreet: 75 },
  { days: 15, parkRide: 68, meetGreet: 78 },
  { days: 16, parkRide: 70, meetGreet: 80 },
  { days: 17, parkRide: 72, meetGreet: 82 },
  { days: 18, parkRide: 75, meetGreet: 85 },
  { days: 19, parkRide: 77, meetGreet: 87 },
  { days: 20, parkRide: 79, meetGreet: 89 },
  { days: 21, parkRide: 82, meetGreet: 92 },
  { days: 22, parkRide: 85, meetGreet: 95 },
  { days: 23, parkRide: 87, meetGreet: 97 },
  { days: 24, parkRide: 90, meetGreet: 100 },
  { days: 25, parkRide: 94, meetGreet: 104 },
  { days: 26, parkRide: 96, meetGreet: 106 },
  { days: 27, parkRide: 98, meetGreet: 108 },
  { days: 28, parkRide: 105, meetGreet: 115 },
  { days: 29, parkRide: 110, meetGreet: 120 },
  { days: 30, parkRide: 120, meetGreet: 130 },
] as const;

export const termsSections = [
  {
    title: "1. Bookings & Confirmation",
    items: [
      "A booking is only confirmed once full payment has been received and a booking confirmation reference has been issued.",
      "Customers are responsible for ensuring all booking information is accurate.",
      "Bookings are valid only for the dates, times and vehicle specified.",
      "Bookings are non-transferable unless approved in writing.",
      "We reserve the right to refuse service where inaccurate booking information has been provided.",
    ],
  },
  {
    title: "2. Arrival Procedures",
    items: [
      "Customers must follow arrival instructions supplied with their booking confirmation and allow sufficient time for handover procedures.",
      "We accept no responsibility for delays caused by traffic, weather, security incidents, airport operational issues or other circumstances beyond our control.",
    ],
  },
  {
    title: "3. Return Procedures",
    items: [
      "Customers must notify us upon landing.",
      "Vehicle delivery times are estimates and may be affected by airport traffic, security restrictions and operational requirements.",
    ],
  },
  {
    title: "4. Park & Ride Service",
    items: [
      "Customers should allow sufficient time for transfers.",
      "Transfer times are estimates and may vary due to traffic and airport conditions.",
    ],
  },
  {
    title: "5. Payment Terms",
    items: [
      "Full payment is required before service commencement.",
      "Additional charges may apply for extended stays, late collections, terminal changes or incorrect booking information.",
    ],
  },
  {
    title: "6. Cancellations & Amendments",
    items: [
      "Cancellations more than 48 hours before service commencement may be eligible for a refund less administration fees.",
      "No refunds are available within 48 hours of the booking start time.",
    ],
  },
  {
    title: "7. Vehicle Condition & Customer Responsibilities",
    items: [
      "Vehicles must be roadworthy, insured and legally compliant.",
      "Customers must remove valuables and disclose any vehicle faults before handover.",
    ],
  },
  {
    title: "8. Vehicle Movement & Storage",
    items: [
      "Customers authorise Red Rose Airport Parking to move, park, store and reposition vehicles as required.",
      "Vehicles may be relocated between secure compounds for operational reasons.",
    ],
  },
  {
    title: "9. Damage Reporting",
    items: [
      "Any alleged damage must be reported before leaving the collection point.",
      "Claims reported later may be rejected where evidence is unavailable.",
    ],
  },
  {
    title: "10. Liability & Insurance",
    items: [
      "Red Rose Airport Parking maintains appropriate motor trade insurance.",
      "Liability is limited to direct loss or damage caused by proven negligence.",
      "Nothing excludes liability that cannot legally be excluded under UK law.",
    ],
  },
  {
    title: "11. Exclusions",
    items: [
      "We are not liable for normal wear and tear, mechanical failures, flat batteries, tyre punctures, stone chips, acts of nature or losses not caused by our negligence.",
    ],
  },
  {
    title: "12. Abandoned Vehicles",
    items: [
      "Vehicles remaining uncollected for more than 30 days may be treated as abandoned and storage charges will continue to accrue.",
    ],
  },
  {
    title: "13. CCTV & Data Protection",
    items: [
      "Customer vehicles may be monitored by CCTV.",
      "Personal information will be processed in accordance with UK GDPR and applicable legislation.",
    ],
  },
  {
    title: "14. Force Majeure",
    items: [
      "We shall not be liable for failures caused by events beyond our reasonable control, including airport closures, severe weather, industrial disputes or government action.",
    ],
  },
  {
    title: "15. Governing Law",
    items: [
      "These Terms & Conditions are governed by the laws of England and Wales and subject to the jurisdiction of the courts of England and Wales.",
    ],
  },
] as const;

export const footerQuickLinks = [
  { label: "Home", href: "/#home" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Book Parking", href: "/#book" },
] as const;

export const footerInfoLinks = [
  { label: "Park & Ride Procedures", href: "/procedures" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

export const footerLegalLinks = footerInfoLinks;

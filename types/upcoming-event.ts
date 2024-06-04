import { ImageItem } from "./image";
import { Language } from "./languages";
import { MenuContent } from "./ui-content";

type LogoUpcomingEvent = {
  image: string;
  textImage?: string;
  width: number;
  height: number;
};

type RetreatSchedule = {
  day: string;
  events: { time: string; description: string; subEvents?: string[] }[];
}[];

export type Offer = {
  description: string;
  price: number;
  quantity: number;
  title: string;
  totalPrice: string;
  tax?: boolean;
};

type MetadataType = {
  title: string;
  description: string;
  openGraph?: {
    title?: string;
    description?: string;
    image: string;
  };
};

export type UpcomingEvent = {
  date: string;
  cta: string;
  images?: ImageItem[];
  logo: LogoUpcomingEvent;
  retreatSchedule?: RetreatSchedule;
  link: MenuContent;
  metadata: MetadataType;
  location: string;
  readMore: string;
  offerOptions?: Offer[];
  time: string;
  title: string;
  slogan: string;
  description: string;
};

export type LocaleUpcomingEvent = Record<Language, UpcomingEvent>;

const roomOptions: Record<Language, Offer[]> = {
  en: [
    {
      title: "4-Person Room",
      quantity: 12,
      price: 720,
      tax: true,
      totalPrice: "$827.82",
      description: "Superpose beds, this room is both conforable and immersive",
    },
    {
      title: "2-Person Room",
      quantity: 3,
      price: 770,
      tax: true,
      totalPrice: "$885.31",
      description:
        "Double bed for two people, this room is perfect for couples or friends",
    },
  ],
  fr: [
    {
      title: "Chambre 4 Personnes",
      quantity: 12,
      price: 720,
      tax: true,
      totalPrice: "$827.82",
      description:
        "Lits superposés, cette chambre est à la fois confortable et immersive",
    },
    {
      title: "Chambre 2 Personnes",
      quantity: 3,
      price: 770,
      tax: true,
      totalPrice: "$885.31",
      description: "Lit double pour deux personnes, idéal pour les couples",
    },
  ],
};

const local108ImagesEn: ImageItem[] = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2Ftemple1.jpeg?alt=media&token=451a12ac-c091-4902-a156-ad76759de3d6",
    alt: "Dining Hall",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2Ftemple2.jpeg?alt=media&token=a19c5959-863c-464d-8e15-2dc6a08edd9c",
    alt: "Hallway",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2Ftemple4.jpeg?alt=media&token=fea41237-908a-438a-ac35-9c7bdacd4e04",
    alt: "Le Temple",
    main: true,
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2Ftemple3.jpeg?alt=media&token=dbafa4db-642a-4204-9070-180533e560de",
    alt: "Green Room",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2F441521421_845440597416435_6942327833745152053_n%20(1).jpg?alt=media&token=a7732820-c63c-40e0-acc2-d696c7964a84",
    alt: "Rooms",
  },
];

const local108ImagesFr: ImageItem[] = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2Ftemple1.jpeg?alt=media&token=451a12ac-c091-4902-a156-ad76759de3d6",
    alt: "Salle à manger",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2Ftemple2.jpeg?alt=media&token=a19c5959-863c-464d-8e15-2dc6a08edd9c",
    alt: "Couloir",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2Ftemple4.jpeg?alt=media&token=fea41237-908a-438a-ac35-9c7bdacd4e04",
    alt: "Le Temple",
    main: true,
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2Ftemple3.jpeg?alt=media&token=dbafa4db-642a-4204-9070-180533e560de",
    alt: "Salle verte",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2F441521421_845440597416435_6942327833745152053_n%20(1).jpg?alt=media&token=a7732820-c63c-40e0-acc2-d696c7964a84",
    alt: "Chambres",
  },
];

const retreatScheduleFr: RetreatSchedule = [
  {
    day: "1ère journée",
    events: [
      { time: "17h00", description: "Arrivée des participants" },
      {
        time: "18h00",
        description:
          "Présentation de la retraite à Local 108, rencontre avec l'équipe : Maï, Js et Pam",
      },
      { time: "19h30", description: "Souper - soupe et petits repas" },
      {
        time: "20h15",
        description: "Introduction aux chakras Muladhara et Svadhistana",
        subEvents: [
          "Cérémonie de feu et enracinement (pieds nus), intentions pour la retraite (à l'extérieur)",
          "Méditation, intentions pour la retraite, lâcher prise, bain sonore (salle quartz)",
        ],
      },
    ],
  },
  {
    day: "2ème journée",
    events: [
      {
        time: "6h00",
        description:
          "Marche méditative silencieuse et méditation du chakra Manipura au lac",
      },
      {
        time: "7h30",
        description: "Salutation au soleil - yoga vitalité (recharge)",
      },
      {
        time: "8h45 - 10h00",
        description:
          "Nutri Lab - smoothies et explication du petit déjeuner par JS et Mai à Local 108",
      },
      { time: "11h30", description: "Pilates avec Pam" },
      { time: "13h00 - 14h30", description: "Dîner et temps pour discuter" },
      {
        time: "15h00 - 16h45",
        description:
          "Atelier de nutrition ayurvédique avec une professeure invitée",
      },
      { time: "17h00", description: "Atelier de création Anahata avec Mai" },
      { time: "18h30 - 19h45", description: "Souper" },
      {
        time: "20h00",
        description:
          "Vishuddha et Ajna - rituel de la voix intérieure et de l'abondance avec tambours et mantras (salle quartz)",
      },
    ],
  },
  {
    day: "3ème journée",
    events: [
      {
        time: "8h30",
        description: "Petit déjeuner Nutri Lab (similaire au jour précédent)",
      },
      { time: "10h00 - 11h45", description: "Atelier de yoga" },
      {
        time: "12h00 - 13h00",
        description:
          "Sahasrara : les mille pétales - intégration des chakras, retours et mots de clôture",
      },
      { time: "13h00", description: "Diner final" },
      { time: "15h00", description: "Fête de danse transe yoga sans alcool" },
    ],
  },
];

const retreatScheduleEn: RetreatSchedule = [
  {
    day: "Day 1",
    events: [
      { time: "5:00 PM", description: "Participant Arrival" },
      {
        time: "6:00 PM",
        description:
          "Retreat Introduction at Local 108, Meet the Team: Maï, Js, and Pam",
      },
      { time: "7:30 PM", description: "Dinner - Soup and Light Meals" },
      {
        time: "8:15 PM",
        description: "Chakra Muladhara & Chakra Svadhistana Introduction",
        subEvents: [
          "Fire Ceremony and Grounding (barefoot), Retreat Intentions (Outdoors)",
          "Meditation, Retreat Intentions, Letting Go, Sound Bath (Quartz Room)",
        ],
      },
    ],
  },
  {
    day: "Day 2",
    events: [
      {
        time: "6:00 AM",
        description:
          "Silent Meditation Walk and Manipura Chakra Meditation by the Lake",
      },
      {
        time: "7:30 AM",
        description: "Sun Salutation - Vitality Yoga (Recharge)",
      },
      {
        time: "8:45 - 10:00 AM",
        description:
          "Nutri Lab - Smoothies and Breakfast Explanation by JS and Mai at Local 108",
      },
      { time: "11:30 AM", description: "Pilates with Pam" },
      { time: "1:00 - 2:30 PM", description: "Lunch and Social Time" },
      {
        time: "3:00 - 4:45 PM",
        description: "Ayurvedic Nutrition Workshop with Guest Teacher",
      },
      { time: "5:00 PM", description: "Anahata Creation Workshop with Mai" },
      { time: "6:30 - 7:45 PM", description: "Dinner" },
      {
        time: "8:00 PM",
        description:
          "Vishuddha and Ajna - Inner Voice and Abundance Ritual with Drums and Mantras (Quartz Room)",
      },
    ],
  },
  {
    day: "Day 3",
    events: [
      {
        time: "8:30 AM",
        description: "Nutri Lab Breakfast (Similar to Previous Day)",
      },
      { time: "10:00 - 11:45 AM", description: "Yoga Workshop" },
      {
        time: "12:00 - 1:00 PM",
        description:
          "Sahasrara: The Thousand Petals - Chakra Integration, Feedback, Closing Words",
      },
      { time: "1:00 PM", description: "Final Dinner" },
      {
        time: "3:00 PM",
        description: "Non-Alcoholic Yoga Trance Dance Party",
      },
    ],
  },
];

export const upcomingEventsLocal108: Record<Language, UpcomingEvent> = {
  en: {
    time: "First day starts at 17h; event lasts 3 days.",
    cta: "Book Now - Limited Availability",
    title: "Le Temple - 2024 Retreat",
    slogan: "Unlock Your Inner Universe",
    description:
      "Join us for an enlightening three-day retreat designed to balance and activate your chakras through a series of workshops including yoga, Pilates, meditation, and nutritional guidance. Experience unique ceremonies like fire rituals, sound baths, and a special 'Yoga Trance Dance Party'. Embrace the serene environment and our supportive community to rediscover and rejuvenate your spiritual and physical wellness.",
    link: {
      title: "Upcoming Event",
      path: "/upcoming/le-temple",
    },
    metadata: {
      title:
        "Le Temple - Nutrition, Yoga and Pilates Retreat 2024 (by Local 108)",
      description:
        "Join us for an enlightening three-day retreat designed to balance and activate your chakras through a series of workshops including yoga, Pilates, meditation, and nutritional guidance. Experience unique ceremonies like fire rituals, sound baths, and a special 'Yoga Trance Dance Party'. Embrace the serene environment and our supportive community to rediscover and rejuvenate your spiritual and physical wellness.",
    },
    date: "June 15th, 2022",
    readMore: "See Event",
    logo: {
      image:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2F441565959_777008257833404_5160639013579270975_n.jpg?alt=media&token=78844043-0539-4dc5-a84e-17fd29f65cf7",
      textImage:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2F441991889_988150149653903_4600873154933502940_n.png?alt=media&token=63d19830-4390-4e0b-b7d8-57a8cb23452f",
      width: 80,
      height: 80,
    },

    location: "Local 108 Studio",
    retreatSchedule: retreatScheduleEn,
    offerOptions: roomOptions.en,
    images: local108ImagesEn,
  },
  fr: {
    time: "Le premier jour commence à 17h; l'évènement dure 3 jours.",
    cta: "Réservez maintenant - Disponibilité limitée",
    title: "Le Temple - Retraite Nutrition-Yoga-Pilates 2024",
    slogan: "Débloquez votre univers intérieur",
    description:
      "Rejoignez-nous pour une retraite éclairante de trois jours conçue pour équilibrer et activer vos chakras à travers une série d'ateliers comprenant du yoga, du Pilates, de la méditation et des conseils nutritionnels. Vivez des cérémonies uniques comme des rituels de feu, des bains sonores et une 'Fête de danse de transe de yoga' spéciale. Embrassez l'environnement serein et notre communauté solidaire pour redécouvrir et revitaliser votre bien-être spirituel et physique.",
    metadata: {
      title:
        "Le Temple - Retraite nutrition, yoga et pilates 2024 (offerte par Local 108)",
      description:
        "Rejoignez-nous pour une retraite éclairante de trois jours conçue pour équilibrer et activer vos chakras à travers une série d'ateliers comprenant du yoga, du Pilates, de la méditation et des conseils nutritionnels. Vivez des cérémonies uniques comme des rituels de feu, des bains sonores et une 'Fête de danse de transe de yoga' spéciale. Embrassez l'environnement serein et notre communauté solidaire pour redécouvrir et revitaliser votre bien-être spirituel et physique.",
    },
    link: {
      title: "Évènement à Venir",
      path: "/upcoming/le-temple",
    },
    date: "15 juin 2022",
    readMore: "Voir l'évènement",
    logo: {
      image:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2F441565959_777008257833404_5160639013579270975_n.jpg?alt=media&token=78844043-0539-4dc5-a84e-17fd29f65cf7",
      textImage:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2F441991889_988150149653903_4600873154933502940_n.png?alt=media&token=63d19830-4390-4e0b-b7d8-57a8cb23452f",
      width: 80,
      height: 80,
    },
    location: "Studio Local 108",
    retreatSchedule: retreatScheduleFr,
    offerOptions: roomOptions.fr,
    images: local108ImagesFr,
  },
};

import { ImageItem } from "./image";
import { Language } from "./languages";
import { MenuContent } from "./ui-content";

type LogoUpcomingEvent = {
  image: string;
  textImage?: string;
  width: number;
  height: number;
};

export type UpcomingEvent = {
  date: string;
  images?: ImageItem[];
  logo: LogoUpcomingEvent;
  retreatSchedule?: {
    day: string;
    events: { time: string; description: string; subEvents?: string[] }[];
  }[];
  link: MenuContent;
  location: string;
  readMore: string;
  time: string;
  title: string;
  slogan: string;
  description: string;
};

export type LocaleUpcomingEvent = Record<Language, UpcomingEvent>;

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

const retreatScheduleFr = [
  {
    day: "1ière Journée",
    events: [
      { time: "17h", description: "Arrivée des participants" },
      {
        time: "18h",
        description:
          "Présentation de la retraite, Local 108, l'équipe. Maï, Js et Pam (petit speech).",
      },
      { time: "19h30", description: "Souper - soupe, petits repas" },
      {
        time: "20h15",
        description:
          "Chakra Muladhara - Chakra Svadhistana (explication de chaque chakra)",
        subEvents: [
          "Cérémonie de feu, Enracinement (pieds nus), intentions pour la retraite (À l'extérieur)",
          "Méditation, intentions pour la retraite, lâcher prise. Bain sonore. (Dans la Salle avec les pierres de quartz)",
        ],
      },
    ],
  },
  {
    day: "2ième Journée",
    events: [
      {
        time: "6h00",
        description:
          "Marche méditation silencieuse et méditation de chakra Manipura au lac",
      },
      {
        time: "7h30",
        description: "Salutation Soleil - Yoga Vitalité (recharge)",
      },
      {
        time: "8h45 - 10h",
        description:
          "Nutri Lab - Smoothies and breakfast explanation by JS and Mai (LOCAL 108)",
      },
      { time: "11h30", description: "PILATES with Pam" },
      { time: "13h - 14h30", description: "Diner, temps pour Jaser" },
      {
        time: "15h - 16h45",
        description: "Atelier de Nutrition Ayurvédique (professeure invitée)",
      },
      {
        time: "17h",
        description: "Atelier de création ANAHATA (hosted by Mai)",
      },
      { time: "18h30 - 19h45", description: "Souper" },
      {
        time: "20h",
        description:
          "Vishuddha et Ajna - Inner Voice and Abundance Ritual (tambour et mantras) (In the quartz room)",
      },
    ],
  },
  {
    day: "3ième Journée",
    events: [
      {
        time: "8h30",
        description: "Nutri Lab Breakfast (same concept as previous day)",
      },
      { time: "10h - 11h45", description: "Yoga Workshop" },
      {
        time: "12h - 1pm",
        description:
          "Sahasrara les milles pétales - Chakra integration, feedback, closing words",
      },
      { time: "13h00", description: "Final diner" },
      { time: "15h", description: "Non-alcoholic YOGA TRANSE DANCE PARTY" },
    ],
  },
];
const retreatScheduleEn = [
  {
    day: "1st Day",
    events: [
      { time: "5pm", description: "Arrival of participants" },
      {
        time: "6pm",
        description:
          "Introduction to the retreat, Local 108, the team. Maï, Js and Pam (small speech).",
      },
      { time: "7:30pm", description: "Dinner - soup, small meals" },
      {
        time: "8:15pm",
        description:
          "Chakra Muladhara - Chakra Svadhistana (explanation of each chakra)",
        subEvents: [
          "Fire ceremony, Grounding (barefoot), intentions for the retreat (Outside)",
          "Meditation, intentions for the retreat, letting go. Sound bath. (In the room with the quartz stones)",
        ],
      },
    ],
  },
  {
    day: "2nd Day",
    events: [
      {
        time: "6am",
        description:
          "Silent meditation walk and Manipura chakra meditation at the lake",
      },
      {
        time: "7:30am",
        description: "Sun Salutation - Vitality Yoga (recharge)",
      },
      {
        time: "8:45 - 10am",
        description:
          "Nutri Lab - Smoothies and breakfast explanation by JS and Mai (LOCAL 108)",
      },
      { time: "11:30am", description: "PILATES with Pam" },
      { time: "1pm - 2:30pm", description: "Lunch, time to chat" },
      {
        time: "3pm - 4:45pm",
        description: "Ayurvedic Nutrition Workshop (guest teacher)",
      },
      { time: "5pm", description: "ANAHATA creation workshop (hosted by Mai)" },
      { time: "6:30 - 7:45pm", description: "Dinner" },
      {
        time: "8pm",
        description:
          "Vishuddha and Ajna - Inner Voice and Abundance Ritual (drum and mantras) (In the quartz room)",
      },
    ],
  },
  {
    day: "3rd Day",
    events: [
      {
        time: "8:30am",
        description: "Nutri Lab Breakfast (same concept as previous day)",
      },
      { time: "10am - 11:45am", description: "Yoga Workshop" },
      {
        time: "12pm - 1pm",
        description:
          "Sahasrara the thousand petals - Chakra integration, feedback, closing words",
      },
      { time: "1pm", description: "Final dinner" },
      { time: "3pm", description: "Non-alcoholic YOGA TRANSE DANCE PARTY" },
    ],
  },
];

export const upcomingEventsLocal108: Record<Language, UpcomingEvent> = {
  en: {
    time: "First day starts at 17h; event lasts 3 days.",
    title: "Le Temple - 2024 Retreat",
    slogan: "Unlock Your Inner Universe",
    description:
      "Join us for an enlightening three-day retreat designed to balance and activate your chakras through a series of workshops including yoga, Pilates, meditation, and nutritional guidance. Experience unique ceremonies like fire rituals, sound baths, and a special 'Yoga Trance Dance Party'. Embrace the serene environment and our supportive community to rediscover and rejuvenate your spiritual and physical wellness.",
    link: {
      title: "Upcoming Event",
      path: "/upcoming/event",
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
    images: local108ImagesEn,
  },
  fr: {
    time: "Le premier jour commence à 17h; l'évènement dure 3 jours.",
    title: "Le Temple - Retraite 2024",
    slogan: "Débloquez votre univers intérieur",
    description:
      "Rejoignez-nous pour une retraite éclairante de trois jours conçue pour équilibrer et activer vos chakras à travers une série d'ateliers comprenant du yoga, du Pilates, de la méditation et des conseils nutritionnels. Vivez des cérémonies uniques comme des rituels de feu, des bains sonores et une 'Fête de danse de transe de yoga' spéciale. Embrassez l'environnement serein et notre communauté solidaire pour redécouvrir et revitaliser votre bien-être spirituel et physique.",

    link: {
      title: "Évènement à Venir",
      path: "/upcoming/evenement",
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
    images: local108ImagesFr,
  },
};

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
  stripe: string;
  price: number;
  quantity: number;
  title: string;
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
  cta: string;
  date: string;
  description: string;
  images?: ImageItem[];
  introduction?: string;
  link: MenuContent;
  location: string;
  logo: LogoUpcomingEvent;
  metadata: MetadataType;
  offerOptions?: Offer[];
  readMore: string;
  retreatSchedule?: RetreatSchedule;
  slogan: string;
  time: string;
  title: string;
  path: string;
};

export type LocaleUpcomingEvent = Record<Language, UpcomingEvent>;

const roomOptions: Record<Language, Offer[]> = {
  en: [
    {
      title: "All-Inclusive Package\n(2 NIGHTS, 3 DAYS)",
      quantity: 12,
      price: 625, // Prix total pour deux nuits par lit
      tax: true,
      description: `Accommodation:
- Meals
- Activities
- Individual spot in a 4-person room

STARTING AT: 625 $ + taxes`,
      stripe: "https://buy.stripe.com/3csdUN2mW8074Ss4gk",
    },
    {
      title: "All-Inclusive Package\n(2 NIGHTS, 3 DAYS)",
      quantity: 3,
      price: 650, // Prix total pour deux nuits par lit
      tax: true,
      description: `Accommodation:
- Meals
- Activities
- Individual spot in a 2-person room

STARTING AT: 650 $ + taxes`,
      stripe: "https://buy.stripe.com/fZedUN3r0bcj1GgfZ5",
    },
  ],
  fr: [
    {
      title: `Forfait tout inclus\n(2 NUITS, 3 JOURS)`,
      stripe: "https://buy.stripe.com/3csdUN2mW8074Ss4gk",
      quantity: 12,
      price: 625, // Prix total pour deux nuits par lit
      tax: true,
      description: `Hébergement:
- Repas
- Activités
- Place individuelle dans une chambre de 4 personnes

À PARTIR DE : 625 $ + taxes
`,
    },
    {
      title: "Forfait tout inclus\n(2 NUITS, 3 JOURS)",
      stripe: "https://buy.stripe.com/fZedUN3r0bcj1GgfZ5",
      quantity: 3,
      price: 650, // Prix total pour deux nuits pour la chambre entière
      tax: true,
      description: `Hébergement:
- Repas
- Activités
- Place individuelle dans une chambre de 2 personnes

À PARTIR DE : 650 $ + taxes`,
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
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F445375912_1913078055813062_9014981935830814493_n.jpg?alt=media&token=8f39fce0-b0bb-4a2e-b090-e4c78c522150",
    alt: "Healty Meal",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F445372623_1011651013898278_3801536994229325511_n.jpg?alt=media&token=c388d161-308e-4a97-acb1-f9bdb8d71c07",
    alt: "Healty Meal",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2FFood.jpg?alt=media&token=82655bd0-80ac-4680-a0a1-0878845e3a51",
    alt: "Healty Meal",
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
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F445375912_1913078055813062_9014981935830814493_n.jpg?alt=media&token=8f39fce0-b0bb-4a2e-b090-e4c78c522150",
    alt: "Repas santé",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F445372623_1011651013898278_3801536994229325511_n.jpg?alt=media&token=c388d161-308e-4a97-acb1-f9bdb8d71c07",
    alt: "Repas santé",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2FFood.jpg?alt=media&token=82655bd0-80ac-4680-a0a1-0878845e3a51",
    alt: "Repas santé",
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
        description: "Nutri Lab - Smoothies et petit déjeuner",
      },
      { time: "11h30", description: "Pilates avec Pam" },
      { time: "13h00 - 14h30", description: "Dîner et temps pour discuter" },
      {
        time: "15h00 - 16h45",
        description:
          "Atelier de nutrition ayurvédique avec une professeure invitée",
      },
      { time: "17h00", description: "Cérémonie de Cacao Anahata" },
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
      { time: "15h00", description: "Fête de danse transe yoga" },
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
        description: "Nutri Lab - Smoothies and Breakfast",
      },
      { time: "11:30 AM", description: "Pilates with Pam" },
      { time: "1:00 - 2:30 PM", description: "Lunch and Social Time" },
      {
        time: "3:00 - 4:45 PM",
        description: "Ayurvedic Nutrition Workshop with Guest Teacher",
      },
      { time: "5:00 PM", description: "Cacao Ceremony Anahata" },
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
        description: "Yoga Trance Dance Party",
      },
    ],
  },
];

export const upcomingEventsLocal108: Record<Language, UpcomingEvent> = {
  en: {
    time: "First day starts at 17h; event lasts 3 days.",
    cta: "Book Now - Limited Availability",
    title: "LEVEL - Nutrition-Yoga-Pilates 2024 Retreat",
    slogan: "Unlock Your Inner Universe",
    description:
      "We offer two accommodation types: shared four-person rooms, perfect for those eager to share their experience, and private double rooms for a more intimate setting. Both options include meals, wellness activities, and additional perks to enhance your stay. We look forward to welcoming you to this enriching adventure.",
    introduction: `
    Dive into an oasis of serenity and well-being just minutes away from the city of Quebec!
    
    Local 108 is thrilled to invite you to our nutrition and yoga retreat, a unique journey through the chakras, the energy centers of the human body. During this retreat, we will explore each chakra and its unique qualities, in a peaceful and enriching setting.
    
    All-inclusive package: 3-day Yoga Retreat, 2 nights, 7 meals, 10 wellness activities, and more.

    Included:
    • Welcome Dinner: Dinner for all participants upon arrival, with vegetarian and allergy-friendly options.

    • Breakfasts: 2 buffet breakfasts with a variety of delicious and healthy options,
    
    • Nutrition Lab: Participation in 2 nutrition workshops, with local products included. (Offered by the nutritionist)
    
    • Dinner: 2 gourmet dinners prepared by our chef, who will be present on site, with vegetarian and allergy-friendly options as well.
    
    • Drinks: 3 health drinks available, and herbal teas available throughout the retreat.
    
    • Included Activities:
      o Ayurveda Workshop. (Guest teacher from Montreal)
      o Yoga Master Classes (Senior Vinyasa Yoga Teacher)
      o Abundance, Fire, and Cacao Ceremonies
      o Sound Bath (Guest teacher)
      o Writing Workshop o 1 Pilates class and 3 yoga classes
      o Meditation by the lake
      
    Don't miss the opportunity to participate in a yoga retreat focused on nutrition and yoga practice in a peaceful natural setting. Spots are limited, come experience this dream location.

    For 2-payment options, please contact the following email: Jeanst@local-108.com.`,
    link: {
      title: "Upcoming Event",
      path: "/upcoming/le-temple",
    },
    metadata: {
      title:
        "LEVEL - Nutrition-Yoga-Pilates 2024 Retreat (Hosted by Local 108)",
      description:
        "Join us for an enlightening three-day retreat designed to balance and activate your chakras through a series of workshops including yoga, Pilates, meditation, and nutritional guidance. Experience unique ceremonies like fire rituals, sound baths, and a special 'Yoga Trance Dance Party'. Embrace the serene environment and our supportive community to rediscover and rejuvenate your spiritual and physical wellness.",
    },
    date: "August 30 to September 1, 2024",
    location:
      "Le Temple Nature Sanctuary, located on Chemin Fleming, Sainte-Brigitte-de-Laval, QC",
    readMore: "See Event",
    logo: {
      image:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2F441565959_777008257833404_5160639013579270975_n.jpg?alt=media&token=78844043-0539-4dc5-a84e-17fd29f65cf7",
      textImage:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Ftitle-logo-notext.png?alt=media&token=634f6948-e9d0-48ff-8c22-5fd51a8e9e88",
      width: 80,
      height: 80,
    },

    // retreatSchedule: retreatScheduleEn,
    offerOptions: roomOptions.en,
    images: local108ImagesEn,
    path: "/upcoming/le-temple",
  },
  fr: {
    time: "Le premier jour commence à 17h; l'évènement dure 3 jours.",
    cta: "Réservez maintenant - Disponibilité limitée",
    title: "LEVEL - Retraite Nutrition-Yoga-Équilibre 2024",
    slogan: "Débloquez votre univers intérieur",
    introduction: `Plongez dans un oasis de sérénité et de bien-être à seulement quelques minutes de la ville de Québec !
    
Local 108 est ravi de vous inviter à notre retraite de nutrition et yoga, un voyage unique à travers les chakras, les centres d'énergie du corps humain. Pendant cette retraite, nous explorerons chaque chakra et ses qualités uniques, dans un cadre paisible et enrichissant.

Forfait tout compris: Retraite de Yoga de 3 jours, 2 nuits, 7 repas, 10 activités bien-être, et plus encore.

Inclus:
• Le souper de bienvenue: Souper pour tous les participants à leur arrivée, avec des options végétariennes et antiallergiques.

• Déjeuners : 2 déjeuners buffet avec une variété d'options délicieuses et saines,

• Laboratoire de nutrition : Participation à 2 ateliers de nutrition, avec des produits locaux inclus. (Offert par la nutritionniste)

• Dîner : 2 dîners gastronomiques préparés par notre chef, qui sera présent sur place, avec des options aussi végétariennes et antiallergiques.

• Boissons : 3 boissons santé à disposition, et des tisanes disponibles pendant toute la retraite.

• Activités incluses :
  o Atelier d'Ayurveda. (Professeure invitée de Montréal)
  o Master classes de yoga (Professeure senior en Vinyasa Yoga)
  o Cérémonies d'abondance, de feu et de cacao
  o Bain de son (Sound bath, professeur invité)
  o Atelier d'écriture o 1 cours de Pilates et de 3 classes de yoga
  o Méditation au bord du lac

Ne manquez pas l'opportunité de participer à une retraite de yoga axée sur la nutrition et la pratique du yoga dans un environnement paisible en pleine nature. Les places sont limitées, venez vivre cette expérience dans un lieu de rêve.`,
    description:
      "Nous proposons deux types d'hébergement : des chambres partagées pour quatre personnes, idéales pour ceux désirant partager leur expérience, et des chambres doubles pour plus d'intimité. Chaque option inclut les repas, les activités bien-être, et des petits plus pour enrichir votre séjour. Nous sommes impatients de vous accueillir pour cette aventure enrichissante.\n\nPour des options de paiement en 2 versements, veuillez contacter le courriel suivant : Jeanst@local-108.com",
    metadata: {
      title:
        "LEVEL - Retraite Nutrition-Yoga-Équilibre 2024 (Organisé par Local 108)",
      description:
        "Rejoignez-nous pour une retraite éclairante de trois jours conçue pour équilibrer et activer vos chakras à travers une série d'ateliers comprenant du yoga, du Pilates, de la méditation et des conseils nutritionnels. Vivez des cérémonies uniques comme des rituels de feu, des bains sonores et une 'Fête de danse de transe de yoga' spéciale. Embrassez l'environnement serein et notre communauté solidaire pour redécouvrir et revitaliser votre bien-être spirituel et physique.",
    },
    link: {
      title: "Évènement à Venir",
      path: "/upcoming/le-temple",
    },
    date: "30 août au 1er septembre 2024",
    location:
      "Le Temple Sanctuaire en Nature, situé sur le chemin Fleming, Sainte-Brigitte-de-Laval, QC",
    readMore: "Voir l'évènement",
    logo: {
      image:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fupcoming%2Fle-temple%2F441565959_777008257833404_5160639013579270975_n.jpg?alt=media&token=78844043-0539-4dc5-a84e-17fd29f65cf7",
      textImage:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Ftitle-logo-notext.png?alt=media&token=634f6948-e9d0-48ff-8c22-5fd51a8e9e88",
      width: 80,
      height: 80,
    },
    // retreatSchedule: retreatScheduleFr,
    offerOptions: roomOptions.fr,
    images: local108ImagesFr,
    path: "/upcoming/le-temple",
  },
};

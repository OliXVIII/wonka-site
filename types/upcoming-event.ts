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
      title: "Single Bed in 4-Person Room",
      quantity: 12,
      price: 625, // Prix total pour deux nuits par lit
      tax: true,
      description:
        "Bunk beds, this room is comfortable and immersive. Includes 7 meals, 2 nights, and 10 activities. Price is for a single bed in a 4-person room for two nights.",
      stripe: "https://buy.stripe.com/3csdUN2mW8074Ss4gk",
    },
    {
      title: "2-Person Room (whole room)",
      quantity: 3,
      price: 1300, // Prix total pour deux nuits pour la chambre entière
      tax: true,
      description:
        "Double bed for two people, perfect for couples or friends. Includes 7 meals, 2 nights, and 10 activities. Price is for the entire room for two nights.",
      stripe: "https://buy.stripe.com/cN23g9aTseov5Ww28e",
    },
  ],
  fr: [
    {
      title: "Place individuelle dans chambre 4 personnes",
      stripe: "https://buy.stripe.com/3csdUN2mW8074Ss4gk",
      quantity: 12,
      price: 625, // Prix total pour deux nuits par lit
      tax: true,
      description:
        "Lits superposés, cette chambre est confortable et immersive. Inclut 7 repas, 2 nuits et 10 activités. Le prix est pour une place dans une chambre de 4 personnes pour deux nuits.",
    },
    {
      title: "Chambre 2 personnes (chambre entière)",
      stripe: "https://buy.stripe.com/cN23g9aTseov5Ww28e",
      quantity: 3,
      price: 1300, // Prix total pour deux nuits pour la chambre entière
      tax: true,
      description:
        "Lit double pour deux personnes, idéal pour les couples. Inclut 7 repas, 2 nuits et 10 activités. Le prix est pour la chambre entière pour deux nuits.",
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
      "We offer two accommodation types: shared four-person rooms, perfect for those eager to share their experience, and private double rooms for a more intimate setting. Both options include meals, wellness activities, and additional perks to enhance your stay. To book your spot and select your room type, please contact jeanst@local-108.com. We look forward to welcoming you to this enriching adventure.",
    introduction: `I present to you my yoga retreat project, LEVEL 📿

Our main goal is focused on nutrition and integral yoga practice, offering activities that contribute to overall well-being.

This is my first project as co-founder of Local 108, in collaboration with @letemple_sanctuaire, an exceptional place less than an hour away from Quebec. What awaits you:
- Cacao Ceremony: A sacred ritual to open the heart and awaken the senses.
- Food-Focused Yoga: Use yoga to improve digestion and nutrient assimilation, promoting overall well-being.
- Superfoods and Functional Nutrition: Learn how specific foods can positively influence your chakras and vital energy.
- Local 108 Nutrition Labs: Practical experiences with local ingredients to nourish your body and soul.
- Introduction to Ayurveda Science: Understand how this ancient science is related to diet, health, and Doshas balance.
- Yoga and Pilates Classes: Physical practices to strengthen the body and balance energy centers.
- Meditation, Mantras, and Drums: Techniques to calm the mind and harmonize chakras.
- Sound Bath and Ayurvedic Massages: Sound therapies and massages to unlock and revitalize your energy.
- Fire and Abundance Ceremonies: Rituals to purify and attract abundance into your life.

For more information on planning, pricing, and to book, please write to jeanst@local-108.com.`,
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

    retreatSchedule: retreatScheduleEn,
    offerOptions: roomOptions.en,
    images: local108ImagesEn,
    path: "/upcoming/le-temple",
  },
  fr: {
    time: "Le premier jour commence à 17h; l'évènement dure 3 jours.",
    cta: "Réservez maintenant - Disponibilité limitée",
    title: "LEVEL - Retraite Nutrition-Yoga-Équilibre 2024",
    slogan: "Débloquez votre univers intérieur",
    introduction: `Je vous présente mon projet de retraites de yoga, LEVEL 📿

Notre objectif principal est axé sur la nutrition et la pratique intégrale du yoga, offrant des activités qui contribuent à un bien-être global. C'est mon premier projet en tant que co-fondatrice de Local 108, en collaboration avec le @letemple_sanctuaire, un lieu exceptionnel à moins d'une heure de Québec.

Au programme :

- Cérémonie de Cacao : Un rituel sacré pour ouvrir le cœur et éveiller les sens.
- Yoga Focalisé sur l'Alimentation : Utilisez le yoga pour améliorer la digestion et l'assimilation des nutriments, favorisant ainsi un bien-être global.
- Super Aliments et Nutrition Fonctionnelle : Apprenez comment des aliments spécifiques peuvent influencer positivement vos chakras et votre énergie vitale.
- Laboratoires de Nutrition Local 108 : Expériences pratiques avec des ingrédients locaux pour nourrir votre corps et votre âme.
- Introduction à la Science de l'Ayurveda : Comprenez comment cette ancienne science est reliée à l'alimentation, à la santé et à l'équilibre des Doshas.
- Classes de Yoga et Pilates : Pratiques physiques pour renforcer le corps et équilibrer les centres énergétiques.
- Méditation, Mantras et Tambours : Techniques pour apaiser l'esprit et harmoniser les chakras.
- Sound Bath et Massages Ayurvédiques : Thérapies sonores et massages pour débloquer et revitaliser votre énergie.
- Cérémonies de Feu et d'Abondance : Rituels pour purifier et attirer l'abondance dans votre vie.

Pour plus d'informations sur la planification, les prix et pour réserver, veuillez écrire à jeanst@local-108.com.`,
    description:
      "Nous proposons deux types d'hébergement : des chambres partagées pour quatre personnes, idéales pour ceux désirant partager leur expérience, et des chambres doubles pour plus d'intimité. Chaque option inclut les repas, les activités bien-être, et des petits plus pour enrichir votre séjour. Pour réserver votre place et choisir votre type de chambre, contactez jeanst@local-108.com. Nous sommes impatients de vous accueillir pour cette aventure enrichissante.",
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
    retreatSchedule: retreatScheduleFr,
    offerOptions: roomOptions.fr,
    images: local108ImagesFr,
    path: "/upcoming/le-temple",
  },
};

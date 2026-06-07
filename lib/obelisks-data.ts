import { Obelisk } from '@/types';

export const OBELISKS: Obelisk[] = [
  {
    id: 'lateran',
    name: 'Lateran Obelisk',
    italianName: 'Obelisco Lateranense',
    location: 'Piazza di San Giovanni in Laterano',
    description:
      'The tallest ancient obelisk still standing anywhere in the world. Originally quarried in Aswan and erected at Karnak by Thutmose III, it was brought to Rome in 357 CE by Emperor Constantius II — it took three ships to carry it.',
    latitude: 41.88573,
    longitude: 12.50663,
    origin: 'Karnak, Egypt',
    heightM: 32.0,
    era: 'c. 1400 BCE',
    pharaoh: 'Thutmose III & IV',
    arrivedRome: '357 CE',
    funFact:
      'At 32 metres, this is taller than any obelisk still standing in Egypt. It was also the last obelisk exported from Egypt before the fall of the Roman Empire.',
  },
  {
    id: 'vatican',
    name: 'Vatican Obelisk',
    italianName: 'Obelisco Vaticano',
    location: 'Piazza San Pietro',
    description:
      'The only obelisk in Rome without hieroglyphics — it predates hieroglyphic decoration and was made in Egypt during early Roman rule. Caligula had it shipped from Heliopolis in 37 CE. Pope Sixtus V moved it to its iconic spot in St Peter\'s Square in 1586.',
    latitude: 41.90217,
    longitude: 12.45693,
    origin: 'Heliopolis, Egypt',
    heightM: 25.5,
    era: 'c. 1st century BCE',
    arrivedRome: '37 CE',
    funFact:
      "This is the only obelisk in Rome that has never fallen — it has stood continuously since antiquity and witnessed Nero's circus where early Christians were martyred.",
  },
  {
    id: 'flaminian',
    name: 'Flaminian Obelisk',
    italianName: 'Obelisco Flaminio',
    location: 'Piazza del Popolo',
    description:
      'One of the first obelisks Augustus brought to Rome after conquering Egypt. For centuries it stood in the Circus Maximus as a turning post before Pope Sixtus V moved it to Piazza del Popolo in 1589.',
    latitude: 41.91093,
    longitude: 12.47629,
    origin: 'Heliopolis, Egypt',
    heightM: 23.2,
    era: 'c. 1230 BCE',
    pharaoh: 'Seti I & Ramesses II',
    arrivedRome: '10 BCE',
    funFact:
      "Augustus used this obelisk as the gnomon (pointer) of a giant sundial — the Horologium Augusti — which cast a shadow across a city block. On his birthday it pointed directly at the Ara Pacis.",
  },
  {
    id: 'sallustian',
    name: 'Sallustian Obelisk',
    italianName: 'Obelisco Sallustiano',
    location: 'Piazza della Trinità dei Monti',
    description:
      'Perched dramatically at the top of the Spanish Steps, this obelisk is a Roman copy of Egyptian originals made during the imperial period. It once adorned the Gardens of Sallust before Pope Pius VI placed it here in 1789.',
    latitude: 41.90582,
    longitude: 12.48282,
    origin: 'Rome (Roman imitation)',
    heightM: 13.91,
    era: '1st–2nd century CE',
    funFact:
      "The hieroglyphics on this obelisk are purely decorative — the Romans who carved them didn't actually know what they meant. It's essentially ancient fake Egyptian!",
  },
  {
    id: 'quirinal',
    name: 'Quirinal Obelisk',
    italianName: 'Obelisco del Quirinale',
    location: 'Piazza del Quirinale',
    description:
      'Found near the Mausoleum of Augustus, this uninscribed Roman obelisk stands beside the colossal Dioscuri statues at Italy\'s presidential palace. It is the twin of the Esquiline obelisk.',
    latitude: 41.89975,
    longitude: 12.48710,
    origin: 'Rome (Roman copy)',
    heightM: 14.63,
    era: 'Roman Imperial period',
    funFact:
      "This obelisk and its twin at Santa Maria Maggiore once flanked the entrance to the Mausoleum of Augustus — the tomb that held the ashes of Augustus, Livia, Tiberius, and others.",
  },
  {
    id: 'esquiline',
    name: 'Esquiline Obelisk',
    italianName: 'Obelisco Esquilino',
    location: "Piazza dell'Esquilino",
    description:
      "Standing behind Santa Maria Maggiore basilica, this is the twin of the Quirinal obelisk. Both are uninscribed Roman copies found near the Mausoleum of Augustus, re-erected by Pope Sixtus V as part of his grand redesign of Rome.",
    latitude: 41.89705,
    longitude: 12.49940,
    origin: 'Rome (Roman copy)',
    heightM: 14.75,
    era: 'Roman Imperial period',
    funFact:
      'The twin pair (this and the Quirinal) were repurposed as urban landmarks 1500 years after being made — ancient columns become baroque focal points.',
  },
  {
    id: 'agonalis',
    name: 'Pamphilj Obelisk',
    italianName: 'Obelisco Agonale',
    location: 'Piazza Navona',
    description:
      "Rising from Bernini's spectacular Fountain of the Four Rivers in the heart of Piazza Navona. This Roman-made obelisk was created for Emperor Domitian and later used by Maxentius on the Via Appia before Pope Innocent X had Bernini build the famous fountain around it.",
    latitude: 41.89912,
    longitude: 12.47315,
    origin: "Rome (Domitian's era)",
    heightM: 16.54,
    era: '81–96 CE',
    pharaoh: 'Emperor Domitian',
    funFact:
      "Domitian was fascinated by Egypt and had Roman craftsmen inscribe pseudo-hieroglyphics — they look convincing but are largely invented. The four river gods covering their faces may be reacting to the sight of Borromini's rival church nearby, according to legend.",
  },
  {
    id: 'macuteo',
    name: 'Macuteo Obelisk',
    italianName: 'Obelisco Macuteo',
    location: 'Piazza della Rotonda (Pantheon)',
    description:
      "Adorning the fountain directly in front of the Pantheon, this genuine Egyptian obelisk was erected at Heliopolis by Ramesses II. It was found nearby in the ancient area of the Temple of Isis and erected here by Pope Clement XI in 1711.",
    latitude: 41.89861,
    longitude: 12.47694,
    origin: 'Heliopolis, Egypt',
    heightM: 6.34,
    era: 'c. 1300 BCE',
    pharaoh: 'Ramesses II',
    arrivedRome: 'Early Imperial period',
    funFact:
      "Despite being one of the shorter obelisks, it carries genuine hieroglyphics from Ramesses II — one of Egypt's most prolific pharaohs who reigned for 66 years.",
  },
  {
    id: 'minerveo',
    name: 'Minerva Obelisk',
    italianName: "Obelisco della Minerva",
    location: 'Piazza della Minerva',
    description:
      "The smallest ancient obelisk in Rome, mounted on Bernini's delightful marble elephant. Pope Alexander VII commissioned Bernini who designed the elephant base with the inscription: 'A strong mind is needed to support solid wisdom.'",
    latitude: 41.89790,
    longitude: 12.47779,
    origin: 'Sais, Egypt',
    heightM: 5.47,
    era: 'c. 589–570 BCE',
    pharaoh: 'Apries (Pharaoh Hophra)',
    arrivedRome: 'Late antiquity',
    funFact:
      "Romans nicknamed it 'il pulcino della Minerva' (the chick of Minerva). Bernini's elephant symbolises strength and wisdom holding up knowledge — a visual pun three centuries old.",
  },
  {
    id: 'celian',
    name: 'Celian Obelisk',
    italianName: 'Obelisco Celio',
    location: 'Villa Celimontana, Monte Celio',
    description:
      "Hidden inside the Villa Celimontana park on the Caelian Hill, this obelisk fragment is one of Rome's most secret gems. The park is usually quiet and the obelisk surprises visitors who wander off the main tourist trail.",
    latitude: 41.88700,
    longitude: 12.49260,
    origin: 'Heliopolis, Egypt',
    heightM: 4.85,
    era: 'c. 1300 BCE',
    pharaoh: 'Ramesses II',
    funFact:
      "This is actually a fragment — the obelisk's top is missing. It was donated by the Roman Senate to the Mattei family in 1582 for their private garden, making it the only obelisk in Rome that was privately owned for centuries.",
  },
  {
    id: 'dogali',
    name: 'Dogali Obelisk',
    italianName: 'Obelisco di Dogali',
    location: 'Viale delle Terme di Diocleziano',
    description:
      "Standing near the Baths of Diocletian and Piazza della Repubblica, this genuine ancient obelisk from Heliopolis was repurposed in 1887 as a monument to Italian soldiers who fell at the Battle of Dogali in Ethiopia — an extraordinary cultural mashup across 3000 years.",
    latitude: 41.90340,
    longitude: 12.49300,
    origin: 'Heliopolis, Egypt',
    heightM: 6.34,
    pharaoh: 'Ramesses II',
    era: 'c. 1300 BCE',
    arrivedRome: 'Early Imperial period',
    funFact:
      "A 3,300-year-old Egyptian obelisk pressed into service as a 19th-century Italian war memorial — the Romans brought it here, forgot about it, and the Risorgimento Italians found it and gave it a whole new meaning.",
  },
  {
    id: 'solari',
    name: 'Solari Obelisk',
    italianName: 'Obelisco di Montecitorio',
    location: 'Piazza di Monte Citorio',
    description:
      'A genuine Egyptian obelisk brought to Rome by Augustus in 10 BCE alongside the Flaminian obelisk. It was buried for centuries and sustained severe fire damage before being re-erected in front of the Chamber of Deputies by Pope Pius VI in 1792.',
    latitude: 41.90080,
    longitude: 12.47867,
    origin: 'Heliopolis, Egypt',
    heightM: 21.79,
    era: 'c. 595–589 BCE',
    pharaoh: 'Psammetichus II',
    arrivedRome: '10 BCE',
    funFact:
      'Augustus used this specific obelisk as the giant gnomon (pointer) for his Solarium Augusti, a colossal meridian solar sundial carved into a marble pavement across the Campus Martius.',
  },
  {
    id: 'pincian',
    name: 'Pincian Obelisk',
    italianName: 'Obelisco del Pincio',
    location: 'Viale dell\'Obelisco, Pincian Hill',
    description:
      'A Roman-made obelisk commissioned by Emperor Hadrian to honor his companion Antinous after his tragic drowning in the Nile. After a journey across various Roman villas, it was moved to the Pincian gardens by Pope Pius VII in 1822.',
    latitude: 41.91054,
    longitude: 12.48243,
    origin: 'Rome (Roman copy)',
    heightM: 9.25,
    era: 'c. 130–138 CE',
    pharaoh: 'Emperor Hadrian',
    funFact:
      'Unlike other Roman copies with fake gibberish text, this one features genuine, deeply moving hieroglyphics written by an Egyptian scribe detailing the deification and star-rebirth of Antinous.',
  },
];

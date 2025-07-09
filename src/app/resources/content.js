import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Aaditya",
  lastName: "Baranwal",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI Researcher",
  avatar: "/images/avatar.jpg",
  location: "Orlando, FL, USA", // Updated to match your current location in Orlando, FL
  timezone: "America/New_York",
  languages: ["English", "Hindi"],
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about AI, research, technology, and share insights from my experiences
      in data science and computer vision.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/eternal-f1ame",
  },
  {
    name: "Scholar",
    icon: "academicCap",
    link: "https://scholar.google.com/citations?user=2pHFEhMAAAAJ",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/aadityabaranwal",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:aaditya.baranwal@ucf.edu",
  },
];

const home = {
  label: "Home",
  title: `sochastic`,
  description: `chaos in order`,
  headline: <>AI Researcher</>,
  subline: (
    <>
      I'm Aaditya, pursuing my Ph.D. at <InlineCode> CRCV @ UCF </InlineCode>.  <br />
      I specialize in foundation models and deep learning.
    </>
  ),
};

const about = {
  label: "About Me",
  title: "(▰˘◡˘▰)",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/aadityab",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a Ph.D. student at the University of Central Florida, specializing in Computer Science.
        I'm an AI Researcher passionate about leveraging deep learning, foundation models, and innovative solutions
        to solve real-world problems. My expertise lies in creating scalable AI tools, advancing computer vision
        methodologies, and exploring the frontiers of multimodal learning and autonomous systems.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Siemens Energy",
        timeframe: "Jan. 2025 – Present",
        role: "Data Science Researcher",
        achievements: [
          <>
            Developing scalable zero-shot hazard detection tools for industrial sites using Foundation Models and VLMs,
            adapting models to overcome limited industrial image representation in pretraining.
          </>,
        ],
        images: [],
      },
      {
        company: "AlphaBake",
        timeframe: "Jun. 2024 – Aug. 2024",
        role: "Artificial Intelligence Engineer",
        achievements: [
          <>
            Creating scalable stable diffusion workflows for virtual try-on. Improvised realism in the garment-fitting
            pipeline by inculcating IP adapters and training garment LoRAs.
          </>,
        ],
        images: [],
      },
      {
        company: "Bosch Global Software Technologies",
        timeframe: "Jun. 2023 – Nov. 2023",
        role: "Deep Learning Research Intern",
        achievements: [
          <>
            Conducted analysis and finetuning of Foundation Models for Autonomous Driving including Detection and Segmentation.
          </>,
          <>
            Empowered the Segment Anything Model to interpret prompts of text modality, harnessing the transformative
            capabilities of a Visual GPT-inspired architecture to enable interactive segmentation and uncertainty estimation.
          </>,
        ],
        images: [],
      },
      {
        company: "Bosch Global Software Technologies",
        timeframe: "Jul. 2022 – Sep. 2022",
        role: "Computer Vision Research Intern",
        achievements: [
          <>
            Established an optimized pipeline of SOTA Multi-Object Tracking algorithms. Accelerated the boundary-based
            LSTM for trajectory determination using CUDA.
          </>,
          <>
            Explored ways to tackle label swapping and occlusion problems during interference on KITTI.
          </>,
        ],
        images: [],
      },
      {
        company: "Dimensionless Technologies",
        timeframe: "Jun. 2022 – Aug. 2022",
        role: "Computer Vision Intern",
        achievements: [
          <>
            Built a scalable pipeline using EfficientNets and Residual Attention for commodity image discrimination and
            developed a counterfeit detection AI for e-commerce, trained on HPCs with CUDA.
          </>,
        ],
        images: [],
      },
      {
        company: "Mathrithms",
        timeframe: "Jan. 2021 – Apr. 2021",
        role: "Python Developer",
        achievements: [
          <>
            Extending BunnyCDN's cloud and storage services, creating a Python SDK, allowing functionalities of BunnyCDN
            apiary through Python, and achieved a total count of 75000+ global downloads from PYPI.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "University of Central Florida",
        description: <>Ph.D. in Computer Science (Aug. 2024 – Present) • Orlando</>,
      },
      {
        name: "Indian Institute of Technology Jodhpur",
        description: <>B.Tech in Electrical Engineering (Nov. 2020 – May 2024) • Karwar</>,
      },
      {
        name: "Sant Atulanand Convent School",
        description: <>Senior Secondary Certificate (Aug. 2018 – May 2020) • Varanasi</>,
      },
      {
        name: "St. John's Convent School Marhauli",
        description: <>Secondary Certificate (May 2016 – May 2018) • Varanasi</>,
      },
      {
        name: "St. Mary's Convent School Cantt.",
        description: <>Miidle School (Jul. 2009 – May 2016) • Varanasi</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        description: <>Python, C++, Matlab, Unity, SQL, HTML, CSS, JavaScript, Shell</>,
        images: [],
      },
      {
        title: "Libraries",
        description: <>PyTorch, TensorFlow, OpenCV, Scikit-Learn, Numpy, Pandas, etc.</>,
        images: [],
      },
      {
        title: "Theoretical & Applied",
        description: <>Deep and Reinforcement Learning, Stable Diffusion, Computer Vision, NLP/NLU, Robotics</>,
        images: [],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "(゜-゜)",
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  label: "Projects",
  title: "(╯°□°)╯︵ ┻━┻",
  description: `Research and development projects by ${person.name}`,
};

const gallery = {
  label: "Gallery",
  title: "(｡◕‿‿◕｡)",
  description: `A collection of photos and poems by ${person.name}`,
  images: [],
  items: [
    {
      type: "poem",
      filePath: "/gallery/poems/deciduous.txt",
      title: "DECIDUOUS...",
      imageSrc: "/assets/DECIDUOUDS.jpg", // Corresponding image from assets folder
    },
    {
      type: "poem",
      filePath: "/gallery/poems/depart.txt",
      title: "DEPART...",
      imageSrc: "/assets/DEPART.jpg",
    },
    {
      type: "poem",
      filePath: "/gallery/poems/diorama.txt",
      title: "DIORAMA...",
      imageSrc: "/assets/DIORAMA.jpg",
    },
    {
      type: "poem",
      filePath: "/gallery/poems/emptypens.txt",
      title: "EMPTY PENS...",
      imageSrc: "/assets/EMPTY-PENS.jpg",
    },
    {
      type: "poem",
      filePath: "/gallery/poems/lonelinesshaunts.txt",
      title: "LONELINESS HAUNTS...",
      imageSrc: "/assets/LONELINESS_HAUNTS.jpg",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };

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
  display: true,
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
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>AI Researcher</>,
  subline: (
    <>
      I'm Aaditya, pursuing my Ph.D. at <InlineCode> CRCV @ UCF </InlineCode>.  <br />
      I specialize in foundation models and deep learning.
    </>
  ),
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Aaditya Baranwal is a Ph.D. student at the University of Central Florida, specializing in Computer Science.
        He is an AI Researcher passionate about leveraging deep learning, foundation models, and innovative solutions
        to solve real-world problems. His expertise lies in creating scalable AI tools, advancing computer vision
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
        description: <>Ph.D. in Computer Science</>,
      },
      {
        name: "Indian Institute of Technology Jodhpur",
        description: <>B.Tech in Electrical Engineering, Specialization in Visual Computing</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Deep Learning",
        description: <>Specializing in Foundation Models, Transformers, and Vision-based applications.</>,
        images: [],
      },
      {
        title: "AI Engineering",
        description: <>Experience with Stable Diffusion, PyTorch, TensorFlow, and ROS.</>,
        images: [],
      },
    ],
  },
};

const about = {
  label: "About",
  title: "About me",
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
        Aaditya Baranwal is a Ph.D. student at the University of Central Florida, specializing in Computer Science.
        He is an AI Researcher passionate about leveraging deep learning, foundation models, and innovative solutions
        to solve real-world problems. His expertise lies in creating scalable AI tools, advancing computer vision
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
        description: <>Ph.D. in Computer Science (Aug. 2024 – Present)</>,
      },
      {
        name: "Indian Institute of Technology Jodhpur",
        description: <>B.Tech in Electrical Engineering, Specialization in Visual Computing (Nov. 2020 – Jun. 2024)</>,
      },
      {
        name: "Sant Atulanand Convent School",
        description: <>Senior Secondary Certificate (Aug. 2018 – May 2020)</>,
      },
      {
        name: "St. John's Convent School",
        description: <>Higher Secondary Certificate (May 2016 – May 2018)</>,
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
        title: "Tools & Utilities",
        description: <>HuggingFace, Langchain, Weights & Biases, GCP, AWS, Git, Docker, LaTeX, OpenAI-Gym</>,
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
  title: "Writing about AI, data science, and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Research and development projects by ${person.name}`,
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A collection of photos and poems by ${person.name}`,
  images: [],
  items: [
    // Example structure - we will populate this later
    // {
    //   type: "picture",
    //   src: "/gallery/pictures/example.jpg",
    //   alt: "An example picture",
    //   orientation: "horizontal", // or "vertical"
    // },
    {
      type: "poem",
      filePath: "/gallery/poems/deciduous.txt", // Path to the .txt file
      title: "DECIDUOUS...",
    },
    {
      type: "poem",
      filePath: "/gallery/poems/depart.txt", // Path to the .txt file
      title: "DEPART...",
    },
    {
      type: "poem",
      filePath: "/gallery/poems/diorama.txt", // Path to the .txt file
      title: "DIORAMA...",
    },
    {
        type: "poem",
        filePath: "/gallery/poems/emptypens.txt", // Path to the .txt file
        title: "empty pens...",
      },
    {
        type: "poem",
        filePath: "/gallery/poems/lonelinesshaunts.text", // Path to the .txt file
        title: "LONELINESS HAUNTS...",
      },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };

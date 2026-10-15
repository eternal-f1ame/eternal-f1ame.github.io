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
  sections: {
    papers: { title: "Selected papers", href: "/publications", cta: "all publications" },
    experience: { title: "Recently", href: "/about", cta: "more about me" },
    projects: { title: "Pastime", href: "/work", cta: "all projects" },
    writing: { title: "Scribbles", href: "/blog", cta: "all posts" },
    life: {
      title: "Off the clock",
      href: "/gallery",
      cta: "the gallery",
      intro: (
        <>
          Papers are the day job. The rest is poems, literary fests, and robots that mostly worked.
        </>
      ),
    },
  },
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
    link: "https://cal.com/aadityab/15min",
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
        company: "LinkedIn",
        timeframe: "May 2026 – Aug. 2026",
        role: "GenAI PhD Intern",
        achievements: [
          <>
            Identified creative-content and platform-fatigue signals, driving a 6% increase in ad CTR across LinkedIn.
          </>,
          <>
            Engineered diverse LLM persona workflows to generate large-scale synthetic data, improving creative guidance
            alignment for both AI-generated and advertiser-created ads, validated across 8 million creatives.
          </>,
          <>
            Developed and optimized an offline ad-ranking model (under 100M params) to accurately predict preflight CTR.
          </>,
        ],
        images: [],
      },
      {
        company: "Siemens Energy",
        timeframe: "Jan. 2025 – Aug. 2025",
        role: "Computer Vision Researcher",
        achievements: [
          <>
            Developed scalable zero-shot hazard detection tools for industrial sites using Foundation Models and VLMs,
            adapting models to overcome limited industrial image representation in pretraining.
          </>,
          <>
            Engineered an SDXL-driven generative data pipeline to synthesize photorealistic industrial hazard and
            chemical spill imagery, boosting downstream detection by +28% for VLMs (43% to 71%) and +28% mAP@50 for
            standard object detectors (39% to 67%). Published as SynSpill at ICCV 2025.
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
            apiary through Python, and achieved a total count of 200000+ global downloads from PYPI.
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
        description: <>Ph.D. in Computer Science (Aug. 2024 – Dec. 2027 expected) • Orlando</>,
      },
      {
        name: "Indian Institute of Technology Jodhpur",
        description: <>B.Tech in Electrical Engineering, Specialization in Visual Computing (Nov. 2020 – Jun. 2024) • Karwar</>,
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
        description: <>Middle School (Jul. 2009 – May 2016) • Varanasi</>,
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
        description: <>HuggingFace, LangChain, Weights & Biases, GCP, AWS, Git, Docker, LaTeX, OpenAI-Gym</>,
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
  achievements: {
    display: true,
    title: "Achievements",
    items: [
      {
        name: "Michelin Mobility Innovation Challenge",
        description: <>Winner • 2022</>,
      },
      {
        name: "ABU Robocon '22",
        description: <>Perfect score, 100/100 • 2022</>,
      },
      {
        name: "ISI Entrance Test",
        description: <>All India Rank 65 • 2020</>,
      },
      {
        name: "GRE",
        description: <>320 (170 Quant, 150 Verbal) • 2023</>,
      },
    ],
  },
  volunteering: {
    display: true,
    title: "Volunteering",
    items: [
      {
        name: "Spark STEM Fest, Orlando Science Center",
        featured: 3,
        description: <>Presenter • Feb. 2026</>,
      },
      {
        name: "Campus Activities Board, Impact Committee, UCF",
        description: <>Graduate Cohort • 2025 – 2026</>,
      },
      {
        name: "Aaftaab, The Literary Fest, IIT Jodhpur",
        featured: 2,
        description: <>Festival Chief • Feb. 2024</>,
      },
      {
        name: "Artificial Intelligence and Data Society, IIT Jodhpur",
        featured: 1,
        description: <>Founder and Head • 2022 – 2023</>,
      },
      {
        name: "Literature Society, IIT Jodhpur",
        description: <>Secretary • 2022 – 2023</>,
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "(゜-゜)",
  heading: "scribbles",
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  label: "Pastime",
  title: "(╯°□°)╯︵ ┻━┻",
  heading: "Pastime",
  description: `Side projects and pastimes by ${person.name}`,
};

const publications = {
  label: "Publications",
  title: "(¬‿¬)",
  heading: "Publications",
  description: `Research publications by ${person.name}`,
  papers: [
    {
      title: "Re:Cognize — Open-Set Comic Character Re-Identification",
      featured: 1,
      authors: (
        <>
          <strong>A. Baranwal</strong>, M. Kataria, Y.S. Rawat, S. Vyas
        </>
      ),
      venue: "NeurIPS (ED Track)",
      year: "2026",
      link: "https://arxiv.org/abs/2609.34032",
      page: "https://re-cognize.vercel.app",
      image: "/papers/re-cognize.webp",
    },
    {
      title: "PHOEBI: An Open-World Benchmark for Bacterial Identification",
      authors: (
        <>
          <strong>A. Baranwal</strong>, M.J. Hasan, S. Vyas
        </>
      ),
      venue: "NeurIPS (ED Track)",
      year: "2026",
      link: "https://arxiv.org/abs/2606.22890",
      page: "https://phoebi-benchmark.vercel.app",
      image: "/papers/phoebi.webp",
    },
    {
      title: "Vision-Language Models for Analog Gauge Reading: An Empirical Study of Specialization, Transfer and Reliability",
      authors: (
        <>
          A. Mueez, <strong>A. Baranwal</strong>, J. Chaj-Mejia, G. Bhatia, J. Voelker, S. Vyas
        </>
      ),
      venue: "Engineering Applications of Artificial Intelligence",
      year: "2026",
      link: "https://arxiv.org/abs/2608.17723",
      image: "/papers/gauge-reading.webp",
    },
    {
      title: "BareBones: Benchmarking Zero-Shot Geometric Comprehension in VLMs",
      authors: (
        <>
          <strong>A. Baranwal</strong>, V. Yadav, A. Rajora
        </>
      ),
      venue: "CVPR Workshops (FGVC 13)",
      year: "2026",
      link: "https://arxiv.org/abs/2604.10528",
      image: "/papers/barebones.webp",
    },
    {
      title: "ChemPro: A Progressive Chemistry Benchmark for Large Language Models",
      authors: (
        <>
          <strong>A. Baranwal</strong>, S. Vyas
        </>
      ),
      venue: "Artificial Intelligence Chemistry",
      year: "2026",
      link: "https://arxiv.org/abs/2602.03108",
      page: "https://sochastic.me/ChemPro/",
      image: "/papers/chempro.webp",
    },
    {
      title: "Robust Onion: Peeling Open Vocab Object Detectors Under Noise",
      featured: 2,
      authors: (
        <>
          P. Pathak, M. Karuppasamy, <strong>A. Baranwal</strong>, S. Marjit, S. Vyas, Y.S. Rawat
        </>
      ),
      venue: "ECCV (Main Conference)",
      year: "2026",
      link: "https://openreview.net/forum?id=REZ5cM8mFn",
      image: "/papers/robust-onion.webp",
    },
    {
      title: "ZeroBench: An Impossible Visual Benchmark for Contemporary Large Multimodal Models",
      authors: (
        <>
          J. Roberts, M.R. Taesiri, A. Sharma, A. Gupta, S. Roberts, I. Croitoru,{" "}
          <strong>A. Baranwal</strong>, et al.
        </>
      ),
      venue: "ICML (Red Teaming Track)",
      year: "2026",
      link: "https://arxiv.org/abs/2502.09696",
      page: "https://zerobench.github.io/",
      image: "/papers/zerobench.webp",
    },
    {
      title: "Re:Verse — Can Your VLM Read a Manga?",
      featured: 3,
      authors: (
        <>
          <strong>A. Baranwal</strong>, M. Kataria, N. Agrawal, Y.S. Rawat, S. Vyas
        </>
      ),
      venue: "ICCV Workshops (AISTORY)",
      year: "2025",
      link: "https://arxiv.org/abs/2508.08508",
      award: "Best Paper (Oral)",
      page: "https://re-verse.vercel.app",
      image: "/papers/re-verse.webp",
    },
    {
      title: "SynSpill: Improved Industrial Spill Detection With Synthetic Data",
      authors: (
        <>
          <strong>A. Baranwal</strong>, A. Mueez, J. Voelker, G. Bhatia, S. Vyas
        </>
      ),
      venue: "ICCV Workshops (VISION)",
      year: "2025",
      link: "https://arxiv.org/abs/2508.10171",
      page: "https://synspill.vercel.app",
      image: "/papers/synspill.webp",
    },
    {
      title: "MolSight: Molecular Property Prediction with Images",
      authors: (
        <>
          <strong>A. Baranwal</strong>, A. Gupta, S. Vyas, Y.S. Rawat
        </>
      ),
      venue: "Under Review",
      year: "2026",
      link: "https://arxiv.org/abs/2605.10157",
      image: "/papers/molsight.webp",
    },
    {
      title: "The Dark Regulome: Disentangling Predictability from Regulation in Genomic Foundation Models",
      authors: (
        <>
          C. Baranwal, <strong>A. Baranwal</strong>, L.N. Tandon
        </>
      ),
      venue: "Preprint",
      year: "2026",
      link: "https://arxiv.org/abs/2606.06834",
      image: "/papers/dark-regulome.webp",
    },
  ],
};

const gallery = {
  label: "Gallery",
  title: "(｡◕‿‿◕｡)",
  heading: "Gallery",
  description: `A collection of photos and poems by ${person.name}`,
  images: [],
  items: [
    {
      type: "poem",
      filePath: "/gallery/poems/goodwithwords.txt",
      title: "GOOD WITH WORDS...",
      imageSrc: "/assets/GOOD-WITH-WORDS.jpg",
    },
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
    {
      type: "poem",
      filePath: "/gallery/poems/lordofbeasts.txt",
      title: "LORD OF BEASTS...",
      imageSrc: "/assets/LORD-OF-BEASTS.jpg",
    },
    {
      type: "poem",
      filePath: "/gallery/poems/settingsun.txt",
      title: "SETTING SUN...",
      imageSrc: "/assets/SETTING-SUN.jpg",
    },
    {
      type: "poem",
      filePath: "/gallery/poems/nh32.txt",
      title: "NH32...",
      imageSrc: "/assets/NH32.jpg",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, publications };

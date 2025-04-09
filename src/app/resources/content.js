import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Aaditya",
  lastName: "Baranwal",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI Researcher",
  avatar: "/images/avatar.jpg",
  location: "America/New_York", // Updated to match your current location in Orlando, FL
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
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Aaditya is an AI researcher passionate about leveraging deep learning,
        foundation models, and innovative solutions to solve real-world problems. His expertise lies in creating
        scalable AI tools and advancing computer vision methodologies.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Siemens Energy",
        timeframe: "Jan. 2025 - Present",
        role: "Data Science Researcher",
        achievements: [
          <>
            Developed scalable zero-shot hazard detection systems using Foundation Models,
            significantly enhancing industrial safety standards.
          </>,
        ],
        images: [],
      },
      {
        company: "AlphaBake",
        timeframe: "Jun. 2024 - Aug. 2024",
        role: "Artificial Intelligence Engineer",
        achievements: [
          <>
            Improved realism in virtual garment fitting using Stable Diffusion and advanced AI adapters.
          </>,
        ],
        images: [],
      },
      {
        company: "Bosch Global Software Technologies",
        timeframe: "Jun. 2023 - Nov. 2023",
        role: "Deep Learning Research Intern",
        achievements: [
          <>
            Conducted analysis and fine-tuning of Vision Foundation Models for Autonomous Driving.
          </>,
          <>
            Enhanced interactive segmentation with Visual GPT-inspired architectures.
          </>,
        ],
        images: [],
      },
      {
        company: "Dimensionless Technologies",
        timeframe: "Jun. 2022 - Aug. 2022",
        role: "Computer Vision Intern",
        achievements: [
          <>
            Developed AI-driven counterfeit detection systems for e-commerce platforms.
          </>,
        ],
        images: [],
      },
      {
        company: "Mathrithms",
        timeframe: "Jan. 2021 - Apr. 2021",
        role: "Python Developer",
        achievements: [
          <>
            Built a widely-used Python SDK for BunnyCDN's cloud services.
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
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };

import AIART from "../src/assets/images/AIART.png";
import PROJECTS from "../src/assets/images/PROJECTS.png";

const logotext = "@aeternum";
const meta = {
    title: "Aaditya Baranwal",
    description: "I’m Aaditya AI Enthusiast _ Computer Vision Engineer, playing with State of the Art Deep Learning Models",
};

const introdata = {
    title: "I’m Aaditya Baranwal",
    animated: {
        first: "i innovate",
        second: "i structure",
        third: "i give bear hugs :)",
    },
    description_fun: "aspiring sentient AI creator ^.^ ",
    description_serious: "I’m a Artificial Intelligence Developer, playing with State of the Art Deep Learning Models",
    your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

const dataabout = {
    title: "abit about my self",
    aboutme: "I’m pursuing my B.Tech in EE and Visual Computing from IIT Jodhpur. I lust beautiful Algorithms, currently stalking Stable Diffusion and Generative AI",
};
const worktimeline = [{
        jobtitle: "Computer Vision Research Intern",
        where: "Bosch Global Software Technologies",
        date: "2022",
    },
    {
        jobtitle: "Deep Learning and Vision Intern",
        where: "Dimensionless Technologies",
        date: "2022",
    },
    {
        jobtitle: "AI/ML Software Intern",
        where: "GMAC Intelligence",
        date: "2022",
    },
    {
        jobtitle: "Python Developer",
        where: "Mathrithms",
        date: "2021",
    },
];

const skills = [{
        name: "Python",
        value: 90,
    },
    {
        name: "Matlab",
        value: 85,
    },
    {
        name: "SQL",
        value: 85,
    },
    {
        name: "C++",
        value: 85,
    },
    {
        name: "Javascript",
        value: 80,
    },
    {
        name: "React",
        value: 60,
    },
];

const achievements = [{
        title: "Winner of Michelin Mobility Innovation Challenge",
        description: "Created an AI based automotive solution to void the negative impact of artisnal to autonomous transition of mining.",
    },
    {
        title: "Bagged a Perfect Score of 100/100 ABU Robocon",
        description: "Led the team working on the mechanism of the R2 seeker by Ideating is motion dynamics and impementing CV/AI subparts.",
    },
    {
        title: "Ranked 7th Inter IIT Techmeet (DRDOs UAV guided UGV)",
        description: "Brainstormed and implemented a depth-vision based navigation system for the UGV using Deep Learning and Computer Vision.",
    },
];

const dataportfolio = [{
        img: PROJECTS,
        desctiption: "Projects",
        link: "/portfolio/projects",
    },
    {
        img: "https://picsum.photos/500/675/?grayscale",
        desctiption: "Blogs",
        link: "/ruko_zara",
    },
    {
        img: "https://picsum.photos/600/400/?grayscale",
        desctiption: "Poetry",
        link: "/ruko_zara",
    },
    {
        img: AIART,
        desctiption: "AI Art Gallery",
        link: "/ruko_zara",
    },
    {
        img: "https://picsum.photos/800/500?blur=7",
        desctiption: "Random",
        link: "/ruko_zara",
    },
];


const dataruko_zara = [{
    img: "https://picsum.photos/400/900/?grayscale",
    desctiption: "Coming",
    link: "#",
},
{
    img: "https://picsum.photos/400?grayscale",
    desctiption: "Soon",
    link: "#",
},
{
    img: "https://picsum.photos/400/700/?grayscale",
    desctiption: "Coming",
    link: "#",
},
{
    img: "https://picsum.photos/400/600?grayscale",
    desctiption: "Soon",
    link: "#",
},
{
    img: "https://picsum.photos/400/800/?grayscale",
    desctiption: "Coming",
    link: "#",
},
{
    img: "https://picsum.photos/400/500?grayscale",
    desctiption: "Soon",
    link: "#",
},
];

let pr_height_1 = Math.floor((Math.random() * 400) + 300)
let pr_height_2 = Math.floor((Math.random() * 400) + 400)
let pr_height_3 = Math.floor((Math.random() * 400) + 300)


const dataprojects = [{
    img: "https://picsum.photos/400/"+pr_height_1+"/?grayscale",
    title: "Gesture Controlled AMR",
    desctiption: "Modelled AI, ROS, Communication & Control Pipeline, Instance Segmentation (K-means & Neural-Net architectures), Hand detection(YOLO & Keypoint Mapping), and real-time gesture action classification (LSTM) using robust Parallel Processing with Reinforcement Learning for Autonomous Visual-Servoing and Navigation.",
    link: "#",
},
{
    img: "https://picsum.photos/400/"+(1300-pr_height_1)+"?grayscale",
    title: "UAV guided UGV",
    desctiption: "Ideated a travelling algorithm for UAVs and implemented it using K-means segmentation, Depth-Vision for trajectory construction, and PID control for stable path-following capability using Differential Kinetics and Created a Computation economic pipeline that optimizes ROS code for Image processing and Robot Control Mechanisms.",
    link: "#",
},
{
    img: "https://picsum.photos/400/"+pr_height_2+"/?grayscale",
    title: "Speech Emotion Recognition Webapp",
    desctiption: "Augmented and Pre-processed the Audio data to task-relevant variations, Applied STFT Algorithm generating Chroma Vector, and fed the data to models including xgboost, shallow MLP, and LSTM(RNNs) and Developed a web App and deployed the best model chosen based on accuracy metrics to determine Emotional State from speech using standard phrases using Javascript, Html, and CSS.",    
    link: "#",
},
{
    img: "https://picsum.photos/400/"+(1300-pr_height_2)+"?grayscale",
    title: "Precision Echocardiography",
    desctiption: "Designed and Proposed a robust Stewart Platform - AI System to ascertain different camera-target configurations in real-time. High precision owing to real-time sensitivity of healthcare data and then created physical prototype of the platform relays autonomously to the desired configuration using imagery(Extracted Feature Pyramid) of the human heart for accurate Echocardiography.",
    link: "#",
},
{
    img: "https://picsum.photos/400/"+pr_height_3+"/?grayscale",
    title: "Personality Prediction from Social Media Comments",
    desctiption: "Implemented Multilabel Classification on social media texts(comments and posts) to categorize a user into one of the 16 Myers and Briggs Personalities using custom Ensemble Learning and Model Averaging methods. Performed Data Preprocessing with proper punctuators and separators, Vectorization, and Lemmatization of preprocessed data and fed it into the Bayesian ML model using Inverse Document Frequency for Prediction",
    link: "#",
},
{
    img: "https://picsum.photos/400/"+(1300-pr_height_3)+"/?grayscale",
    title: "Semantic Verification of Online Reviews",
    desctiption: "Created a three-stage sequential pipeline matching the review texts with review reasons: a)Calculating sentiment score on texts and reason separately and filtering out the samples where the score difference is more significant than 30%. b) Applying contrastive BERT (wordnet pre-trained) on the streamlined list to fetch matching texts and reasons. c) Using a BERT supervised for the downstream classification of text and reason order correctness.",
    link: "#",
},
];

const contactConfig = {
    YOUR_EMAIL: "baranwal.1@iitj.ac.in",
    YOUR_FONE: "+91 7054161004",
    description: "I sleep through half my calls, so if I don’t answer, leave a message or better drop an email and I’ll get back to you.",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "@aeternum_website",
    YOUR_TEMPLATE_ID: "@aeternum_website_tem",
    YOUR_USER_ID: "fGPqutuhvC_JG9eCP",
};

const socialprofils = {
    github: "https://github.com/eternal-f1ame/",
    linkedin: "https://www.linkedin.com/in/aadityabaranwal/",
    twitter: "https://twitter.com/b20ee001/",
};
export {
    meta,
    dataabout,
    dataportfolio,
    dataruko_zara,
    dataprojects,
    worktimeline,
    skills,
    achievements,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};

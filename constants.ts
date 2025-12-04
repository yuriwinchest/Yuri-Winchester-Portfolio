import { Project, SkillCategory } from './types';

// Images from the provided HTML/Screenshots
export const IMAGES = {
  PROFILE: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-bUO-WJWfryrgUjhelBeaOFXVmcvVmrsIDiPjo9L40F8fgmo1rz0eoNX1dCYt6kT4Dz3HhJeALImgOgd_2GlIAKPArcHtb2yZBP_sIVIV_UZPoiXa2LKAYVaSEkS6DdX-CyWVX81d829XQXaZ4Nvwzc92aadGzNXmGlb4SVASztDxoCWD26s77B7GSAWStkbzDPZBFxwW8hwWy8QhRWEOW_702P6n4jA207ga8QO9GamFCYLATOUkDLEWQT1Tvq7Wi_z1_-4pepk",
  PROJECT_MGMT: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN3K9ysprlTutLAjFc6dzDwfEGk7mtcpr1yS5aF54hOHos-_W1uLIm5iXoQmdZN8qH7uQD1OjCVj23OGZ6cnOtG7dAfBE5VdzjR-8LggemlG2C9uKAMKUPsf-U5oik_4JZI1szVVdYm6bi7VNUzry2LjCgW9qLyOUqoQZFg8-rS3FQ5cRWjXg-PSlfI5t5jzkrc-trinhFKU4C2_4FwuHk8J-PuGlexhtFfBFbSqZu4xKwiayE0R-eB60_7wXcp5vW-7SAg0sbKNI",
  ECOMMERCE: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6YH7-2YKDcekIPpoZcVVmpq4nIz3oH1ZFucIqU4iFBKg57hmoyoqRZByfJOYifp93ckzd7bMr985ApHSIkfZ7unI4ae3pzxF-AI4O5ASvycilyTg1dQkm8qVOqhCAoPAGsAea2aOxiyyETtE66Iv-m14uKCao8OlNLYociuI2JFr41XpD8ghsR_7pW34O4c3rlwHMb_pYcU5xTjv_m_M3xFBeLbEDv473wreypZrZmMqqWI8l6xpPZeaLs3ElJgQ4Zwp275h99Kc",
  WEATHER: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz9rmHErTwc0m4deA2oBSiOhbcoXgc14aaf4IIDcVuXa4l1OXYJ1uBRtw2n8vBuz9StZXp0T2FGskVcRYoKVkHJSAV6kwvqNIJR8l6BN6VR_2itvNIJmjMugaNobvpWBem_7OQSwyLt2Es1vlwnrrZW12_mHdpbhrsnoPqk5Fr9bpnIUo7k5RHz3csrCBUxlR1_lHDxwMum7RtWjYjciWzMstYlx7Lkn9YGtsyCm5h2gk8zB00ukTRLn6BWd6VwWNMgDJLh3Txlbw",
  DASHBOARD: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8rp6B_JHA9eFpGydO7cfDv-psU8fV8ZhTFlQ-TtbiQPgTTk3_0xbGx0oRk09NHKCAc3oUhAK_pS8vsSKrsuYpWmPpQ8-StDKvHPJHV6pjxFICsi3KJoR6PTL8nmscyZkZTaBpl61AfJDiI00sUFEQRglH42gkkE7xgkYXMSfZfVMlwOczNfLJByobu4tSgeb2dWh5drl480wwfKtNE8HAoOjJUNz2PLDjof6IKuIXEJe5mkFZ6EoyApEJfYRI36X4qXU-z4wbqsM",
  BLOG: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7K0dbGYsvlF8sq7XLrUHcGjTjvmoEkmzjl8RBtlsS3KnizAck44fkjSVW5XveLBZf-SvgC0q3JwCwHDEVx2yx0EtHo2IR5bhS_KCZpj02Fr0iImKocLiuKYoPOruRjMaqKgjBdNKzA3XmdYUwa1kzHD4PuWxZGktazypwwDzClSC46i1VRfIkzRgFQ6IcdnTki0ERXag6UBqIJ41VKLmJDuUojjXKtWOQqqXsIwBsXSWaL8i944x_oWeBvhBJjyYAkUl70M9nP3Y",
  CHATBOT: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2l3_ZOFEOlxrxlUjbeerMYh9yDsK2k0y7mx0LJElfaU-aHV98699tyyCYUf2xqItsBptOa5lXM0Ezp06WPG9bkV6MvfwiOKd1EZ5enHSFMP9Ty4Xb2PLNjQtRhoa1xS_8R9LdXZy8pZ49cgIgezGlQpabsuIEWSNaCJmKZh7OQt0Vc0Y_KyZg9ltVe7RzYDlp8yQtca-jtn2ntzWsJxVaMachckyUtKC37CcKz8Ua3r0BlX-G2xpzQWMjdectD8Y8NRU83CWulxk",
  PROFILE_SKILLS: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaKo2tn3_wpIXLDQOhTAfJopl1qqJfWBQL-kPjJ4KwFB_U5Vig0AswEcDgFCdwQsuXNceFokQpu8S7VonckLJD9Z31SmPoPL0cv6HB53al4FztohYxUIxDWndJU8WXgw0ZJWjG5QUAKJoZQK6KjJWioffweLY7HKpYFipYLLpVGDSeDuOUXLr65H7yx-4q6M4TCC6tQz0UCbibqvutsi2IKovWpBAbnOn7lt-xBrdDtLCAsPv0TK8U1naIlMMnH99ANBz9N1F9M9U",
  CONTACT_PROFILE: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnFcgNDmzjpsx5aC0CPsyybnMoPcOQ4BHuFSpYWFkC2tEnSgbHwoCAd5rH6RNUm2oCQ5w1DuK0lfYDrm_VuremUp6r4zop1pIJN--tttnROXTA74DYJtViiYQAa_Sdm9SZeMY1ryH1BG6rPL_DA6RWfsIDHPQlRhiQAODbTwIgCiBITxex9hR0SH-Yk7Xf8tDjWNphg-mMnyWsLhUSD-uXmc7OXAg55pX9IFS6pAeJf5fRE_KDNRmUW56uJ-LFgx8XdSHVZik_JOY"
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Project Management Tool",
    description: "A collaborative platform for teams to manage tasks, track progress, and communicate effectively. Built with React and Node.js.",
    image: IMAGES.PROJECT_MGMT
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A fully-featured online store with product catalogs, shopping cart, and secure checkout. Developed using Next.js and Stripe integration.",
    image: IMAGES.ECOMMERCE
  },
  {
    id: 3,
    title: "Weather Forecast App",
    description: "A clean and intuitive weather app that provides real-time data and forecasts using a third-party API. Built with Vue.js and Tailwind CSS.",
    image: IMAGES.WEATHER
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets with dynamic charts and graphs. Powered by D3.js and Python (Flask).",
    image: IMAGES.DASHBOARD
  },
  {
    id: 5,
    title: "Personal Blog Engine",
    description: "A lightweight, markdown-based blog engine with a focus on performance and simplicity. Built from scratch with Go and SQLite.",
    image: IMAGES.BLOG
  },
  {
    id: 6,
    title: "AI-Powered Chatbot",
    description: "A customer service chatbot integrated with a messaging platform to provide instant support. Utilizes NLP and machine learning models.",
    image: IMAGES.CHATBOT
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "web",
    skills: [
      { name: "React.js" },
      { name: "Vue.js" },
      { name: "HTML5" },
      { name: "CSS3" }
    ]
  },
  {
    title: "Backend",
    icon: "dns",
    skills: [
      { name: "Python" },
      { name: "Node.js" },
      { name: "PHP" }
    ]
  },
  {
    title: "Databases",
    icon: "storage",
    skills: [
      { name: "MySQL" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "SQLite" }
    ]
  },
  {
    title: "Authentication",
    icon: "verified_user",
    skills: [
      { name: "OAuth 2.0" },
      { name: "JWT" },
      { name: "Firebase Auth" },
      { name: "AWS Cognito" }
    ]
  },
  {
    title: "Payments",
    icon: "credit_card",
    skills: [
      { name: "Mercado Pago" },
      { name: "Stripe" },
      { name: "PayPal" }
    ]
  },
  {
    title: "DevOps",
    icon: "cloud_sync",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "GitHub Actions" }
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: "smart_toy",
    skills: [
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "Google Colab" },
      { name: "Vertex AI" },
      { name: "Azure" },
      { name: "IBM Watson" },
      { name: "OpenCV" },
      { name: "ChatGPT" }
    ]
  }
];
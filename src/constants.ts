import { Project, SkillCategory } from './types';

export const CONTACT_INFO = {
  EMAIL: "yuriallmeida@gmail.com",
  WHATSAPP: "5561993521849",
  LOCATION: "Brasília, DF - Brasil",
  LINKEDIN: "#",
  GITHUB: "#"
};

// Imagens padrão (Fallback)
export const IMAGES = {
  // O app tentará carregar do Supabase 'site_settings' primeiro.
  PROFILE: "https://placehold.co/600x600?text=Envie+Foto+no+Admin",
  PROJECT_MGMT: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN3K9ysprlTutLAjFc6dzDwfEGk7mtcpr1yS5aF54hOHos-_W1uLIm5iXoQmdZN8qH7uQD1OjCVj23OGZ6cnOtG7dAfBE5VdzjR-8LggemlG2C9uKAMKUPsf-U5oik_4JZI1szVVdYm6bi7VNUzry2LjCgW9qLyOUqoQZFg8-rS3FQ5cRWjXg-PSlfI5t5jzkrc-trinhFKU4C2_4FwuHk8J-PuGlexhtFfBFbSqZu4xKwiayE0R-eB60_7wXcp5vW-7SAg0sbKNI",
  ECOMMERCE: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6YH7-2YKDcekIPpoZcVVmpq4nIz3oH1ZFucIqU4iFBKg57hmoyoqRZByfJOYifp93ckzd7bMr985ApHSIkfZ7unI4ae3pzxF-AI4O5ASvycilyTg1dQkm8qVOqhCAoPAGsAea2aOxiyyETtE66Iv-m14uKCao8OlNLYociuI2JFr41XpD8ghsR_7pW34O4c3rlwHMb_pYcU5xTjv_m_M3xFBeLbEDv473wreypZrZmMqqWI8l6xpPZeaLs3ElJgQ4Zwp275h99Kc",
  WEATHER: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz9rmHErTwc0m4deA2oBSiOhbcoXgc14aaf4IIDcVuXa4l1OXYJ1uBRtw2n8vBuz9StZXp0T2FGskVcRYoKVkHJSAV6kwvqNIJR8l6BN6VR_2itvNIJmjMugaNobvpWBem_7OQSwyLt2Es1vlwnrrZW12_mHdpbhrsnoPqk5Fr9bpnIUo7k5RHz3csrCBUxlR1_lHDxwMum7RtWjYjciWzMstYlx7Lkn9YGtsyCm5h2gk8zB00ukTRLn6BWd6VwWNMgDJLh3Txlbw",
  DASHBOARD: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8rp6B_JHA9eFpGydO7cfDv-psU8fV8ZhTFlQ-TtbiQPgTTk3_0xbGx0oRk09NHKCAc3oUhAK_pS8vsSKrsuYpWmPpQ8-StDKvHPJHV6pjxFICsi3KJoR6PTL8nmscyZkZTaBpl61AfJDiI00sUFEQRglH42gkkE7xgkYXMSfZfVMlwOczNfLJByobu4tSgeb2dWh5drl480wwfKtNE8HAoOjJUNz2PLDjof6IKuIXEJe5mkFZ6EoyApEJfYRI36X4qXU-z4wbqsM",
  BLOG: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7K0dbGYsvlF8sq7XLrUHcGjTjvmoEkmzjl8RBtlsS3KnizAck44fkjSVW5XveLBZf-SvgC0q3JwCwHDEVx2yx0EtHo2IR5bhS_KCZpj02Fr0iImKocLiuKYoPOruRjMaqKgjBdNKzA3XmdYUwa1kzHD4PuWxZGktazypwwDzClSC46i1VRfIkzRgFQ6IcdnTki0ERXag6UBqIJ41VKLmJDuUojjXKtWOQqqXsIwBsXSWaL8i944x_oWeBvhBJjyYAkUl70M9nP3Y",
  CHATBOT: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2l3_ZOFEOlxrxlUjbeerMYh9yDsK2k0y7mx0LJElfaU-aHV98699tyyCYUf2xqItsBptOa5lXM0Ezp06WPG9bkV6MvfwiOKd1EZ5enHSFMP9Ty4Xb2PLNjQtRhoa1xS_8R9LdXZy8pZ49cgIgezGlQpabsuIEWSNaCJmKZh7OQt0Vc0Y_KyZg9ltVe7RzYDlp8yQtca-jtn2ntzWsJxVaMachckyUtKC37CcKz8Ua3r0BlX-G2xpzQWMjdectD8Y8NRU83CWulxk",
  PROFILE_SKILLS: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaKo2tn3_wpIXLDQOhTAfJopl1qqJfWBQL-kPjJ4KwFB_U5Vig0AswEcDgFCdwQsuXNceFokQpu8S7VonckLJD9Z31SmPoPL0cv6HB53al4FztohYxUIxDWndJU8WXgw0ZJWjG5QUAKJoZQK6KjJWioffweLY7HKpYFipYLLpVGDSeDuOUXLr65H7yx-4q6M4TCC6tQz0UCbibqvutsi2IKovWpBAbnOn7lt-xBrdDtLCAsPv0TK8U1naIlMMnH99ANBz9N1F9M9U",
  CONTACT_PROFILE: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnFcgNDmzjpsx5aC0CPsyybnMoPcOQ4BHuFSpYWFkC2tEnSgbHwoCAd5rH6RNUm2oCQ5w1DuK0lfYDrm_VuremUp6r4zop1pIJN--tttnROXTA74DYJtViiYQAa_Sdm9SZeMY1ryH1BG6rPL_DA6RWfsIDHPQlRhiQAODbTwIgCiBITxex9hR0SH-Yk7Xf8tDjWNphg-mMnyWsLhUSD-uXmc7OXAg55pX9IFS6pAeJf5fRE_KDNRmUW56uJ-LFgx8XdSHVZik_JOY"
};

// Dados de fallback se o banco estiver vazio
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Ferramenta de Gestão de Projetos",
    description: "Uma plataforma colaborativa para equipes gerenciarem tarefas, acompanharem o progresso e se comunicarem de forma eficaz. Construído com React e Node.js.",
    image: IMAGES.PROJECT_MGMT,
    live_link: "#"
  },
  {
    id: 2,
    title: "Plataforma de E-commerce",
    description: "Uma loja online completa com catálogos de produtos, carrinho de compras e checkout seguro. Desenvolvido usando Next.js e integração com Stripe.",
    image: IMAGES.ECOMMERCE,
    live_link: "#"
  },
  {
    id: 3,
    title: "App de Previsão do Tempo",
    description: "Um app limpo e intuitivo que fornece dados em tempo real e previsões usando uma API de terceiros. Construído com Vue.js e Tailwind CSS.",
    image: IMAGES.WEATHER,
    live_link: "#"
  },
  {
    id: 4,
    title: "Dashboard de Visualização de Dados",
    description: "Um painel interativo para visualizar conjuntos de dados complexos com gráficos dinâmicos. Desenvolvido com D3.js e Python (Flask).",
    image: IMAGES.DASHBOARD,
    live_link: "#"
  },
  {
    id: 5,
    title: "Blog Pessoal Minimalista",
    description: "Um motor de blog leve baseado em markdown com foco em desempenho e simplicidade. Construído do zero com Go e SQLite.",
    image: IMAGES.BLOG,
    live_link: "#"
  },
  {
    id: 6,
    title: "Chatbot com IA",
    description: "Um chatbot de atendimento ao cliente integrado com plataforma de mensagens para suporte instantâneo. Utiliza PNL e modelos de aprendizado de máquina.",
    image: IMAGES.CHATBOT,
    live_link: "#"
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
    title: "Banco de Dados",
    icon: "storage",
    skills: [
      { name: "MySQL" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "SQLite" }
    ]
  },
  {
    title: "Autenticação",
    icon: "verified_user",
    skills: [
      { name: "OAuth 2.0" },
      { name: "JWT" },
      { name: "Firebase Auth" },
      { name: "AWS Cognito" }
    ]
  },
  {
    title: "Pagamentos",
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
    title: "IA & Machine Learning",
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
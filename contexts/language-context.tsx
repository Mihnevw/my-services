"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define language type
export type Language = {
  code: string
  name: string
  flag: string
  speechCode: string
}

// Available languages
export const LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
    speechCode: "en-US",
  },
  {
    code: "bg",
    name: "Български",
    flag: "🇧🇬",
    speechCode: "bg-BG",
  },
]

// Type for nested translations
type TranslationDict = {
  [key: string]: string | string[] | TranslationDict;
};

// All translations with duplicate keys removed or renamed
export const translations: { [lang: string]: TranslationDict } = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    pricing: "Pricing",
    testimonials: "Testimonials",
    blog: "Blog",
    contact: "Contact",
    login: "Login",
    register: "Register",
    logout: "Logout",
    profile: "Profile",

    // Hero
    welcome: "Welcome",
    welcomeToPortfolio: "Welcome to My Portfolio",
    heroDescription: "I create beautiful, functional websites that help businesses grow and stand out in the digital landscape",
    getInTouch: "Get in Touch",
    viewMyWork: "View My Work",
    
    // Intro section
    introduction: "Introduction",
    whatIDo: "What I Do & How I Can Help",
    discoverTitle: "Discover How I Can Transform Your Online Presence",
    speechEnabled: "Text-to-speech is enabled. Subtitles will be spoken aloud.",

    // About section
    aboutMe: "About Me",
    passionateWebDeveloper: "Passionate Web Developer",
    aboutDescription1:
      "Hello! I'm a passionate web developer with over 5 years of experience creating beautiful, functional websites and applications. I specialize in modern web technologies and focus on delivering clean, user-friendly designs that help businesses achieve their goals.",
    aboutDescription2:
      "My approach combines technical expertise with creative problem-solving to build digital experiences that stand out. I believe in continuous learning and staying up-to-date with the latest industry trends to provide the best solutions for my clients.",

    // Skills
    webDevelopment: "Web Development",
    webDevelopmentDesc: "Expert in modern frameworks and responsive design principles",
    uiUxDesign: "UI/UX Design",
    uiUxDesignDesc: "Creating intuitive and engaging user experiences",
    performance: "Performance",
    performanceDesc: "Optimizing for speed, accessibility, and search engines",
    collaboration: "Collaboration",
    collaborationDesc: "Working closely with clients to achieve their goals",

    // Services section
    myServices: "My Services",
    whatIOffer: "What I Offer",
    servicesDescription: "I offer a range of services to help you establish a strong online presence",
    seeAllServices: "See All Services",

    // Service items
    webDesign: "Web Design",
    webDesignDesc: "Custom website design focused on user experience and brand identity.",
    webDesignFeatures: [
      "Responsive design for all devices",
      "User experience optimization",
      "Brand integration",
      "Wireframing and prototyping",
    ],

    webDev: "Web Development",
    webDevDesc: "Full-stack development of websites and web applications.",
    webDevFeatures: [
      "Custom coding with modern technologies",
      "Content management system integration",
      "E-commerce functionality",
      "Performance optimization",
    ],

    seoOptimization: "SEO Optimization",
    seoDesc: "Improve your website's visibility in search engines.",
    seoFeatures: [
      "Keyword research and analysis",
      "On-page SEO optimization",
      "Technical SEO improvements",
      "Monthly performance reports",
    ],

    maintenance: "Maintenance",
    maintenanceDesc: "Keep your website secure, updated, and running smoothly.",
    maintenanceFeatures: [
      "Regular software updates",
      "Security monitoring",
      "Performance optimization",
      "Content updates and backups",
    ],

    // Target audience section
    whoIsThisSiteFor: "Who Is This Site For",
    tailoredSolutions: "Tailored Solutions For Your Needs",
    audienceDescription:
      "I provide specialized web development services for different types of clients, each with unique requirements",

    // Audience types
    startups: "Startups",
    startupsDesc:
      "Launch your business with a professional online presence. Get a modern, responsive website that helps you establish credibility and attract investors.",
    onlineStores: "Online Stores",
    onlineStoresDesc:
      "Transform your retail business with a powerful e-commerce platform. Showcase your products beautifully and provide a seamless shopping experience.",
    personalBrands: "Personal Brands",
    personalBrandsDesc:
      "Stand out from the crowd with a distinctive personal brand website. Showcase your portfolio, skills, and services to attract clients and opportunities.",
    whatYouGet: "What you'll get:",
    learnMore: "Learn more about",
    solutions: "solutions",

    // Projects section
    myWork: "My Work",
    recentProjects: "Recent Projects",
    projectsDescription: "Take a look at some of my recent work and the problems I've solved",
    livePreview: "Live Preview",
    sourceCode: "Source Code",

    // Project items
    ecommerce: "E-commerce Website",
    ecommerceDesc: "A fully responsive e-commerce platform with product catalog, shopping cart, and secure checkout.",
    corporateRebrand: "Corporate Rebrand",
    corporateDesc:
      "Complete website redesign for a financial services company, focusing on modern aesthetics and improved UX.",
    mobileApp: "Mobile App",
    mobileAppDesc: "Cross-platform mobile application for a health and wellness startup with user tracking features.",
    portfolioWebsite: "Portfolio Website",
    portfolioDesc: "Custom portfolio website for a professional photographer with gallery and booking functionality.",

    // Pricing section
    pricingPlans: "Pricing Plans",
    chooseYourPlan: "Choose Your Plan",
    pricingDescription: "Transparent pricing with no hidden fees. Choose the perfect plan for your needs",

    // Plan types
    basic: "Basic",
    basicDesc: "Perfect for small businesses just getting started",
    standard: "Standard",
    standardDesc: "Ideal for growing businesses with specific needs",
    premium: "Premium",
    premiumDesc: "Comprehensive solution for established businesses",
    mostPopular: "Most Popular",
    chooseBasic: "Choose Basic",
    chooseStandard: "Choose Standard",
    choosePremium: "Choose Premium",

    // Testimonials section
    clientFeedback: "Client Feedback",
    testimonialsDescription: "Don't just take my word for it - hear what my clients have to say",

    // Blog section
    latestInsights: "Latest Insights",
    blogDescription: "Insights, tips, and resources to help you succeed in the digital world",
    readMore: "Read more",
    viewAllPosts: "View all posts",

    // Contact section
    contactDescription: "Have a project in mind? Let's discuss how I can help you achieve your goals",
    contactInformation: "Contact Information",
    email: "Email",
    phone: "Phone",
    location: "Location",
    connectWithMe: "Connect with me",
    sendMessage: "Send a Message",
    name: "Name",
    subject: "Subject",
    message: "Message",
    yourMessage: "Your message here...",
    sendMessageBtn: "Send Message",

    // Footer
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",

    // Auth
    welcomeBack: "Welcome back",
    signInToContinue: "Sign in to your account to continue",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign up",
    createAccount: "Create an account",
    signUpToGetStarted: "Sign up to get started",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign in",
    resetPassword: "Reset your password",
    resetPasswordDesc: "Enter your email and we'll send you a link to reset your password",
    sendResetLink: "Send reset link",
    backToLogin: "Back to login",
    checkEmail: "Check your email",
    passwordResetSent: "We've sent a password reset link to",

    // Language
    selectLanguage: "Select Language",
    
    // Example component
    count: "Count",
    increment: "Increment",
    currentLanguage: "Current Language",
    switchLanguage: "Switch Language",
    speakWelcome: "Speak Welcome Message",
  },
  bg: {
    // Navigation
    home: "Начало",
    about: "За мен",
    services: "Услуги",
    projects: "Проекти",
    pricing: "Цени",
    testimonials: "Отзиви",
    blog: "Блог",
    contact: "Контакти",
    login: "Вход",
    register: "Регистрация",
    logout: "Изход",
    profile: "Профил",

    // Hero
    welcome: "Добре дошли",
    welcomeToPortfolio: "Добре дошли в моето портфолио",
    heroDescription: "Създавам красиви, функционални уебсайтове, които помагат на бизнеса да расте и да се отличава в дигиталната среда",
    getInTouch: "Свържете се",
    viewMyWork: "Вижте моята работа",
    
    // Intro section
    introduction: "Въведение",
    whatIDo: "Какво правя и как мога да помогна",
    discoverTitle: "Открийте как мога да трансформирам вашето онлайн присъствие",
    speechEnabled: "Текст към говор е активиран. Субтитрите ще бъдат изговорени на глас.",

    // About section
    aboutMe: "За мен",
    passionateWebDeveloper: "Страстен уеб разработчик",
    aboutDescription1:
      "Здравейте! Аз съм страстен уеб разработчик с над 5 години опит в създаването на красиви, функционални уебсайтове и приложения. Специализирам в модерни уеб технологии и се фокусирам върху предоставянето на чисти, удобни за потребителя дизайни, които помагат на бизнеса да постигне своите цели.",
    aboutDescription2:
      "Моят подход съчетава техническа експертиза с творческо решаване на проблеми, за да изградя дигитални преживявания, които се отличават. Вярвам в непрекъснатото обучение и поддържането на актуална информация за най-новите тенденции в индустрията, за да предоставя най-добрите решения за моите клиенти.",

    // Skills
    webDevelopment: "Уеб разработка",
    webDevelopmentDesc: "Експерт в модерни фреймуърки и принципи на отзивчив дизайн",
    uiUxDesign: "UI/UX Дизайн",
    uiUxDesignDesc: "Създаване на интуитивни и ангажиращи потребителски изживявания",
    performance: "Производителност",
    performanceDesc: "Оптимизация за скорост, достъпност и търсачки",
    collaboration: "Сътрудничество",
    collaborationDesc: "Работя в тясно сътрудничество с клиенти за постигане на техните цели",

    // Services section
    myServices: "Моите услуги",
    whatIOffer: "Какво предлагам",
    servicesDescription: "Предлагам набор от услуги, които ще ви помогнат да установите силно онлайн присъствие",
    seeAllServices: "Вижте всички услуги",

    // Service items
    webDesign: "Уеб дизайн",
    webDesignDesc: "Персонализиран уеб дизайн, фокусиран върху потребителското изживяване и идентичността на марката.",
    webDesignFeatures: [
      "Отзивчив дизайн за всички устройства",
      "Оптимизация на потребителското изживяване",
      "Интеграция на бранда",
      "Прототипиране",
    ],

    webDev: "Уеб разработка",
    webDevDesc: "Пълноценна разработка на уебсайтове и уеб приложения.",
    webDevFeatures: [
      "Персонализирано кодиране с модерни технологии",
      "Интеграция на системи за управление на съдържанието",
      "Функционалност за електронна търговия",
      "Оптимизация на производителността",
    ],

    seoOptimization: "SEO оптимизация",
    seoDesc: "Подобрете видимостта на вашия уебсайт в търсачките.",
    seoFeatures: [
      "Проучване и анализ на ключови думи",
      "Оптимизация на страницата",
      "Технически SEO подобрения",
      "Месечни отчети за производителност",
    ],

    maintenance: "Поддръжка",
    maintenanceDesc: "Поддържайте вашия уебсайт сигурен, актуализиран и работещ гладко.",
    maintenanceFeatures: [
      "Редовни софтуерни актуализации",
      "Мониторинг на сигурността",
      "Оптимизация на производителността",
      "Актуализации на съдържанието и резервни копия",
    ],

    // Target audience section
    whoIsThisSiteFor: "За кого е този сайт",
    tailoredSolutions: "Персонализирани решения за вашите нужди",
    audienceDescription:
      "Предоставям специализирани услуги за уеб разработка за различни типове клиенти, всеки с уникални изисквания",

    // Audience types
    startups: "Стартъпи",
    startupsDesc:
      "Стартирайте бизнеса си с професионално онлайн присъствие. Получете модерен, отзивчив уебсайт, който ви помага да установите доверие и да привлечете инвеститори.",
    onlineStores: "Онлайн магазини",
    onlineStoresDesc:
      "Трансформирайте вашия търговски бизнес с мощна платформа за електронна търговия. Представете красиво вашите продукти и осигурете безпроблемно пазаруване.",
    personalBrands: "Лични брандове",
    personalBrandsDesc:
      "Отличете се от тълпата с отличителен уебсайт за личен бранд. Представете вашето портфолио, умения и услуги, за да привлечете клиенти и възможности.",
    whatYouGet: "Какво ще получите:",
    learnMore: "Научете повече за",
    solutions: "решения",

    // Projects section
    myWork: "Моята работа",
    recentProjects: "Последни проекти",
    projectsDescription: "Разгледайте някои от моите последни проекти и проблемите, които съм решил",
    livePreview: "Преглед на живо",
    sourceCode: "Изходен код",

    // Project items
    ecommerce: "Уебсайт за електронна търговия",
    ecommerceDesc:
      "Напълно отзивчива платформа за електронна търговия с каталог на продуктите, кошница за пазаруване и сигурно плащане.",
    corporateRebrand: "Корпоративен ребрандинг",
    corporateDesc:
      "Цялостен редизайн на уебсайт за финансова компания, фокусиран върху модерна естетика и подобрено потребителско изживяване.",
    mobileApp: "Мобилно приложение",
    mobileAppDesc:
      "Кросплатформено мобилно приложение за стартъп за здраве и уелнес с функции за проследяване на потребителите.",
    portfolioWebsite: "Портфолио уебсайт",
    portfolioDesc:
      "Персонализиран уебсайт за портфолио за професионален фотограф с галерия и функционалност за резервации.",

    // Pricing section
    pricingPlans: "Ценови планове",
    chooseYourPlan: "Изберете вашия план",
    pricingDescription: "Прозрачни цени без скрити такси. Изберете перфектния план за вашите нужди",

    // Plan types
    basic: "Основен",
    basicDesc: "Перфектен за малки бизнеси, които тепърва започват",
    standard: "Стандартен",
    standardDesc: "Идеален за развиващи се бизнеси със специфични нужди",
    premium: "Премиум",
    premiumDesc: "Цялостно решение за установени бизнеси",
    mostPopular: "Най-популярен",
    chooseBasic: "Изберете Основен",
    chooseStandard: "Изберете Стандартен",
    choosePremium: "Изберете Премиум",

    // Testimonials section
    clientFeedback: "Отзиви от клиенти",
    testimonialsDescription: "Не вярвайте само на думите ми - чуйте какво казват моите клиенти",

    // Blog section
    latestInsights: "Последни прозрения",
    blogDescription: "Прозрения, съвети и ресурси, които ще ви помогнат да успеете в дигиталния свят",
    readMore: "Прочетете повече",
    viewAllPosts: "Вижте всички публикации",

    // Contact section
    contactDescription: "Имате проект наум? Нека обсъдим как мога да ви помогна да постигнете вашите цели",
    contactInformation: "Информация за контакт",
    email: "Имейл",
    phone: "Телефон",
    location: "Местоположение",
    connectWithMe: "Свържете се с мен",
    sendMessage: "Изпратете съобщение",
    name: "Име",
    subject: "Тема",
    message: "Съобщение",
    yourMessage: "Вашето съобщение тук...",
    sendMessageBtn: "Изпратете съобщение",

    // Footer
    allRightsReserved: "Всички права запазени.",
    privacyPolicy: "Политика за поверителност",
    termsOfService: "Условия за ползване",
    cookiePolicy: "Политика за бисквитките",

    // Auth
    welcomeBack: "Добре дошли отново",
    signInToContinue: "Влезте в акаунта си, за да продължите",
    forgotPassword: "Забравена парола?",
    dontHaveAccount: "Нямате акаунт?",
    signUp: "Регистрирайте се",
    createAccount: "Създайте акаунт",
    signUpToGetStarted: "Регистрирайте се, за да започнете",
    alreadyHaveAccount: "Вече имате акаунт?",
    signIn: "Вход",
    resetPassword: "Нулиране на паролата",
    resetPasswordDesc: "Въведете имейла си и ще ви изпратим връзка за нулиране на паролата",
    sendResetLink: "Изпратете връзка за нулиране",
    backToLogin: "Обратно към входа",
    checkEmail: "Проверете имейла си",
    passwordResetSent: "Изпратихме връзка за нулиране на паролата на",

    // Language
    selectLanguage: "Изберете език",
    
    // Example component
    count: "Брой",
    increment: "Увеличи",
    currentLanguage: "Текущ език",
    switchLanguage: "Смени езика",
    speakWelcome: "Изговори приветственото съобщение",
  },
}

// Create the context
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string  // Function, not a record
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(LANGUAGES[0])

  // Helper function for dot notation translation
  function translate(key: string): string {
    const dict = translations[language.code as keyof typeof translations] || translations.en;
    const value = key.split('.').reduce((obj, k) => {
      if (obj && typeof obj === 'object' && k in obj) {
        return (obj as any)[k];
      }
      return undefined;
    }, dict as any);
    
    return typeof value === 'string' ? value : key;
  }

  // Load saved language preference from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language")
      if (savedLanguage) {
        try {
          const parsedLanguage = JSON.parse(savedLanguage)
          const foundLanguage = LANGUAGES.find((lang) => lang.code === parsedLanguage.code)
          if (foundLanguage) {
            setLanguage(foundLanguage)
          }
        } catch (error) {
          console.error("Error parsing saved language:", error)
        }
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0]
        const foundLanguage = LANGUAGES.find((lang) => lang.code === browserLang)
        if (foundLanguage) {
          setLanguage(foundLanguage)
        }
      }
    }
  }, [])

  // Update translations when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", JSON.stringify(language))
      document.documentElement.lang = language.code
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

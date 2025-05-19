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

// All translations with duplicate keys removed
export const translations: { [lang: string]: TranslationDict } = {
  en: {
    // Common translations
    backToHome: "Back to Home",
    security: "Security",
    socialLinks: "Social Links",
    preferences: "Preferences",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    saving: "Saving...",
    updating: "Updating...",
    processing: "Processing...",
    optional: "(Optional)",

    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    pricing: "Pricing",
    testimonials: "Testimonials",
    blog: "Blog",
    eComerce: "E-commerce",
    branding: "Branding",
    caseStudies: "Case Studies",
    portfolio: "Portfolio",
    faq: "FAQ",
    support: "Support",
    resources: "Resources",
    contact: "Contact",
    login: "Login",
    register: "Register",
    logout: "Logout",
    profile: "Profile",
    signOut: "Sign Out",
    signOutConfirm: "Are you sure you want to sign out?",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
    allRightsReserved: "All rights reserved",
    menu: "Menu",

    // Hero
    welcome: "",
    welcomeToPortfolio: "Welcome to the Future of your business",
    heroDescription: "I create beautiful, functional websites that help businesses/startups grow and stand out in the digital landscape.",
    iAmA: "Your",
    getInTouch: "Get in Touch",
    viewMyWork: "View My Work",

    // Rotating text options
    developer: "DEVELOPER",
    designer: "DESIGNER",
    creator: "CREATOR",
    innovator: "INNOVATOR",
    contactDescription: "If you have any questions or would like to discuss a project, please don't hesitate to contact me. I'm here to help you achieve your goals and make your online presence shine.",
    contactInformation: "Contact Information",
    connectWithMe: "Connect with me",
    name: "Name",
    namePlaceholder: "Enter your name",
    email: "Email",
    emailPlaceholder: "Enter your email",
    subject: "Subject",
    subjectPlaceholder: "Enter your subject",
    message: "Message",
    messagePlaceholder: "Enter your message",
    sendMessage: "Send Message",
    yourMessage: "Your Message",
    sendMessageBtn: "Send Message",

    //Login and Register
    loginTitle: "Login to your account",
    registerTitle: "Create an account",
    loginDescription: "Login to your account to continue",
    registerDescription: "Create an account to continue",
    confirmPassword: "Confirm Password",
    passwordMustBeAtLeast8Characters: "Password must be at least 8 characters",
    alreadyHaveAccount: "Already have an account?",
    creatingAccount: "Creating account...",
    createAccount: "Create account",
    fullNameRegister: "Full Name",
    emailRegister: "Email",
    loginBtn: "Login",
    registerBtn: "Register",
    dontHaveAccount: "Don't have an account?",
    orContinueWith: "Or continue with",
    signInWithGoogle: "Sign in with Google",
    signInWithFacebook: "Sign in with Facebook",
    signInWithGitHub: "Sign in with GitHub",
    forgotPassword: "Forgot password?",
    rememberMe: "Remember me",
    signingIn: "Signing in...",
    signIn: "Sign in",
    signUp: "Sign up",
    password: "Password",

    // Intro section
    introduction: "Introduction",
    whatIDo: "What I Do & How I Can Help",
    discoverTitle: "Find out how I can make your online business/startup happen",
    speechEnabled: "Text-to-speech is enabled. Subtitles will be spoken aloud.",
    
    // Language selector dropdown (video)
    languageSelector: "Select Language",
    english: "English",
    bulgarian: "Bulgarian",
    subtitles: "Subtitles",
    audio: "Audio",

    //Language selector dropdown (profile)
    selectLanguage: "Select Language",
    englishProfile: "English",
    bulgarianProfile: "Bulgarian",

    // About section
    aboutMe: "About Me",
    passionateWebDeveloper: "Passionate Web Developer",
    aboutDescription1: "Hello! I'm a passionate web developer with over 2 years of experience creating beautiful, functional websites and applications. I specialize in modern web technologies and focus on delivering clean, user-friendly designs that help businesses achieve their goals.",
    aboutDescription2: "My approach combines technical expertise with creative problem-solving to build digital experiences that stand out. I believe in continuous learning and staying up-to-date with the latest industry trends to provide the best solutions for my clients.",

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
    seePricing: "See Pricing",

    // Service items
    webDesign: "Web Design",
    webDesignPrice: "",
    webDesignDesc: "Custom website design focused on user experience and brand identity.",
    webDesignFeatures: JSON.stringify([
      "Responsive design for all devices",
      "User experience optimization",
      "Brand integration",
      "Wireframing and prototyping",
    ]),

    webDev: "Web Development",
    webDevPrice: "",
    webDevDesc: "Full-stack development of websites and web applications.",
    webDevFeatures: JSON.stringify([
      "Custom coding with modern technologies",
      "Content management system integration",
      "E-commerce functionality",
      "Performance optimization",
    ]),

    seoOptimization: "SEO Optimization",
    seoPrice: "",
    seoDesc: "Improve your website's visibility in search engines.",
    seoFeatures: JSON.stringify([
      "Keyword research and analysis",
      "On-page SEO optimization",
      "Technical SEO improvements",
      "Monthly performance reports",
    ]),

    maintenance: "Maintenance",
    maintenancePrice: "",
    maintenanceDesc: "Keep your website secure, updated, and running smoothly.",
    maintenanceFeatures: JSON.stringify([
      "Regular software updates",
      "Security monitoring",
      "Performance optimization",
      "Content updates and backups",
    ]),

    // Target audience section
    whoIsThisSiteFor: "Who Is This Site For",
    tailoredSolutions: "Tailored Solutions For Your Needs",
    audienceDescription: "I provide specialized web development services for different types of clients, each with unique requirements",

    // Audience types
    startups: "Startups",
    startupsDesc: "Launch your business with a professional online presence. Get a modern, responsive website that helps you establish credibility and attract investors.",
    startupsBenefits: JSON.stringify([
      "Fast turnaround times",
      "Scalable solutions that grow with you",
      "Conversion-focused design",
      "Startup-friendly pricing options"
    ]),
    onlineStores: "Online Stores",
    onlineStoresDesc: "Transform your retail business with a powerful e-commerce platform. Showcase your products beautifully and provide a seamless shopping experience.",
    onlineStoresBenefits: JSON.stringify([
      "Intuitive product management",
      "Secure payment processing",
      "Mobile-optimized shopping experience",
      "Inventory and order management"
    ]),
    personalBrands: "Personal Brands",
    personalBrandsDesc: "Stand out from the crowd with a distinctive personal brand website. Showcase your portfolio, skills, and services to attract clients and opportunities.",
    personalBrandsBenefits: JSON.stringify([
      "Unique, personality-driven design",
      "Portfolio and testimonial showcases",
      "Personal branding strategy",
      "Content management for blogs"
    ]),
    whatYouGet: "What you'll get:",
    learnMore: "Learn more about",
    solutions: "solutions",

    // Projects section
    myWork: "My Work",
    recentProjects: "Recent Projects",
    projectsDescription: "Take a look at some of my recent work and the problems I've solved",
    livePreview: "Live Preview",
    sourceCode: "Source Code",
    descriptionProjects1: "A clean and modern website, custom-built for our client – featuring a convenient online booking system that saves time and eliminates the need to visit in person.",
    descriptionProjects2: "Recircle is a web application for exchanging items (clothes, equipment, books, and more), which is my personal project built entirely from scratch. Its main goal is to support sustainability and promote zero-waste principles.",
    descriptionProjects3: "Rosario is a web application for restaurants featuring a modern and responsive design. It offers easy menu browsing, fast and intuitive navigation, and an option to make online dinner reservations.",
    descriptionProjects4: "This portfolio is built with the client in mind – modern, intuitive, and fully responsive. Projects are loaded directly from GitHub, and the integrated contact form makes it easy to get in touch.",

    // Project items
    ecommerce: "E-commerce Website",
    ecommerceDesc: "A fully responsive e-commerce platform with product catalog, shopping cart, and secure checkout.",
    corporateRebrand: "Corporate Rebrand",
    corporateDesc: "Complete website redesign for a financial services company, focusing on modern aesthetics and improved UX.",
    mobileApp: "Mobile App",
    mobileAppDesc: "Cross-platform mobile application for a health and wellness startup with user tracking features.",
    portfolioWebsite: "Portfolio Website",
    portfolioDesc: "Custom portfolio website for a professional photographer with gallery and booking functionality.",

    // Pricing section
    pricingPlans: "Pricing Plans",
    chooseYourPlan: "Choose Your Plan",
    pricingDescription: "Transparent pricing with no hidden fees. Choose the perfect plan for your needs",
    pricingHeader: "Pricing Plans",
    pricingSubHeader: "Choose Your Plan",
    planBasicName: "Basic",
    planBasicDesc: "Perfect for small businesses just getting started",
    planBasicCTA: "Choose Basic",
    planStandardName: "Standard",
    planStandardDesc: "Ideal for growing businesses with specific needs",
    planStandardCTA: "Choose Standard",
    planPremiumName: "Premium",
    planPremiumDesc: "Comprehensive solution for established businesses",
    planPremiumCTA: "Choose Premium",
    pricingMostPopular: "Most Popular",
    PlanPriceBasic: "$300",
    PlanPriceStandard: "$680",
    PlanPricePremium: "$1300",
    pricingFeatureBasic1: "5-page responsive website",
    pricingFeatureBasic2: "Basic SEO setup",
    pricingFeatureBasic3: "Contact form",
    pricingFeatureBasic4: "Mobile-friendly design",
    pricingFeatureBasic5: "1 month of support",
    pricingFeatureStandard1: "10-page responsive website",
    pricingFeatureStandard2: "Advanced SEO optimization",
    pricingFeatureStandard3: "Content management system",
    pricingFeatureStandard4: "Blog integration",
    pricingFeatureStandard5: "Social media integration",
    pricingFeatureStandard6: "E-commerce functionality (up to 20 products)",
    pricingFeatureStandard7: "3 months of support",
    pricingFeaturePremium1: "Unlimited pages",
    pricingFeaturePremium2: "Custom design & functionality",
    pricingFeaturePremium3: "Advanced SEO strategy",
    pricingFeaturePremium4: "Full e-commerce solution",
    pricingFeaturePremium5: "Custom integrations",
    pricingFeaturePremium6: "Performance optimization",
    pricingFeaturePremium7: "Security features",
    pricingFeaturePremium8: "6 months of priority support",
    pricingFeaturePremium9: "Monthly performance reports",

    // Testimonials section
    clientFeedback: "Client Feedback",
    testimonialsDescription: "Don't just take my word for it - hear what my clients have to say",
    testimonialSarah: "Sarah Johnson",
    testimonialSarahPosition: "CEO, TechStart Inc.",
    testimonialSarahContent: "Working with this team was an absolute pleasure. They took our outdated website and transformed it into a modern, user-friendly platform that perfectly represents our brand. The attention to detail and commitment to quality exceeded our expectations.",
    testimonialMichael: "Michael Chen",
    testimonialMichaelPosition: "Marketing Director, GrowthBox",
    testimonialMichaelContent: "Our e-commerce sales increased by 45% within three months of launching our new website. The intuitive design and seamless checkout process have significantly improved our conversion rates. I highly recommend their services to any business looking to grow online.",
    testimonialEmma: "Emma Rodriguez",
    testimonialEmmaPosition: "Founder, Artisan Crafts",
    testimonialEmmaContent: "As a small business owner, I needed a website that would showcase my products without breaking the bank. They delivered a beautiful, functional site that fits my budget and has helped me reach new customers. The ongoing support has been invaluable.",
    testimonialDavid: "David Thompson",
    testimonialDavidPosition: "CTO, InnovateTech",
    testimonialDavidContent: "The technical expertise demonstrated throughout our project was impressive. They implemented complex features with ease and ensured our website was fast, secure, and scalable. Their ability to translate technical requirements into practical solutions made all the difference.",
    testimonialRating: "Rating",

    // Blog section
    latestInsights: "Latest Insights",
    blogDescription: "Insights, tips, and resources to help you succeed in the digital world",
    fromOurBlog: "From Our Blog",
    blogPost1Category: "Web Design",
    blogPost1Title: "The Importance of User Experience in Web Design",
    blogPost1Content: "User exp erience (UX) is a crucial aspect of web design that focuses on creating intuitive, engaging, and seamless interactions for users. In this blog post, we'll explore the importance of UX in web design and how it can impact your business.",
    blogPost1Link: "Read More",
    blogPost2Title: "How To Increase Website Conversion Rates: Top Strategies From Digital Experts",
    blogPost2Excerpt: "Discover the latest strategies and techniques to boost your website's conversion rates and turn visitors into customers.",
    blogPost2Category: "Digital Marketing",
    blogPost3Title: "Complete SEO Guide for Web Developers",
    blogPost3Excerpt: "A comprehensive guide to implementing SEO best practices in your web development projects.",
    blogPost3Category: "SEO",

    // Profile Form
    profileInformation: "Profile Information",
    updatePersonalInfo: "Update your personal information and how others see you on the platform",
    profilePicture: "Profile Picture",
    uploadProfilePicture: "Upload profile picture",
    imageRequirements: "JPG, GIF or PNG. Max size of 5MB.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    location: "Location",
    cityCountry: "City, Country",
    bio: "Bio",
    tellUsAboutYourself: "Tell us a little about yourself",
    profileUpdated: "Profile updated successfully!",
    failedToUpdateProfile: "Failed to update profile. Please try again.",
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    emailInvalid: "Email is invalid",
    imageUploadError: "Failed to upload image. Please try again.",
    imageTypeError: "Please upload an image file",
    imageSizeError: "Image size should be less than 5MB",

    // Security Form
    securitySettings: "Security Settings",
    updatePassword: "Update your password and manage your account security",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    passwordRequirements: "Password must be at least 8 characters long and include uppercase, lowercase, and numbers",
    passwordUpdated: "Password changed successfully!",
    failedToUpdatePassword: "Failed to update password. Please try again.",
    currentPasswordRequired: "Current password is required",
    newPasswordRequired: "New password is required",
    passwordTooShort: "Password must be at least 8 characters",
    passwordComplexity: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    passwordsDoNotMatch: "Passwords do not match",
    currentPasswordIncorrect: "Current password is incorrect",
    securityRecommendations: "Security Recommendations",
    keepAccountSecure: "Keep your account secure",
    securityTips: JSON.stringify([
      "Use a strong, unique password that you don't use elsewhere",
      "Enable two-factor authentication for additional security",
      "Regularly check your account for suspicious activity",
      "Never share your password with anyone",
      "Use a password manager to generate and store secure passwords"
    ]),

    // Social Links Form
    socialMediaProfiles: "Social Media Profiles",
    connectSocialAccounts: "Connect your social media accounts to your profile",
    socialMediaLinks: "Social Media Links",
    invalidTwitterUsername: "Invalid Twitter username",
    invalidLinkedinUsername: "Invalid LinkedIn username",
    invalidGithubUsername: "Invalid GitHub username",
    invalidInstagramUsername: "Invalid Instagram username",
    socialLinksUpdated: "Social links updated successfully!",
    failedToUpdateSocialLinks: "Failed to update social links. Please try again.",

    // Preferences Form
    accountPreferences: "Account Preferences",
    customizeSettings: "Customize your account settings and notification preferences",
    notificationSettings: "Notification Settings",
    emailNotifications: "Email Notifications",
    receiveAccountNotifications: "Receive notifications about your account activity",
    marketingEmails: "Marketing Emails",
    receiveFeatureUpdates: "Receive emails about new features and offers",
    projectUpdates: "Project Updates",
    receiveProjectStatus: "Receive updates about your project status",
    appearance: "Appearance",
    theme: "Theme",
    chooseTheme: "Choose your preferred theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    savePreferences: "Save Preferences",
    preferencesUpdated: "Preferences updated successfully!",
    failedToUpdatePreferences: "Failed to update preferences. Please try again.",

    // Portfolio Modal
    addNewPortfolioItem: "Add New Portfolio Item",
    editPortfolioItem: "Edit Portfolio Item",
    projectTitle: "Project Title",
    description: "Description",
    describeProject: "Describe your project...",
    category: "Category",
    completionDate: "Completion Date",
    projectUrl: "Project URL",
    githubUrl: "GitHub URL",
    tags: "Tags",
    addTechnologies: "Add technologies used (e.g., React, Node.js)",
    projectImage: "Project Image",
    recommendedSize: "Recommended size: 800x600px",
    uploadImage: "Upload image",
    featureProject: "Feature this project (highlighted in portfolio)",
    createProject: "Create Project",
    titleRequired: "Title is required",
    descriptionRequired: "Description is required",
    categoryRequired: "Category is required",
    invalidUrl: "Please enter a valid URL starting with http:// or https://",
    tagExists: "This tag already exists",

    // Portfolio Manager
    portfolioManagement: "Portfolio Management",
    showcaseWork: "Showcase your work by adding and managing portfolio items",
    addNewProject: "Add New Project",
    noPortfolioItems: "You haven't added any portfolio items yet.",
    addFirstProject: "Add your first project",
    featured: "Featured",
    added: "Added:",
    viewProject: "View Project",
    edit: "Edit",
    delete: "Delete",
    dragToReorder: "Drag to reorder",
    confirmDelete: "Are you sure you want to delete this portfolio item?",
    portfolioItemUpdated: "Portfolio item updated successfully!",
    newPortfolioItemCreated: "New portfolio item created successfully!",
    portfolioItemDeleted: "Portfolio item deleted successfully!",
    portfolioItemsReordered: "Portfolio items reordered successfully!",

    // Privacy Policy Page
    privacyPolicyTitle: "Privacy Policy",
    privacyPolicyLastUpdated: "Last updated: {date}",
    privacyPolicySection1Title: "1. Information We Collect",
    privacyPolicySection1Content: "We collect information that you provide directly to us, including when you:",
    privacyPolicySection1List: JSON.stringify([
      "Contact us through our website",
      "Subscribe to our newsletter",
      "Request a quote or service",
      "Apply for a job"
    ]),
    privacyPolicySection2Title: "2. How We Use Your Information",
    privacyPolicySection2Content: "We use the information we collect to:",
    privacyPolicySection2List: JSON.stringify([
      "Provide and maintain our services",
      "Respond to your inquiries and requests",
      "Send you marketing communications (with your consent)",
      "Improve our website and services"
    ]),
    privacyPolicySection3Title: "3. Data Security",
    privacyPolicySection3Content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
    privacyPolicySection4Title: "4. Your Rights",
    privacyPolicySection4Content: "You have the right to:",
    privacyPolicySection4List: JSON.stringify([
      "Access your personal data",
      "Correct inaccurate data",
      "Request deletion of your data",
      "Object to processing of your data",
      "Data portability"
    ]),
    privacyPolicySection5Title: "5. Contact Us",
    privacyPolicySection5Content: "If you have any questions about this Privacy Policy, please contact us at:",
    privacyPolicySection5Email: "Email: privacy@example.com",

    // Terms of Service Page
    termsOfServiceTitle: "Terms of Service",
    termsOfServiceLastUpdated: "Last updated: {date}",
    termsOfServiceSection1Title: "1. Acceptance of Terms",
    termsOfServiceSection1Content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
    termsOfServiceSection2Title: "2. Use License",
    termsOfServiceSection2Content: "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.",
    termsOfServiceSection3Title: "3. Disclaimer",
    termsOfServiceSection3Content: "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    termsOfServiceSection4Title: "4. Limitations",
    termsOfServiceSection4Content: "In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.",
    termsOfServiceSection5Title: "5. Revisions and Errata",
    termsOfServiceSection5Content: "The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current.",
    termsOfServiceSection6Title: "6. Links",
    termsOfServiceSection6Content: "We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.",
    termsOfServiceSection7Title: "7. Contact Information",
    termsOfServiceSection7Content: "If you have any questions about these Terms of Service, please contact us at:",
    termsOfServiceSection7Email: "Email: legal@example.com",

    // Cookie Policy Page
    cookiePolicyTitle: "Cookie Policy",
    cookiePolicyLastUpdated: "Last updated: {date}",
    cookiePolicySection1Title: "1. What Are Cookies",
    cookiePolicySection1Content: "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.",
    cookiePolicySection2Title: "2. How We Use Cookies",
    cookiePolicySection2Content: "We use cookies for the following purposes:",
    cookiePolicySection2List: JSON.stringify([
      "Essential cookies: Required for the website to function properly",
      "Analytics cookies: Help us understand how visitors interact with our website",
      "Preference cookies: Remember your settings and preferences",
      "Marketing cookies: Used to track visitors across websites"
    ]),
    cookiePolicySection3Title: "3. Types of Cookies We Use",
    cookiePolicySection3Content: "We use the following types of cookies:",
    cookiePolicySection3List: JSON.stringify([
      "Session cookies: Temporary cookies that expire when you close your browser",
      "Persistent cookies: Remain on your device for a set period of time",
      "First-party cookies: Set by our website",
      "Third-party cookies: Set by external services we use"
    ]),
    cookiePolicySection4Title: "4. Managing Cookies",
    cookiePolicySection4Content: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.",
    cookiePolicySection5Title: "5. Contact Us",
    cookiePolicySection5Content: "If you have any questions about our Cookie Policy, please contact us at:",
    cookiePolicySection5Email: "Email: privacy@example.com",

    // Contact Form
    pleaseEnterValidEmail: "Please enter a valid email address",
    uncommonEmailDomain: "This email domain is not in our list of common providers. Please make sure it's correct.",
    invalidEmail: "Invalid email address",
    somethingWentWrong: "Something went wrong",
    messageSentSuccessfully: "Message sent successfully!",
    failedToSendMessage: "Failed to send message",
    phone: "Phone",
  },

  bg: {
    // Common translations
    backToHome: "Обратно към началната страница",
    security: "Сигурност",
    socialLinks: "Социални връзки",
    preferences: "Предпочитания",
    cancel: "Отказ",
    saveChanges: "Запази промените",
    saving: "Запазване...",
    updating: "Актуализиране...",
    processing: "Обработка...",
    optional: "(По желание)",

    // Navigation
    home: "Начало",
    about: "За мен",
    services: "Услуги",
    projects: "Проекти",
    pricing: "Цени",
    testimonials: "Отзиви",
    blog: "Блог",
    eComerce: "E-commerce",
    branding: "Брандиране",
    caseStudies: "Кейсове",
    portfolio: "Портфолио",
    faq: "Често задавани въпроси",
    support: "Поддръжка",
    resources: "Ресурси",
    contact: "Контакти",
    login: "Вход",
    register: "Регистрация",
    logout: "Изход",
    profile: "Профил",
    signOut: "Изход",
    signOutConfirm: "Сигурен ли сте, че искате да излезете от профила си?",
    privacyPolicy: "Политика за поверителност",
    termsOfService: "Общи условия",
    cookiePolicy: "Политика за бисквитки",
    allRightsReserved: "Всички права запазени",
    menu: "Меню",

    // Hero
    welcome: "",
    welcomeToPortfolio: "Добре дошли в Бъдещето на вашия бизнес",
    heroDescription: "Създавам красиви, функционални уебсайтове, които помагат на бизнесите/стартъпите да растат и да се открояват в дигиталния пейзаж",
    iAmA: "Вашият",
    getInTouch: "Свържете се с мен",
    viewMyWork: "Вижте моята работа",

    // Rotating text options
    developer: "РАЗРАБОТЧИК",
    designer: "ДИЗАЙНЕР",
    creator: "СЪЗДАТЕЛ",
    innovator: "ИНОВАТОР",
    contactDescription: "Ако имате въпроси или искате да обсъдите проект, моля, не се колебайте да се свържете с мен. Ще бъда тук, за да помогна да постигнете вашите цели и да направите вашето онлайн присъствие блестящо.",
    contactInformation: "Информация за контакт",
    connectWithMe: "Свържете се с мен",
    name: "Име", namePlaceholder: "Въведете вашето име",
    email: "Имейл",
    emailPlaceholder: "Въведете вашия имейл",
    subject: "Тема",
    subjectPlaceholder: "Въведете темата",
    message: "Съобщение",
    messagePlaceholder: "Въведете вашето съобщение",
    sendMessage: "Изпрати съобщение",
    yourMessage: "Вашето съобщение",
    sending: "Изпращане...",
    sendMessageBtn: "Изпрати съобщение",

    // Login and Register
    loginTitle: "Вход в вашият акаунт",
    registerTitle: "Създайте акаунт",
    loginDescription: "Влезте във вашият акаунт за да продължите",
    registerDescription: "Създайте акаунт за да продължите",
    confirmPassword: "Потвърди паролата",
    passwordMustBeAtLeast8Characters: "Паролата трябва да бъде поне 8 символа",
    alreadyHaveAccount: "Вече имате акаунт?",
    creatingAccount: "Създавам акаунт...",
    createAccount: "Създай акаунт",
    fullNameRegister: "Име и фамилия",
    emailRegister: "Имейл",
    loginBtn: "Вход",
    registerBtn: "Регистрация",
    dontHaveAccount: "Нямате акаунт?",
    orContinueWith: "Или продължете с",
    signInWithGoogle: "Вход с Google",
    signInWithFacebook: "Вход с Facebook",
    signInWithGitHub: "Вход с GitHub",
    forgotPassword: "Забравена парола?",
    rememberMe: "Запомни ме",
    signingIn: "Вход...",
    signIn: "Вход",
    signUp: "Регистрация",
    password: "Парола",

    // Intro section
    introduction: "Въведение",
    whatIDo: "Какво правя и как мога да помогна",
    discoverTitle: "Разберете как мога да осъществя вашия онлайн бизнес/стартъп",
    speechEnabled: "Текстът към реч е активиран. Субтитрите ще бъдат изговаряни на глас.",

    //Language selector dropdown (video)
    languageSelector: "Изберете език",
    english: "Английски",
    bulgarian: "Български",
    subtitles: "Субтитри",
    audio: "Аудио",

    //Language selector dropdown (profile)
    selectLanguage: "Изберете език",
    englishProfile: "Английски",
    bulgarianProfile: "Български",

    // About section
    aboutMe: "За мен",
    passionateWebDeveloper: "Страстен уеб разработчик",
    aboutDescription1: "Здравейте! Аз съм страстен уеб разработчик с над 2 години опит в създаването на красиви, функционални уебсайтове и приложения. Специализирам се в съвременни уеб технологии и се фокусирам върху създаването на чисти, удобни за потребителя дизайни, които помагат на бизнесите да постигнат целите си.",
    aboutDescription2: "Моят подход съчетава техническата експертиза с креативното решаване на проблеми, за да изградя дигитални изживявания, които се открояват. Вярвам в непрекъснатото обучение и следенето на най-новите тенденции в индустрията, за да предоставям най-добрите решения за моите клиенти.",

    // Skills
    webDevelopment: "Уеб разработка",
    webDevelopmentDesc: "Експерт в съвременни рамки и принципи на отзивчив дизайн",
    uiUxDesign: "UI/UX дизайн",
    uiUxDesignDesc: "Създаване на интуитивни и ангажиращи потребителски изживявания",
    performance: "Производителност",
    performanceDesc: "Оптимизация за скорост, достъпност и търсачки",
    collaboration: "Сътрудничество",
    collaborationDesc: "Тясна работа с клиенти за постигане на техните цели",

    // Services section
    myServices: "Моите услуги",
    whatIOffer: "Какво предлагам",
    servicesDescription: "Предлагам набор от услуги, за да помогна на вашия бизнес да установи силно онлайн присъствие",
    seeAllServices: "Вижте всички услуги",
    seePricing: "Вижте цените",


    // Service items
    webDesign: "Уеб дизайн",
    webDesignPrice: "",
    webDesignDesc: "Персонализиран уеб дизайн, фокусиран върху потребителското изживяване и самоличността на марката.",
    webDesignFeatures: JSON.stringify([
      "Отзивчив дизайн за всички устройства",
      "Оптимизация на потребителското изживяване",
      "Интеграция на марката",
      "Скициране и прототипиране",
    ]),

    webDev: "Уеб разработка",
    webDevPrice: "",
    webDevDesc: "Пълноценна разработка на уебсайтове и уеб приложения.",
    webDevFeatures: JSON.stringify([
      "Персонализирано кодиране с модерни технологии",
      "Интеграция на система за управление на съдържанието",
      "Функционалност за електронна търговия",
      "Оптимизация на производителността",
    ]),

    seoOptimization: "SEO оптимизация",
    seoPrice: "",
    seoDesc: "Подобрете видимостта на вашия уебсайт в търсачките.",
    seoFeatures: JSON.stringify([
      "Изследване и анализ на ключови думи",
      "Оптимизация на страницата за SEO",
      "Технически SEO подобрения",
      "Месечни отчети за производителност",
    ]),

    maintenance: "Поддръжка",
    maintenancePrice: "",
    maintenanceDesc: "Поддържайте уебсайта си сигурен, актуализиран и работещ плавно.",
    maintenanceFeatures: JSON.stringify([
      "Редовни софтуерни актуализации",
      "Мониторинг на сигурността",
      "Оптимизация на производителността",
      "Актуализации на съдържанието и резервни копия",
    ]),

    // Target audience section
    whoIsThisSiteFor: "За кого е този сайт",
    tailoredSolutions: "Персонализирани решения за вашите нужди",
    audienceDescription: "Предоставям специализирани услуги за уеб разработка за различни типове клиенти, всеки със свои уникални изисквания",

    // Audience types
    startups: "Стартъпи",
    startupsDesc: "Стартирайте бизнеса си с професионално онлайн присъствие. Получете модерен, отзивчив уебсайт, който ви помага да установите достоверност и да привлечете инвеститори.",
    startupsBenefits: JSON.stringify([
      "Бързи срокове за изпълнение",
      "Мащабируеми решения, които растат с вас",
      "Дизайн, фокусиран върху конверсията",
      "Цени, подходящи за стартъпи"
    ]),
    onlineStores: "Онлайн магазини",
    onlineStoresDesc: "Трансформирайте вашия търговски бизнес с мощна платформа за електронна търговия. Представете вашите продукти красиво и осигурете плавно пазарско изживяване.",
    onlineStoresBenefits: JSON.stringify([
      "Интуитивно управление на продуктите",
      "Сигурна обработка на плащанията",
      "Мобилно оптимизирано пазарско изживяване",
      "Управление на инвентара и поръчките"
    ]),
    personalBrands: "Лични марки",
    personalBrandsDesc: "Откроете се от тълпата с отличителен уебсайт за лична марка. Представете портфолиото си, уменията и услугите си, за да привлечете клиенти и възможности.",
    personalBrandsBenefits: JSON.stringify([
      "Уникален дизайн, базиран на личността",
      "Портфолио и витрина за отзиви",
      "Стратегия за лична марка",
      "Управление на съдържанието за блогове"
    ]),
    whatYouGet: "Какво получавате:",
    learnMore: "Научете повече за",
    solutions: "решения",

    // Projects section
    myWork: "Моята работа",
    recentProjects: "Скорошни проекти",
    projectsDescription: "Разгледайте някои от моите скорошни проекти и проблемите, които съм решил",
    livePreview: "Преглед",
    sourceCode: "Изходен код",
    descriptionProjects1: "Изчистен и модерен уебсайт, изграден по поръчка за наш клиент – с удобна система за онлайн записвания, която спестява време и елиминира нуждата от посещение на място.",
    descriptionProjects2: "Recircle е уеб приложение за обмен на предмети (дрехи, оборудване, книги и други), което е мой личен проект, изграден изцяло от нулата. Основната му цел е да подкрепя устойчивостта и да насърчава принципите на нулев отпадък.",
    descriptionProjects3: "Rosario е уеб приложение за ресторанти с модерен и адаптивен дизайн. Позволява лесно разглеждане на менюто, бърза и интуитивна навигация, както и опция за онлайн резервация на вечери.",
    descriptionProjects4: "Това портфолио е създадено с мисъл за клиента – модерно, интуитивно и адаптивно. Проектите се зареждат директно от GitHub, а вградената форма за контакт улеснява връзката с мен.",

    // Project items
    ecommerce: "Уебсайт за електронна търговия",
    ecommerceDesc: "Пълноценна платформа за електронна търговия с каталог на продукти, пазарска количка и сигурно плащане.",
    corporateRebrand: "Корпоративен ребрандинг",
    corporateDesc: "Пълно преработване на уебсайта за финансова компания, фокусирано върху модерна естетика и подобрено потребителско изживяване.",
    mobileApp: "Мобилно приложение",
    mobileAppDesc: "Крос-платформено мобилно приложение за здравен стартъп с функции за проследяване на потребителите.",
    portfolioWebsite: "Портфолио уебсайт",
    portfolioDesc: "Персонализиран уебсайт-портфолио за професионален фотограф с галерия и функционалност за резервации.",

    // Pricing section
    pricingPlans: "Ценови планове",
    chooseYourPlan: "Изберете вашия план",
    pricingDescription: "Прозрачни цени без скрити такси. Изберете перфектния план за вашите нужди",
    pricingHeader: "Ценови планове",
    pricingSubHeader: "Изберете вашия план",
    planBasicName: "Базов",
    planBasicDesc: "Перфектен за малки бизнеси, които тепърва започват",
    planBasicCTA: "Изберете Базов",
    planStandardName: "Стандартен",
    planStandardDesc: "Идеален за развиващи се бизнеси със специфични нужди",
    planStandardCTA: "Изберете Стандартен",
    planPremiumName: "Премиум",
    planPremiumDesc: "Цялостно решение за установени бизнеси",
    planPremiumCTA: "Изберете Премиум",
    pricingMostPopular: "Най-популярен",
    PlanPriceBasic: "520 лв.",
    PlanPriceStandard: "1200 лв.",
    PlanPricePremium: "2300 лв.",
    pricingFeatureBasic1: "5-страничен отзивчив уебсайт",
    pricingFeatureBasic2: "Базова SEO настройка",
    pricingFeatureBasic3: "Контактна форма",
    pricingFeatureBasic4: "Мобилно-дружелюбен дизайн",
    pricingFeatureBasic5: "1 месец поддръжка",
    pricingFeatureStandard1: "10-страничен отзивчив уебсайт",
    pricingFeatureStandard2: "Разширена SEO оптимизация",
    pricingFeatureStandard3: "Система за управление на съдържанието",
    pricingFeatureStandard4: "Интеграция на блог",
    pricingFeatureStandard5: "Интеграция с социални мрежи",
    pricingFeatureStandard6: "Функционалност за електронна търговия (до 20 продукта)",
    pricingFeatureStandard7: "3 месеца поддръжка",
    pricingFeaturePremium1: "Неограничен брой страници",
    pricingFeaturePremium2: "Персонализиран дизайн и функционалност",
    pricingFeaturePremium3: "Разширена SEO стратегия",
    pricingFeaturePremium4: "Пълно решение за електронна търговия",
    pricingFeaturePremium5: "Персонализирани интеграции",
    pricingFeaturePremium6: "Оптимизация на производителността",
    pricingFeaturePremium7: "Функции за сигурност",
    pricingFeaturePremium8: "6 месеца приоритетна поддръжка",
    pricingFeaturePremium9: "Месечни отчети за производителност",

    // Testimonials section
    clientFeedback: "Отзиви от клиенти",
    testimonialsDescription: "Не вярвайте само на думите ми - чуйте какво казват моите клиенти",
    testimonialSarah: "Сара Джонсън",
    testimonialSarahPosition: "Главен изпълнителен директор, TechStart Inc.",
    testimonialSarahContent: "Работата с този екип беше абсолютно удоволствие. Те взеха нашия остарял уебсайт и го трансформираха в модерна, удобна за потребителя платформа, която перфектно представлява нашата марка. Вниманието към детайла и ангажиментът към качеството надминаха очакванията ни.",
    testimonialMichael: "Майкъл Чен",
    testimonialMichaelPosition: "Директор по маркетинг, GrowthBox",
    testimonialMichaelContent: "Нашите продажби в електронната търговия се увеличиха с 45% в рамките на три месеца след стартирането на новия ни уебсайт. Интуитивният дизайн и плавният процес на плащане значително подобриха нашите нива на конверсия. Горещо препоръчвам техните услуги на всеки бизнес, който иска да расте онлайн.",
    testimonialEmma: "Ема Родригес",
    testimonialEmmaPosition: "Основател, Artisan Crafts",
    testimonialEmmaContent: "Като собственик на малък бизнес, имах нужда от уебсайт, който да представя продуктите ми без да разорявам банката. Те доставиха красив, функционален сайт, който отговаря на бюджета ми и ми помогна да достигна до нови клиенти. Постоянната поддръжка беше безценна.",
    testimonialDavid: "Дейвид Томпсън",
    testimonialDavidPosition: "Главен технически директор, InnovateTech",
    testimonialDavidContent: "Техническата експертиза, демонстрирана през целия проект, беше впечатляваща. Те имплементираха сложни функции с лекота и осигуриха, че нашият уебсайт е бърз, сигурен и мащабируем. Способността им да превеждат техническите изисквания в практически решения направи всичката разлика.",
    testimonialRating: "Рейтинг",

    // Blog section
    latestInsights: "Последни прозрения",
    blogDescription: "Прозрения, съвети и ресурси, които ще ви помогнат да успеете в дигиталния свят",
    fromOurBlog: "От нашият блог",
    blogPost1Category: "Уеб дизайн",
    blogPost1Title: "Важността на потребителския опит в уеб дизайна",
    blogPost1Content: "Потребителският опит (UX) е важен аспект на уеб дизайна, който се фокусира на създаване на интуитивни, заинтересовани и безпроблемни взаимодействия за потребителите. В тази публикация ще разгледаме важността на UX в уеб дизайна и как може да повлияе на вашият бизнес.",
    blogPost1Link: "Прочети повече",
    blogPost2Title: "Как да увеличите процента на конверсия на уебсайта си: Най-добрите стратегии от дигитални експерти",
    blogPost2Excerpt: "Открийте най-новите стратегии и техники за повишаване на конверсионните проценти на вашия уебсайт и превръщане на посетителите в клиенти.",
    blogPost2Category: "Дигитален маркетинг",
    blogPost3Title: "Пълно ръководство по SEO за уеб разработчици",
    blogPost3Excerpt: "Цялостно ръководство за прилагане на най-добрите SEO практики във вашите уеб разработки.",
    blogPost3Category: "SEO",

    // Profile Form
    profileInformation: "Информация за профила",
    updatePersonalInfo: "Актуализирайте личната си информация и как другите ви виждат в платформата",
    profilePicture: "Профилна снимка",
    uploadProfilePicture: "Качете профилна снимка",
    imageRequirements: "JPG, GIF или PNG. Максимален размер 5MB.",
    fullName: "Пълно име",
    emailAddress: "Имейл адрес",
    phoneNumber: "Телефонен номер",
    location: "Местоположение",
    cityCountry: "Град, Държава",
    bio: "Биография",
    tellUsAboutYourself: "Разкажете ни малко за себе си",
    profileUpdated: "Профилът е актуализиран успешно!",
    failedToUpdateProfile: "Неуспешно актуализиране на профила. Моля, опитайте отново.",
    nameRequired: "Името е задължително",
    emailRequired: "Имейлът е задължителен",
    emailInvalid: "Невалиден имейл",
    imageUploadError: "Неуспешно качване на изображението. Моля, опитайте отново.",
    imageTypeError: "Моля, качете файл с изображение",
    imageSizeError: "Размерът на изображението трябва да бъде по-малък от 5MB",

    // Security Form
    securitySettings: "Настройки за сигурност",
    updatePassword: "Актуализирайте паролата си и управлявайте сигурността на акаунта",
    currentPassword: "Текуща парола",
    newPassword: "Нова парола",
    confirmNewPassword: "Потвърди новата парола",
    passwordRequirements: "Паролата трябва да бъде поне 8 символа и да включва главни и малки букви, и числа",
    passwordUpdated: "Паролата е променена успешно!",
    failedToUpdatePassword: "Неуспешно актуализиране на паролата. Моля, опитайте отново.",
    currentPasswordRequired: "Текущата парола е задължителна",
    newPasswordRequired: "Новата парола е задължителна",
    passwordTooShort: "Паролата трябва да бъде поне 8 символа",
    passwordComplexity: "Паролата трябва да съдържа поне една главна буква, една малка буква и едно число",
    passwordsDoNotMatch: "Паролите не съвпадат",
    currentPasswordIncorrect: "Текущата парола е неправилна",
    securityRecommendations: "Препоръки за сигурност",
    keepAccountSecure: "Запазете акаунта си сигурен",
    securityTips: JSON.stringify([
      "Използвайте силна, уникална парола, която не използвате на други места",
      "Активирайте двуфакторното удостоверяване за допълнителна сигурност",
      "Редовно проверявайте акаунта си за подозрителна дейност",
      "Никога не споделяйте паролата си с никого",
      "Използвайте мениджър на пароли за генериране и съхранение на сигурни пароли"
    ]),

    // Social Links Form
    socialMediaProfiles: "Профили в социални мрежи",
    connectSocialAccounts: "Свържете профилите си в социалните мрежи с профила си",
    socialMediaLinks: "Връзки към социални мрежи",
    invalidTwitterUsername: "Невалидно потребителско име в Twitter",
    invalidLinkedinUsername: "Невалидно потребителско име в LinkedIn",
    invalidGithubUsername: "Невалидно потребителско име в GitHub",
    invalidInstagramUsername: "Невалидно потребителско име в Instagram",
    socialLinksUpdated: "Социалните връзки са актуализирани успешно!",
    failedToUpdateSocialLinks: "Неуспешно актуализиране на социалните връзки. Моля, опитайте отново.",

    // Preferences Form
    accountPreferences: "Предпочитания на акаунта",
    customizeSettings: "Персонализирайте настройките и предпочитанията за известия",
    notificationSettings: "Настройки за известия",
    emailNotifications: "Имейл известия",
    receiveAccountNotifications: "Получавайте известия за активността във вашия акаунт",
    marketingEmails: "Маркетингови имейли",
    receiveFeatureUpdates: "Получавайте имейли за нови функции и оферти",
    projectUpdates: "Актуализации за проекти",
    receiveProjectStatus: "Получавайте актуализации за статуса на проекта",
    appearance: "Външен вид",
    theme: "Тема",
    chooseTheme: "Изберете предпочитаната си тема",
    lightMode: "Светла тема",
    darkMode: "Тъмна тема",
    savePreferences: "Запази предпочитанията",
    preferencesUpdated: "Предпочитанията са актуализирани успешно!",
    failedToUpdatePreferences: "Неуспешно актуализиране на предпочитанията. Моля, опитайте отново.",

    // Portfolio Modal
    addNewPortfolioItem: "Добави нов проект в портфолиото",
    editPortfolioItem: "Редактирай проект в портфолиото",
    projectTitle: "Заглавие на проекта",
    description: "Описание",
    describeProject: "Опишете проекта си...",
    category: "Категория",
    completionDate: "Дата на завършване",
    projectUrl: "URL на проекта",
    githubUrl: "GitHub URL",
    tags: "Етикети",
    addTechnologies: "Добавете използваните технологии (напр. React, Node.js)",
    projectImage: "Изображение на проекта",
    recommendedSize: "Препоръчителен размер: 800x600px",
    uploadImage: "Качи изображение",
    featureProject: "Изтъкни този проект (подчертан в портфолиото)",
    createProject: "Създай проект",
    titleRequired: "Заглавието е задължително",
    descriptionRequired: "Описанието е задължително",
    categoryRequired: "Категорията е задължителна",
    invalidUrl: "Моля, въведете валиден URL, започващ с http:// или https://",
    tagExists: "Този етикет вече съществува",

    // Portfolio Manager
    portfolioManagement: "Управление на портфолиото",
    showcaseWork: "Представете работата си, като добавяте и управлявате проекти в портфолиото",
    addNewProject: "Добави нов проект",
    noPortfolioItems: "Все още нямате добавени проекти в портфолиото.",
    addFirstProject: "Добави първия си проект",
    featured: "Изтъкнат",
    added: "Добавен:",
    viewProject: "Преглед на проекта",
    edit: "Редактирай",
    delete: "Изтрий",
    dragToReorder: "Плъзни за пренареждане",
    confirmDelete: "Сигурни ли сте, че искате да изтриете този проект от портфолиото?",
    portfolioItemUpdated: "Проектът в портфолиото е актуализиран успешно!",
    newPortfolioItemCreated: "Нов проект в портфолиото е създаден успешно!",
    portfolioItemDeleted: "Проектът в портфолиото е изтрит успешно!",
    portfolioItemsReordered: "Проектите в портфолиото са пренаредени успешно!",

    // Privacy Policy Page
    privacyPolicyTitle: "Политика за поверителност",
    privacyPolicyLastUpdated: "Последна актуализация: {date}",
    privacyPolicySection1Title: "1. Каква информация събираме",
    privacyPolicySection1Content: "Събираме информация, която предоставяте директно на нас, включително когато:",
    privacyPolicySection1List: JSON.stringify([
      "Свържете се с нас чрез нашия уебсайт",
      "Абонирате се за нашия бюлетин",
      "Заявите оферта или услуга",
      "Кандидатствате за работа"
    ]),
    privacyPolicySection2Title: "2. Как използваме вашата информация",
    privacyPolicySection2Content: "We use the information we collect to:",
    privacyPolicySection2List: JSON.stringify([
      "Provide and maintain our services",
      "Respond to your inquiries and requests",
      "Send you marketing communications (with your consent)",
      "Improve our website and services"
    ]),
    privacyPolicySection3Title: "3. Сигурност на данните",
    privacyPolicySection3Content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
    privacyPolicySection4Title: "4. Вашите права",
    privacyPolicySection4Content: "You have the right to:",
    privacyPolicySection4List: JSON.stringify([
      "Access your personal data",
      "Correct inaccurate data",
      "Request deletion of your data",
      "Object to processing of your data",
      "Data portability"
    ]),
    privacyPolicySection5Title: "5. Свържете се с нас",
    privacyPolicySection5Content: "If you have any questions about this Privacy Policy, please contact us at:",
    privacyPolicySection5Email: "Email: privacy@example.com",

    // Terms of Service Page
    termsOfServiceTitle: "Общи условия",
    termsOfServiceLastUpdated: "Последна актуализация: {date}",
    termsOfServiceSection1Title: "1. Приемане на условията",
    termsOfServiceSection1Content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
    termsOfServiceSection2Title: "2. Лиценз за ползване",
    termsOfServiceSection2Content: "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.",
    termsOfServiceSection3Title: "3. Отказ от отговорност",
    termsOfServiceSection3Content: "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    termsOfServiceSection4Title: "4. Ограничения",
    termsOfServiceSection4Content: "In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.",
    termsOfServiceSection5Title: "5. Ревизии и грешки",
    termsOfServiceSection5Content: "The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current.",
    termsOfServiceSection6Title: "6. Връзки",
    termsOfServiceSection6Content: "We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.",
    termsOfServiceSection7Title: "7. Контактна информация",
    termsOfServiceSection7Content: "If you have any questions about these Terms of Service, please contact us at:",
    termsOfServiceSection7Email: "Email: legal@example.com",

    // Cookie Policy Page
    cookiePolicyTitle: "Политика за бисквитки",
    cookiePolicyLastUpdated: "Последна актуализация: {date}",
    cookiePolicySection1Title: "1. Какво представляват бисквитките",
    cookiePolicySection1Content: "Бисквитките са малки текстови файлове, които се съхраняват на вашия компютър или мобилно устройство, когато посещавате уебсайт. Те се използват широко, за да направят уебсайтовете по-ефективни и да осигурят по-добро потребителско изживяване.",
    cookiePolicySection2Title: "2. Как използваме бисквитките",
    cookiePolicySection2Content: "Използваме бисквитки за следните цели:",
    cookiePolicySection2List: JSON.stringify([
      "Задължителни бисквитки: Необходими за правилното функциониране на уебсайта",
      "Аналитични бисквитки: Помагат ни да разберем как посетителите взаимодействат с нашия уебсайт",
      "Бисквитки за предпочитания: Запомнят вашите настройки и предпочитания",
      "Маркетингови бисквитки: Използват се за проследяване на посетителите в различни уебсайтове"
    ]),
    cookiePolicySection3Title: "3. Видове бисквитки, които използваме",
    cookiePolicySection3Content: "Използваме следните видове бисквитки:",
    cookiePolicySection3List: JSON.stringify([
      "Сесийни бисквитки: Временни бисквитки, които изтичат при затваряне на браузъра",
      "Постоянни бисквитки: Остават на вашето устройство за определен период от време",
      "Бисквитки от първа страна: Задават се от нашия уебсайт",
      "Бисквитки от трети страни: Задават се от външни услуги, които използваме"
    ]),
    cookiePolicySection4Title: "4. Управление на бисквитките",
    cookiePolicySection4Content: "Можете да контролирате и/или изтривате бисквитки, както желаете. Можете да изтриете всички бисквитки, които вече са на вашия компютър, и можете да настроите повечето браузъри да ги блокират.",
    cookiePolicySection5Title: "5. Свържете се с нас",
    cookiePolicySection5Content: "Ако имате въпроси относно нашата Политика за бисквитки, моля свържете се с нас на:",
    cookiePolicySection5Email: "Имейл: privacy@example.com",

    // Contact Form
    pleaseEnterValidEmail: "Моля въведете валиден имейл адрес",
    uncommonEmailDomain: "Това домейн не е в нашия списък на общи домейни. Моля, уверете се, че е валиден.",
    invalidEmail: "Невалиден имейл адрес",
    somethingWentWrong: "Нещо се обърка",
    messageSentSuccessfully: "Съобщението е изпратено успешно!",
    failedToSendMessage: "Неуспешно изпращане на съобщение",
    phone: "Телефон",
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

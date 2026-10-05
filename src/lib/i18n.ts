import type { Language } from '@/stores/use-language'

type StringMap = Record<string, { bn: string; en: string }>

export const strings: StringMap = {
  // Brand
  brandName: { bn: 'বাংলাদেশ ডিজিটাল জাতীয় পোর্টাল', en: 'Bangladesh Digital National Portal' },
  brandTagline: { bn: 'নেক্সট জেনারেশন', en: 'Next Generation' },

  // Header
  search: { bn: 'অনুসন্ধান', en: 'Search' },
  services: { bn: 'সেবা', en: 'Services' },
  organizations: { bn: 'দপ্তর', en: 'Organizations' },
  ministries: { bn: 'মন্ত্রণালয়', en: 'Ministries' },
  bangladesh: { bn: 'বাংলাদেশ', en: 'Bangladesh' },
  information: { bn: 'তথ্য', en: 'Information' },
  notices: { bn: 'বিজ্ঞপ্তি', en: 'Notices' },
  jobs: { bn: 'চাকরি', en: 'Jobs' },
  forms: { bn: 'ফরম', en: 'Forms' },
  emergency: { bn: 'জরুরি সেবা', en: 'Emergency' },
  assistant: { bn: 'সেবা সহকারী', en: 'Gov Assistant' },
  laws: { bn: 'আইন ও বিধি', en: 'Laws & Regulations' },
  about: { bn: 'পোর্টাল সম্পর্কে', en: 'About' },
  favorites: { bn: 'আমার সংরক্ষিত', en: 'My Favorites' },
  more: { bn: 'আরও', en: 'More' },

  // Hero
  heroTitle: {
    bn: 'বাংলাদেশের সকল সরকারি তথ্য ও সেবা — এক জায়গায়',
    en: 'Government Information & Services — All in One Place',
  },
  heroSubtitle: {
    bn: 'সরকারি সেবা, তথ্য, দপ্তর, আইন, ফরম ও গুরুত্বপূর্ণ সরকারি লিংক খুঁজুন সহজে।',
    en: 'Easily find government services, information, departments, laws, forms and important links.',
  },
  searchPlaceholder: {
    bn: 'আপনি কী খুঁজছেন? যেমন: পাসপোর্ট, জন্ম নিবন্ধন, ভূমি সেবা, চাকরি, ট্যাক্স…',
    en: 'What are you looking for? e.g. passport, birth registration, land services, jobs, tax…',
  },
  searchCta: { bn: 'অনুসন্ধান করুন', en: 'Search' },
  askAssistant: { bn: 'সেবা সহকারীকে জিজ্ঞাসা করুন', en: 'Ask Gov Assistant' },

  // Home sections
  popularServices: { bn: 'জনপ্রিয় সরকারি সেবা', en: 'Popular Government Services' },
  popularServicesSub: { bn: 'নাগরিকদের সবচেয়ে ব্যবহৃত সেবা', en: 'Most used services by citizens' },
  viewAll: { bn: 'সব দেখুন', en: 'View all' },
  serviceCategories: { bn: 'সেবা ক্যাটাগরি', en: 'Service Categories' },
  serviceCategoriesSub: { bn: 'আপনার প্রয়োজনীয় সেবা খুঁজুন', en: 'Find the service you need' },
  govDirectory: { bn: 'সরকারি দপ্তর', en: 'Government Organizations' },
  govDirectorySub: { bn: 'মন্ত্রণালয়, অধিদপ্তর ও কর্তৃপক্ষ', en: 'Ministries, directorates and authorities' },
  exploreBangladesh: { bn: 'বাংলাদেশ আবিষ্কার করুন', en: 'Explore Bangladesh' },
  exploreBangladeshSub: {
    bn: 'বিভাগ, জেলা, উপজেলা ও ইউনিয়ন',
    en: 'Divisions, districts, upazilas and unions',
  },
  latestNotices: { bn: 'সর্বশেষ বিজ্ঞপ্তি', en: 'Latest Notices' },
  latestNoticesSub: { bn: 'সরকারি খবর ও ঘোষণা', en: 'Government news and announcements' },
  latestJobs: { bn: 'সরকারি চাকরি', en: 'Government Jobs' },
  latestJobsSub: { bn: 'নতুন নিয়োগ বিজ্ঞপ্তি', en: 'Latest recruitment notices' },
  emergencyServices: { bn: 'জরুরি হেল্পলাইন', en: 'Emergency Helplines' },
  emergencySub: {
    bn: 'জরুরি প্রয়োজনে যোগাযোগের নম্বর',
    en: 'Emergency contact numbers',
  },
  digitalStats: { bn: 'ডিজিটাল বাংলাদেশ পরিসংখ্যান', en: 'Digital Bangladesh Statistics' },
  digitalStatsSub: {
    bn: 'সরকারি তথ্য ভাণ্ডারের পরিসংখ্যান',
    en: 'Government information repository statistics',
  },

  // Service categories
  catPassportImmigration: { bn: 'পাসপোর্ট ও ইমিগ্রেশন', en: 'Passport & Immigration' },
  catCitizenServices: { bn: 'নাগরিক সেবা', en: 'Citizen Services' },
  catLand: { bn: 'ভূমি', en: 'Land' },
  catTransport: { bn: 'যানবাহন', en: 'Transport' },
  catTax: { bn: 'কর', en: 'Tax' },
  catBusiness: { bn: 'ব্যবসা ও বাণিজ্য', en: 'Business & Commerce' },
  catUtility: { bn: 'ইউটিলিটি বিল', en: 'Utility Bills' },
  catEducation: { bn: 'শিক্ষা', en: 'Education' },
  catHealth: { bn: 'স্বাস্থ্য', en: 'Health' },
  catAgriculture: { bn: 'কৃষি', en: 'Agriculture' },
  catSocialWelfare: { bn: 'সামাজিক কল্যাণ', en: 'Social Welfare' },
  catEmployment: { bn: 'নিয়োগ', en: 'Employment' },
  catInformation: { bn: 'তথ্যভাণ্ডার', en: 'Information' },
  catEmergency: { bn: 'জরুরি সেবা', en: 'Emergency' },

  // Service detail
  whatIsThis: { bn: 'এই সেবাটি কী', en: 'What is this service?' },
  whoCanUse: { bn: 'কারা ব্যবহার করতে পারবেন', en: 'Who can use it?' },
  howToApply: { bn: 'কীভাবে আবেদন করবেন', en: 'How to apply' },
  requiredDocuments: { bn: 'আবশ্যকীয় দলিল', en: 'Required Documents' },
  fees: { bn: 'ফি', en: 'Fees' },
  processingTime: { bn: 'প্রক্রিয়াকরণের সময়', en: 'Processing Time' },
  eligibility: { bn: 'যোগ্যতা', en: 'Eligibility' },
  openOfficialService: { bn: 'অফিসিয়াল সেবায় যান', en: 'Open Official Service' },
  externalLinkNotice: {
    bn: 'আপনি এখন একটি বাহ্যিক সরকারি ওয়েবসাইটে যাচ্ছেন।',
    en: 'You are now visiting an external government website.',
  },
  relatedServices: { bn: 'সম্পর্কিত সেবা', en: 'Related Services' },
  sourceInfo: { bn: 'তথ্যের উৎস', en: 'Source Information' },
  officialSource: { bn: 'অফিসিয়াল সরকারি পোর্টাল', en: 'Official Government Portal' },
  lastVerified: { bn: 'সর্বশেষ যাচাই', en: 'Last verified' },
  originalSource: { bn: 'মূল উৎস', en: 'Original source' },
  officialBadge: { bn: 'অফিসিয়াল উৎস', en: 'Official Source' },
  verifiedBadge: { bn: 'যাচাইকৃত', en: 'Verified' },
  onlineBadge: { bn: 'অনলাইন আবেদন', en: 'Online Application' },
  mobileBadge: { bn: 'মোবাইল সেবা', en: 'Mobile Service' },

  // Search
  searchResults: { bn: 'অনুসন্ধাল ফলাফল', en: 'Search Results' },
  noResults: { bn: 'কোন ফলাফল পাওয়া যায়নি', en: 'No results found' },
  noResultsDesc: {
    bn: 'আপনার অনুসন্ধানের সাথে মিল রেখে কোন তথ্য পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।',
    en: 'No information matched your search. Try different keywords.',
  },
  searchSuggestions: { bn: 'আপনি কি এটি খুঁজছেন?', en: 'Did you mean?' },
  recentSearches: { bn: 'সাম্প্রতিক অনুসন্ধান', en: 'Recent searches' },
  trendingSearches: { bn: 'জনপ্রিয় অনুসন্ধান', en: 'Trending searches' },
  clearAll: { bn: 'সব মুছুন', en: 'Clear all' },

  // Tabs
  tabAll: { bn: 'সব', en: 'All' },
  tabServices: { bn: 'সেবা', en: 'Services' },
  tabOrganizations: { bn: 'দপ্তর', en: 'Organizations' },
  tabMinistries: { bn: 'মন্ত্রণালয়', en: 'Ministries' },
  tabDistricts: { bn: 'জেলা', en: 'Districts' },
  tabForms: { bn: 'ফরম', en: 'Forms' },
  tabNotices: { bn: 'বিজ্ঞপ্তি', en: 'Notices' },
  tabJobs: { bn: 'চাকরি', en: 'Jobs' },
  tabLinks: { bn: 'ওয়েবসাইট', en: 'Websites' },

  // Stats
  statMinistries: { bn: 'মন্ত্রণালয়', en: 'Ministries' },
  statOrganizations: { bn: 'সরকারি দপ্তর', en: 'Organizations' },
  statDivisions: { bn: 'বিভাগ', en: 'Divisions' },
  statDistricts: { bn: 'জেলা', en: 'Districts' },
  statUpazilas: { bn: 'উপজেলা', en: 'Upazilas' },
  statServices: { bn: 'সরকারি সেবা', en: 'Government Services' },
  statForms: { bn: 'ফরম', en: 'Forms' },
  statEmergencyNumbers: { bn: 'জরুরি নম্বর', en: 'Emergency Numbers' },

  // AI Assistant
  assistantTitle: { bn: 'সেবা সহকারী', en: 'Gov Assistant' },
  assistantSubtitle: {
    bn: 'সরকারি তথ্যের ভিত্তিতে আপনাকে সাহায্য করতে প্রস্তুত',
    en: 'Ready to help you with verified government information',
  },
  assistantPlaceholder: {
    bn: 'যেমন: আমি পাসপোর্ট করতে চাই',
    en: 'e.g. I want to apply for a passport',
  },
  assistantDisclaimer: {
    bn: 'এই সহকারী কেবলমাত্র যাচাইকৃত সরকারি তথ্য থেকে উত্তর দেয়। সরকারি সেবা সংক্রান্ত প্রশ্নে কৃত্রিম তথ্য দেওয়া হয় না।',
    en: 'This assistant answers only from verified government data. No synthetic information is provided for government service queries.',
  },
  assistantSuggestions: { bn: 'পরামর্শিত প্রশ্ন', en: 'Suggested questions' },
  assistantSource: { bn: 'তথ্যের উৎস', en: 'Source' },
  assistantTry: { bn: 'এটি চেষ্টা করুন', en: 'Try this' },

  // Empty / states
  noData: { bn: 'তথ্য পাওয়া যায়নি', en: 'No data available' },
  loading: { bn: 'লোড হচ্ছে…', en: 'Loading…' },
  error: { bn: 'ত্রুটি ঘটেছে', en: 'Something went wrong' },
  retry: { bn: 'পুনরায় চেষ্টা করুন', en: 'Try again' },

  // Footer
  footerAbout: { bn: 'পোর্টাল সম্পর্কে', en: 'About' },
  footerQuickLinks: { bn: 'দ্রুত লিংক', en: 'Quick Links' },
  footerResources: { bn: 'রিসোর্স', en: 'Resources' },
  footerLegal: { bn: 'আইনি', en: 'Legal' },
  footerPoweredBy: {
    bn: 'বাংলাদেশ ডিজিটাল জাতীয় পোর্টাল দ্বারা চালিত',
    en: 'Powered by Bangladesh Digital National Portal',
  },
  footerDisclaimer: {
    bn: 'এই পোর্টাল একটি স্বাধীন ডিজিটাল সরকারি পোর্টাল কনসেপ্ট। সরকারি তথ্যের জন্য অফিসিয়াল সরকারি ওয়েবসাইট দেখুন।',
    en: 'This portal is an independent digital government portal concept. For official information, please visit the official government website.',
  },
  footerContact: { bn: 'যোগাযোগ', en: 'Contact' },
  footerAccessibility: { bn: 'অ্যাক্সেসিবিলিটি', en: 'Accessibility' },
  footerPrivacy: { bn: 'গোপনীয়তা নীতি', en: 'Privacy Policy' },
  footerTerms: { bn: 'শর্তাবলী', en: 'Terms of Use' },
  footerSitemap: { bn: 'সাইটম্যাপ', en: 'Sitemap' },

  // Mobile nav
  navHome: { bn: 'হোম', en: 'Home' },
  navServices: { bn: 'সেবা', en: 'Services' },
  navSearch: { bn: 'খুঁজুন', en: 'Search' },
  navDirectory: { bn: 'দপ্তর', en: 'Directory' },

  // Common
  cancel: { bn: 'বাতিল', en: 'Cancel' },
  confirm: { bn: 'নিশ্চিত করুন', en: 'Confirm' },
  close: { bn: 'বন্ধ', en: 'Close' },
  call: { bn: 'কল করুন', en: 'Call' },
  visitWebsite: { bn: 'ওয়েবসাইট দেখুন', en: 'Visit website' },
  save: { bn: 'সংরক্ষণ', en: 'Save' },
  saved: { bn: 'সংরক্ষিত', en: 'Saved' },
  back: { bn: 'পেছনে', en: 'Back' },
  home: { bn: 'হোম', en: 'Home' },
  breadcrumb: { bn: 'ব্রেডক্রাম্ব', en: 'Breadcrumb' },
  filter: { bn: 'ফিল্টার', en: 'Filter' },
  sort: { bn: 'সাজান', en: 'Sort' },
  byRelevance: { bn: 'প্রাসঙ্গিকতা', en: 'Relevance' },
  byDate: { bn: 'তারিখ', en: 'Date' },
  byAlphabetical: { bn: 'বর্ণানুক্রমিক', en: 'Alphabetical' },
  byPopularity: { bn: 'জনপ্রিয়তা', en: 'Popularity' },
  results: { bn: 'ফলাফল', en: 'results' },
  of: { bn: 'এর মধ্যে', en: 'of' },
  showing: { bn: 'প্রদর্শিত হচ্ছে', en: 'Showing' },
  publishedOn: { bn: 'প্রকাশিত', en: 'Published' },
  deadline: { bn: 'শেষ তারিখ', en: 'Deadline' },
  daysLeft: { bn: 'দিন বাকি', en: 'days left' },
  applyNow: { bn: 'আবেদন করুন', en: 'Apply now' },
  download: { bn: 'ডাউনলোড', en: 'Download' },
  readMore: { bn: 'আরও পড়ুন', en: 'Read more' },
  viewDetails: { bn: 'বিস্তারিত দেখুন', en: 'View details' },
  days: { bn: 'দিন', en: 'days' },
  hours: { bn: 'ঘন্টা', en: 'hours' },
  available247: { bn: '২৪/৭ সেবা', en: '24/7 service' },
  not247: { bn: 'নির্দিষ্ট সময়', en: 'Limited hours' },
}

export function tr(key: keyof typeof strings, lang: Language): string {
  const entry = strings[key]
  if (!entry) return key
  return entry[lang]
}

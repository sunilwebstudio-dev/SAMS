import i18n from "i18next";
import { initReactI18next } from "react-i18next";


//ENGLISH//

const resources = {
  en: {
    translation: {
      language: "English",
      home: "Home",
      agreements: "Agreements",
      howItWorks: "How It Works",
      about: "About",
      security: "Security",
      contact: "Contact",
      installApp: "Install App",
      login: "Login",

      heroBadge: "SECURE DIGITAL AGREEMENT PLATFORM",
      heroEyebrow: "SMART • SECURE • PROFESSIONAL",
      heroTitle: "Agreements Made",
      heroHighlight: "Simple & Secure.",
      heroDescription:
        "Create, manage and securely maintain your Supari and Money Agreements from one premium digital platform.",
      exploreAgreements: "Explore Agreements",
      loginSams: "Login to SAMS",

      agreementServices: "AGREEMENT SERVICES",
chooseYour: "Choose Your",
agreementWord: "Agreement",
agreementSectionDescription:
  "Create professional agreements, maintain secure digital records and access them whenever you need.",

samsAgreement: "SAMS AGREEMENT",

supariAgreement: "Supari Agreement",
supariDescription:
  "Create and securely maintain Supari purchase agreements with seller, buyer, witness and transaction information.",

buyerSeller: "Buyer & Seller Details",
witnessInfo: "Witness Information",
printablePdf: "Printable Agreement PDF",
secureRecord: "Secure Digital Record",

moneyAgreement: "Money Agreement",
moneyDescription:
  "Create structured money agreements with borrower, lender, amount, repayment and witness information.",

lenderBorrower: "Lender & Borrower Details",
amountTerms: "Amount & Terms",

createAgreement: "Create Agreement",


simpleProcess: "SIMPLE PROCESS",
howSams: "How SAMS",
works: "Works",
howDescription:
  "From creating your account to securely managing your agreements, SAMS keeps the entire process simple and organized.",

getStarted: "GET STARTED",
createAccount: "Create Account",
createAccountDesc:
  "Create your secure SAMS account and sign in to access your personal agreement dashboard.",

selectService: "SELECT SERVICE",
chooseAgreement: "Choose Agreement",
chooseAgreementDesc:
  "Select Supari Agreement or Money Agreement according to the type of record you want to create.",

addDetails: "ADD DETAILS",
fillSubmit: "Fill & Submit",
fillSubmitDesc:
  "Enter the required parties, transaction, terms and witness information through the structured form.",

manageSecurely: "MANAGE SECURELY",
accessRecords: "Access Records",
accessRecordsDesc:
  "View and manage your agreement records securely from your SAMS dashboard whenever required.",

  aboutSamsLabel: "ABOUT SAMS",
aboutTitle: "Agreements deserve",
aboutHighlight: "better management.",
aboutDescription1:
  "SAMS — Supari Agreement Management System — is designed to make agreement records simpler, organized and easier to access from one secure digital platform.",
aboutDescription2:
  "Instead of depending only on scattered documents and manual records, users can maintain important Supari and Money Agreement information through a structured system.",

structuredRecords: "Structured digital agreement records",
organizedManagement: "Simple and organized management",
secureAccess: "Secure account-based access",
exploreSams: "Explore SAMS",

systemLabel: "SAMS / SYSTEM",
secure: "SECURE",
agreementManagement: "AGREEMENT MANAGEMENT",
agreementType: "AGREEMENT TYPE",
active: "ACTIVE",
systemStatus: "SYSTEM STATUS",
recordsProtected: "Records Protected",

securityLabel: "SECURITY & PRIVACY",

securityTitle: "Your Records.",
securityHighlight: "Protected.",

securityDescription:
  "SAMS is designed with secure authentication, protected access and role-based permissions so your agreement records remain safe and private.",

securityCore: "SAMS SECURITY",
protectedSystem: "Protected System",

securityActive: "SECURITY ACTIVE",

access: "ACCESS",
authorized: "Authorized",

records: "RECORDS",
protected: "Protected",

status: "STATUS",
secureStatus: "Secure",

accountSecurity: "ACCOUNT SECURITY",
secureAuthentication: "Secure Authentication",

authenticationDescription:
"Only authenticated users can access their accounts and agreement records.",

dataProtection: "DATA PROTECTION",

protectedRecords: "Protected Records",

recordDescription:
"Agreement records are securely stored and managed digitally.",

controlledAccess: "CONTROLLED ACCESS",

roleBased: "Role-Based Access",

roleDescription:
"Admin and users receive different permissions based on their role.",

userPrivacy: "USER PRIVACY",

privateData: "Private User Data",

privacyDescription:
"Each user's agreement information remains private and accessible only to authorized users.",

installLabel: "SAMS WEB APP",

installTitle: "SAMS, always",
installHighlight: "within reach.",

installDescription:
"Install SAMS on your device for quick access to your agreements and dashboard without opening the browser every time.",

quickAccess: "Quick Access",
quickAccessDesc:
"Open SAMS directly from your device.",

appExperience: "App-like Experience",
appExperienceDesc:
"Enjoy a clean standalone experience on supported devices.",

alwaysUpdated: "Always Updated",
alwaysUpdatedDesc:
"Always use the latest version of SAMS.",

installWebApp: "INSTALL WEB APP",
installNow: "Install SAMS",

noPlayStore: "No Play Store required",

welcomeTo: "WELCOME TO",

agreementManagementText: "Agreement Management",

protectedAccess: "Protected Access",

webApp: "WEB APP",

readyInstall: "Ready to Install",


contactLabel: "GET IN TOUCH",

contactTitle: "Need help with",
contactHighlight: "SAMS?",

contactDescription:
"Have questions about your account, agreements or SAMS? Send us a message and our support team will get back to you.",

support: "SUPPORT",
supportText: "Account & Agreement Assistance",

platform: "PLATFORM",
platformText: "Secure Digital Support",

accessLabel: "ACCESS",
accessText: "Available Online",

contactSams: "CONTACT SAMS",

sendMessageTitle: "Send a Message",

online: "ONLINE",

yourName: "Your Name",
enterName: "Enter your name",

emailAddress: "Email Address",
enterEmail: "Enter your email",

subject: "Subject",
subjectPlaceholder: "How can we help?",

message: "Message",
messagePlaceholder: "Write your message here...",

sendMessage: "Send Message",

contactNote:
"Your information will only be used to respond to your request.",

footerDescription:
  "A secure digital platform for creating and managing Supari and Money Agreement records.",

secureAgreementManagement: "Secure Agreement Management",

navigation: "Navigation",

platformTitle: "Platform",

agreementsTitle: "Agreements",

myDashboard: "My Dashboard",

privacyPolicy: "Privacy Policy",

termsOfUse: "Terms of Use",

designedDevelopedBy: "Designed & Developed By",

copyright:
  "© 2026 SAMS. All rights reserved.",

  systemName: "SUPARI AGREEMENT MANAGEMENT SYSTEM",
systemTagline: "Secure Agreements · Protected Records",
loading: "LOADING",
systemReady: "SYSTEM READY",
loading: "LOADING",
systemReady: "SYSTEM READY",
systemName: "SUPARI AGREEMENT MANAGEMENT SYSTEM",
systemTagline: "Secure Agreements · Protected Records",
scrollToExplore: "Scroll to Explore",
agreementSystem: "Agreement System",
authentication: "Authentication",
digital: "Digital",
agreementRecords: "Agreement Records",
agreement: "Agreement",

"loginDescription":"Sign in to access your secure agreement dashboard.",

"rememberMe":"Remember me",

"forgotPassword":"Forgot Password?",

"dontHaveAccount":"Don't have an account?",

"signup":"Sign Up",

"password":"Password",

"loginDescription": "Sign in to access your secure agreement dashboard.",
"password": "Password",
"rememberMe": "Remember me",
"forgotPassword": "Forgot Password?",
"dontHaveAccount": "Don't have an account?",
"signup": "Sign Up",

"signupDescription": "Create your SAMS account to manage agreements securely.",
"fullName": "Full Name",
"enterFullName": "Enter your full name",
"mobileNumber": "Mobile Number",
"enterMobile": "Enter mobile number",
"businessType": "Business Type",
"selectBusinessType": "Select Business Type",
"individual": "Individual",
"farmer": "Farmer",
"trader": "Trader",
"supplier": "Supplier",
"company": "Company",
"other": "Other",
"confirmPassword": "Confirm Password",
"acceptTerms": "I agree to the Terms & Privacy Policy",
"alreadyAccount": "Already have an account?",

"emailVerification": "Email Verification",
"verifyOtp": "Verify OTP",
"otpDescription": "Enter the 6-digit OTP sent to your email.",
"didntReceiveOtp": "Didn't receive the OTP?",
"resendOtp": "Resend OTP",

"forgotPasswordDescription": "Enter your registered email address to receive a password reset OTP.",
"sendOtp": "Send OTP",
"resetPassword": "Reset Password",
"resetPasswordDescription": "Create a new secure password for your SAMS account."
    },
  },


//HINDI//


  hi: {
    translation: {
      language: "हिन्दी",
      home: "होम",
      agreements: "अनुबंध",
      howItWorks: "यह कैसे काम करता है",
      about: "हमारे बारे में",
      security: "सुरक्षा",
      contact: "संपर्क",
      installApp: "ऐप इंस्टॉल करें",
      login: "लॉगिन",

      heroBadge: "सुरक्षित डिजिटल अनुबंध प्लेटफ़ॉर्म",
      heroEyebrow: "स्मार्ट • सुरक्षित • प्रोफेशनल",
      heroTitle: "अनुबंध बनाना हुआ",
      heroHighlight: "सरल और सुरक्षित।",
      heroDescription:
        "एक प्रीमियम डिजिटल प्लेटफ़ॉर्म से अपने सुपारी और धन संबंधी अनुबंध बनाएं, प्रबंधित करें और सुरक्षित रखें।",
      exploreAgreements: "अनुबंध देखें",
      loginSams: "SAMS में लॉगिन करें",

      agreementServices: "अनुबंध सेवाएँ",
chooseYour: "अपना",
agreementWord: "अनुबंध चुनें",
agreementSectionDescription:
  "पेशेवर अनुबंध बनाएं, सुरक्षित डिजिटल रिकॉर्ड रखें और आवश्यकता पड़ने पर उन्हें आसानी से एक्सेस करें।",

samsAgreement: "SAMS अनुबंध",

supariAgreement: "सुपारी अनुबंध",
supariDescription:
  "विक्रेता, खरीदार, गवाह और लेन-देन की जानकारी के साथ सुपारी खरीद अनुबंध बनाएं और सुरक्षित रखें।",

buyerSeller: "खरीदार और विक्रेता विवरण",
witnessInfo: "गवाह की जानकारी",
printablePdf: "प्रिंट करने योग्य अनुबंध PDF",
secureRecord: "सुरक्षित डिजिटल रिकॉर्ड",

moneyAgreement: "धन अनुबंध",
moneyDescription:
  "उधारकर्ता, ऋणदाता, राशि, भुगतान शर्तों और गवाह की जानकारी के साथ व्यवस्थित धन अनुबंध बनाएं।",

lenderBorrower: "ऋणदाता और उधारकर्ता विवरण",
amountTerms: "राशि और शर्तें",

createAgreement: "अनुबंध बनाएं",

simpleProcess: "सरल प्रक्रिया",
howSams: "SAMS कैसे",
works: "काम करता है",
howDescription:
  "अकाउंट बनाने से लेकर अपने अनुबंधों को सुरक्षित रूप से प्रबंधित करने तक, SAMS पूरी प्रक्रिया को सरल और व्यवस्थित रखता है।",

getStarted: "शुरू करें",
createAccount: "अकाउंट बनाएं",
createAccountDesc:
  "अपना सुरक्षित SAMS अकाउंट बनाएं और व्यक्तिगत अनुबंध डैशबोर्ड एक्सेस करने के लिए लॉगिन करें।",

selectService: "सेवा चुनें",
chooseAgreement: "अनुबंध चुनें",
chooseAgreementDesc:
  "जिस प्रकार का रिकॉर्ड बनाना चाहते हैं उसके अनुसार सुपारी अनुबंध या धन अनुबंध चुनें।",

addDetails: "जानकारी भरें",
fillSubmit: "भरें और सबमिट करें",
fillSubmitDesc:
  "संरचित फॉर्म में संबंधित पक्षों, लेन-देन, शर्तों और गवाह की आवश्यक जानकारी दर्ज करें।",

manageSecurely: "सुरक्षित प्रबंधन",
accessRecords: "रिकॉर्ड एक्सेस करें",
accessRecordsDesc:
  "जब भी आवश्यकता हो अपने SAMS डैशबोर्ड से अनुबंध रिकॉर्ड सुरक्षित रूप से देखें और प्रबंधित करें।",

aboutSamsLabel: "SAMS के बारे में",
aboutTitle: "अनुबंधों को चाहिए",
aboutHighlight: "बेहतर प्रबंधन।",
aboutDescription1:
  "SAMS — सुपारी अनुबंध प्रबंधन प्रणाली — को अनुबंध रिकॉर्ड को सरल, व्यवस्थित और एक सुरक्षित डिजिटल प्लेटफ़ॉर्म से आसानी से उपलब्ध बनाने के लिए डिज़ाइन किया गया है।",
aboutDescription2:
  "बिखरे हुए दस्तावेज़ों और मैनुअल रिकॉर्ड पर निर्भर रहने के बजाय, उपयोगकर्ता सुपारी और धन अनुबंध की महत्वपूर्ण जानकारी एक व्यवस्थित प्रणाली में रख सकते हैं।",

structuredRecords: "व्यवस्थित डिजिटल अनुबंध रिकॉर्ड",
organizedManagement: "सरल और व्यवस्थित प्रबंधन",
secureAccess: "सुरक्षित अकाउंट-आधारित एक्सेस",
exploreSams: "SAMS देखें",

systemLabel: "SAMS / सिस्टम",
secure: "सुरक्षित",
agreementManagement: "अनुबंध प्रबंधन",
agreementType: "अनुबंध प्रकार",
active: "सक्रिय",
systemStatus: "सिस्टम स्थिति",
recordsProtected: "रिकॉर्ड सुरक्षित",

securityLabel: "सुरक्षा और गोपनीयता",

securityTitle: "आपके रिकॉर्ड।",
securityHighlight: "पूरी तरह सुरक्षित।",

securityDescription:
"सुरक्षित प्रमाणीकरण, नियंत्रित एक्सेस और भूमिका-आधारित अनुमति के साथ SAMS आपके अनुबंध रिकॉर्ड को सुरक्षित और निजी रखता है।",

securityCore: "SAMS सुरक्षा",
protectedSystem: "सुरक्षित प्रणाली",

securityActive: "सुरक्षा सक्रिय",

access: "एक्सेस",
authorized: "अधिकृत",

records: "रिकॉर्ड",
protected: "सुरक्षित",

status: "स्थिति",
secureStatus: "सुरक्षित",

accountSecurity: "अकाउंट सुरक्षा",
secureAuthentication: "सुरक्षित प्रमाणीकरण",

authenticationDescription:
"केवल प्रमाणित उपयोगकर्ता ही अपने खाते और अनुबंध रिकॉर्ड तक पहुँच सकते हैं।",

dataProtection: "डेटा सुरक्षा",

protectedRecords: "सुरक्षित रिकॉर्ड",

recordDescription:
"सभी अनुबंध रिकॉर्ड सुरक्षित डिजिटल प्रणाली में संग्रहीत किए जाते हैं।",

controlledAccess: "नियंत्रित एक्सेस",

roleBased: "भूमिका आधारित एक्सेस",

roleDescription:
"एडमिन और उपयोगकर्ताओं को उनकी भूमिका के अनुसार अलग-अलग अनुमति दी जाती है।",

userPrivacy: "उपयोगकर्ता गोपनीयता",

privateData: "निजी उपयोगकर्ता डेटा",

privacyDescription:
"प्रत्येक उपयोगकर्ता की जानकारी केवल अधिकृत उपयोगकर्ता द्वारा ही देखी जा सकती है।",

installLabel: "SAMS वेब ऐप",

installTitle: "SAMS, हमेशा",
installHighlight: "आपके साथ।",

installDescription:
"ब्राउज़र खोले बिना अपने अनुबंध और डैशबोर्ड तक तेज़ पहुँच के लिए SAMS को अपने डिवाइस पर इंस्टॉल करें।",

quickAccess: "तेज़ पहुँच",
quickAccessDesc:
"अपने डिवाइस से सीधे SAMS खोलें।",

appExperience: "ऐप जैसा अनुभव",
appExperienceDesc:
"समर्थित डिवाइसों पर साफ़ और आसान इंटरफ़ेस का आनंद लें।",

alwaysUpdated: "हमेशा अपडेट",
alwaysUpdatedDesc:
"SAMS का नवीनतम संस्करण हमेशा उपयोग करें।",

installWebApp: "वेब ऐप इंस्टॉल करें",
installNow: "SAMS इंस्टॉल करें",

noPlayStore: "Play Store की आवश्यकता नहीं",

welcomeTo: "स्वागत है",

agreementManagementText: "अनुबंध प्रबंधन",

protectedAccess: "सुरक्षित पहुँच",

webApp: "वेब ऐप",

readyInstall: "इंस्टॉल के लिए तैयार",

contactLabel: "संपर्क करें",

contactTitle: "क्या आपको",
contactHighlight: "SAMS में सहायता चाहिए?",

contactDescription:
"यदि आपके अकाउंट, अनुबंध या SAMS से संबंधित कोई प्रश्न हैं, तो हमें संदेश भेजें। हमारी सहायता टीम जल्द ही आपसे संपर्क करेगी।",

support: "सहायता",
supportText: "अकाउंट एवं अनुबंध सहायता",

platform: "प्लेटफ़ॉर्म",
platformText: "सुरक्षित डिजिटल सहायता",

accessLabel: "उपलब्धता",
accessText: "ऑनलाइन उपलब्ध",

contactSams: "SAMS से संपर्क करें",

sendMessageTitle: "संदेश भेजें",

online: "ऑनलाइन",

yourName: "आपका नाम",
enterName: "अपना नाम दर्ज करें",

emailAddress: "ईमेल पता",
enterEmail: "अपना ईमेल दर्ज करें",

subject: "विषय",
subjectPlaceholder: "हम आपकी कैसे सहायता कर सकते हैं?",

message: "संदेश",
messagePlaceholder: "अपना संदेश यहाँ लिखें...",

sendMessage: "संदेश भेजें",

contactNote:
"आपकी जानकारी का उपयोग केवल आपके अनुरोध का उत्तर देने के लिए किया जाएगा।",

footerDescription:
  "सुपारी एवं धन संबंधी अनुबंध बनाने और सुरक्षित रूप से प्रबंधित करने के लिए एक सुरक्षित डिजिटल प्लेटफ़ॉर्म।",

secureAgreementManagement: "सुरक्षित अनुबंध प्रबंधन",

navigation: "नेविगेशन",

platformTitle: "प्लेटफ़ॉर्म",

agreementsTitle: "अनुबंध",

myDashboard: "मेरा डैशबोर्ड",

privacyPolicy: "गोपनीयता नीति",

termsOfUse: "उपयोग की शर्तें",

designedDevelopedBy: "डिज़ाइन एवं डेवलपमेंट",

copyright:
  "© 2026 SAMS. सर्वाधिकार सुरक्षित।",

  systemName: "सुपारी एग्रीमेंट मैनेजमेंट सिस्टम",
    systemTagline: "सुरक्षित अनुबंध • सुरक्षित रिकॉर्ड",
    loading: "लोड हो रहा है",
    systemReady: "सिस्टम तैयार",
    agreementSystem: "एग्रीमेंट सिस्टम",

"loginDescription":"अपने सुरक्षित एग्रीमेंट डैशबोर्ड में लॉगिन करें।",

"rememberMe":"मुझे याद रखें",

"forgotPassword":"पासवर्ड भूल गए?",

"dontHaveAccount":"क्या आपका अकाउंट नहीं है?",

"signup":"साइन अप करें",

"password":"पासवर्ड",

"loginDescription": "अपने सुरक्षित एग्रीमेंट डैशबोर्ड में लॉगिन करें।",
"password": "पासवर्ड",
"rememberMe": "मुझे याद रखें",
"forgotPassword": "पासवर्ड भूल गए?",
"dontHaveAccount": "क्या आपका अकाउंट नहीं है?",
"signup": "साइन अप",

"signupDescription": "सुरक्षित एग्रीमेंट प्रबंधन के लिए अपना SAMS अकाउंट बनाएं।",
"fullName": "पूरा नाम",
"enterFullName": "अपना पूरा नाम दर्ज करें",
"mobileNumber": "मोबाइल नंबर",
"enterMobile": "मोबाइल नंबर दर्ज करें",
"businessType": "व्यवसाय का प्रकार",
"selectBusinessType": "व्यवसाय चुनें",
"individual": "व्यक्तिगत",
"farmer": "किसान",
"trader": "व्यापारी",
"supplier": "आपूर्तिकर्ता",
"company": "कंपनी",
"other": "अन्य",
"confirmPassword": "पासवर्ड की पुष्टि करें",
"acceptTerms": "मैं नियम एवं गोपनीयता नीति से सहमत हूँ",
"alreadyAccount": "क्या आपका पहले से अकाउंट है?",

"emailVerification": "ईमेल सत्यापन",
"verifyOtp": "OTP सत्यापित करें",
"otpDescription": "अपने ईमेल पर भेजा गया 6 अंकों का OTP दर्ज करें।",
"didntReceiveOtp": "OTP प्राप्त नहीं हुआ?",
"resendOtp": "OTP पुनः भेजें",
"forgotPasswordDescription": "पासवर्ड रीसेट OTP प्राप्त करने के लिए अपना पंजीकृत ईमेल पता दर्ज करें।",
"sendOtp": "OTP भेजें",
"resetPassword": "पासवर्ड रीसेट करें",
"resetPasswordDescription": "अपने SAMS अकाउंट के लिए नया सुरक्षित पासवर्ड बनाएं।"
    },
  },



  //BENGALI//

  bn: {
    translation: {
      language: "বাংলা",
      home: "হোম",
      agreements: "চুক্তি",
      howItWorks: "কীভাবে কাজ করে",
      about: "সম্পর্কে",
      security: "নিরাপত্তা",
      contact: "যোগাযোগ",
      installApp: "অ্যাপ ইনস্টল করুন",
      login: "লগইন",

      heroBadge: "নিরাপদ ডিজিটাল চুক্তি প্ল্যাটফর্ম",
      heroEyebrow: "স্মার্ট • নিরাপদ • পেশাদার",
      heroTitle: "চুক্তি তৈরি এখন",
      heroHighlight: "সহজ ও নিরাপদ।",
      heroDescription:
        "একটি প্রিমিয়াম ডিজিটাল প্ল্যাটফর্ম থেকে আপনার সুপারি ও অর্থ সংক্রান্ত চুক্তি তৈরি, পরিচালনা এবং নিরাপদে সংরক্ষণ করুন।",
      exploreAgreements: "চুক্তি দেখুন",
      loginSams: "SAMS-এ লগইন করুন",


      agreementServices: "চুক্তি পরিষেবা",
chooseYour: "আপনার",
agreementWord: "চুক্তি বেছে নিন",
agreementSectionDescription:
  "পেশাদার চুক্তি তৈরি করুন, নিরাপদ ডিজিটাল রেকর্ড সংরক্ষণ করুন এবং প্রয়োজন হলে সহজেই অ্যাক্সেস করুন।",

samsAgreement: "SAMS চুক্তি",

supariAgreement: "সুপারি চুক্তি",
supariDescription:
  "বিক্রেতা, ক্রেতা, সাক্ষী এবং লেনদেনের তথ্যসহ সুপারি ক্রয়ের চুক্তি তৈরি ও নিরাপদে সংরক্ষণ করুন।",

buyerSeller: "ক্রেতা ও বিক্রেতার তথ্য",
witnessInfo: "সাক্ষীর তথ্য",
printablePdf: "প্রিন্টযোগ্য চুক্তি PDF",
secureRecord: "নিরাপদ ডিজিটাল রেকর্ড",

moneyAgreement: "অর্থ চুক্তি",
moneyDescription:
  "ঋণগ্রহীতা, ঋণদাতা, অর্থের পরিমাণ, পরিশোধের শর্ত এবং সাক্ষীর তথ্যসহ চুক্তি তৈরি করুন।",

lenderBorrower: "ঋণদাতা ও ঋণগ্রহীতার তথ্য",
amountTerms: "পরিমাণ ও শর্ত",

createAgreement: "চুক্তি তৈরি করুন",

simpleProcess: "সহজ প্রক্রিয়া",
howSams: "SAMS কীভাবে",
works: "কাজ করে",
howDescription:
  "অ্যাকাউন্ট তৈরি থেকে চুক্তি নিরাপদে পরিচালনা করা পর্যন্ত SAMS পুরো প্রক্রিয়াটিকে সহজ ও সংগঠিত রাখে।",

getStarted: "শুরু করুন",
createAccount: "অ্যাকাউন্ট তৈরি করুন",
createAccountDesc:
  "আপনার নিরাপদ SAMS অ্যাকাউন্ট তৈরি করুন এবং ব্যক্তিগত চুক্তি ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন।",

selectService: "পরিষেবা নির্বাচন",
chooseAgreement: "চুক্তি বেছে নিন",
chooseAgreementDesc:
  "আপনি যে ধরনের রেকর্ড তৈরি করতে চান সেই অনুযায়ী সুপারি চুক্তি বা অর্থ চুক্তি নির্বাচন করুন।",

addDetails: "তথ্য যোগ করুন",
fillSubmit: "পূরণ ও জমা দিন",
fillSubmitDesc:
  "গঠিত ফর্মে সংশ্লিষ্ট পক্ষ, লেনদেন, শর্ত এবং সাক্ষীর প্রয়োজনীয় তথ্য লিখুন।",

manageSecurely: "নিরাপদ ব্যবস্থাপনা",
accessRecords: "রেকর্ড দেখুন",
accessRecordsDesc:
  "প্রয়োজন হলে আপনার SAMS ড্যাশবোর্ড থেকে নিরাপদে চুক্তির রেকর্ড দেখুন ও পরিচালনা করুন।",


  aboutSamsLabel: "SAMS সম্পর্কে",
aboutTitle: "চুক্তির প্রয়োজন",
aboutHighlight: "উন্নত ব্যবস্থাপনা।",
aboutDescription1:
  "SAMS — সুপারি চুক্তি ব্যবস্থাপনা ব্যবস্থা — চুক্তির রেকর্ডকে সহজ, সংগঠিত এবং একটি নিরাপদ ডিজিটাল প্ল্যাটফর্ম থেকে সহজে ব্যবহারযোগ্য করার জন্য তৈরি।",
aboutDescription2:
  "ছড়িয়ে থাকা নথি ও ম্যানুয়াল রেকর্ডের উপর নির্ভর না করে, ব্যবহারকারীরা সুপারি ও অর্থ চুক্তির গুরুত্বপূর্ণ তথ্য একটি সংগঠিত ব্যবস্থায় রাখতে পারেন।",

structuredRecords: "সংগঠিত ডিজিটাল চুক্তির রেকর্ড",
organizedManagement: "সহজ ও সংগঠিত ব্যবস্থাপনা",
secureAccess: "নিরাপদ অ্যাকাউন্ট-ভিত্তিক অ্যাক্সেস",
exploreSams: "SAMS দেখুন",

systemLabel: "SAMS / সিস্টেম",
secure: "নিরাপদ",
agreementManagement: "চুক্তি ব্যবস্থাপনা",
agreementType: "চুক্তির ধরন",
active: "সক্রিয়",
systemStatus: "সিস্টেমের অবস্থা",
recordsProtected: "রেকর্ড সুরক্ষিত",

securityLabel: "নিরাপত্তা ও গোপনীয়তা",

securityTitle: "আপনার রেকর্ড।",
securityHighlight: "সম্পূর্ণ সুরক্ষিত।",

securityDescription:
"নিরাপদ প্রমাণীকরণ, নিয়ন্ত্রিত প্রবেশাধিকার এবং ভূমিকা-ভিত্তিক অনুমতির মাধ্যমে SAMS আপনার চুক্তির তথ্য নিরাপদ রাখে।",

securityCore: "SAMS নিরাপত্তা",
protectedSystem: "সুরক্ষিত সিস্টেম",

securityActive: "নিরাপত্তা সক্রিয়",

access: "অ্যাক্সেস",
authorized: "অনুমোদিত",

records: "রেকর্ড",
protected: "সুরক্ষিত",

status: "স্থিতি",
secureStatus: "নিরাপদ",

accountSecurity: "অ্যাকাউন্ট নিরাপত্তা",
secureAuthentication: "নিরাপদ প্রমাণীকরণ",

authenticationDescription:
"শুধুমাত্র অনুমোদিত ব্যবহারকারী তাদের অ্যাকাউন্ট এবং চুক্তির রেকর্ডে প্রবেশ করতে পারবেন।",

dataProtection: "ডেটা সুরক্ষা",

protectedRecords: "সুরক্ষিত রেকর্ড",

recordDescription:
"সমস্ত চুক্তির রেকর্ড নিরাপদ ডিজিটাল ব্যবস্থায় সংরক্ষণ করা হয়।",

controlledAccess: "নিয়ন্ত্রিত অ্যাক্সেস",

roleBased: "ভূমিকা-ভিত্তিক অ্যাক্সেস",

roleDescription:
"অ্যাডমিন এবং ব্যবহারকারীরা তাদের ভূমিকা অনুযায়ী বিভিন্ন অনুমতি পান।",

userPrivacy: "ব্যবহারকারীর গোপনীয়তা",

privateData: "ব্যক্তিগত ব্যবহারকারীর তথ্য",

privacyDescription:
"প্রত্যেক ব্যবহারকারীর তথ্য শুধুমাত্র অনুমোদিত ব্যবহারকারীর জন্যই দৃশ্যমান।",

installLabel: "SAMS ওয়েব অ্যাপ",

installTitle: "SAMS, সবসময়",
installHighlight: "আপনার হাতের কাছে।",

installDescription:
"ব্রাউজার না খুলেই আপনার চুক্তি এবং ড্যাশবোর্ডে দ্রুত প্রবেশের জন্য SAMS ইনস্টল করুন।",

quickAccess: "দ্রুত প্রবেশ",

quickAccessDesc:
"আপনার ডিভাইস থেকে সরাসরি SAMS খুলুন।",

appExperience: "অ্যাপের মতো অভিজ্ঞতা",

appExperienceDesc:
"সমর্থিত ডিভাইসে পরিচ্ছন্ন ইন্টারফেস উপভোগ করুন।",

alwaysUpdated: "সবসময় আপডেট",

alwaysUpdatedDesc:
"সবসময় SAMS-এর সর্বশেষ সংস্করণ ব্যবহার করুন।",

installWebApp: "ওয়েব অ্যাপ ইনস্টল করুন",

installNow: "SAMS ইনস্টল করুন",

noPlayStore: "Play Store প্রয়োজন নেই",

welcomeTo: "স্বাগতম",

agreementManagementText: "চুক্তি ব্যবস্থাপনা",

protectedAccess: "সুরক্ষিত প্রবেশাধিকার",

webApp: "ওয়েব অ্যাপ",

readyInstall: "ইনস্টলের জন্য প্রস্তুত",

contactLabel: "যোগাযোগ করুন",

contactTitle: "SAMS সম্পর্কে",
contactHighlight: "সাহায্য প্রয়োজন?",

contactDescription:
"আপনার অ্যাকাউন্ট, চুক্তি বা SAMS সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের বার্তা পাঠান। আমাদের সহায়তা দল দ্রুত আপনার সাথে যোগাযোগ করবে।",

support: "সহায়তা",
supportText: "অ্যাকাউন্ট ও চুক্তি সহায়তা",

platform: "প্ল্যাটফর্ম",
platformText: "নিরাপদ ডিজিটাল সহায়তা",

accessLabel: "অ্যাক্সেস",
accessText: "অনলাইনে উপলব্ধ",

contactSams: "SAMS-এর সাথে যোগাযোগ করুন",

sendMessageTitle: "বার্তা পাঠান",

online: "অনলাইন",

yourName: "আপনার নাম",
enterName: "আপনার নাম লিখুন",

emailAddress: "ইমেইল ঠিকানা",
enterEmail: "আপনার ইমেইল লিখুন",

subject: "বিষয়",
subjectPlaceholder: "আমরা কীভাবে সাহায্য করতে পারি?",

message: "বার্তা",
messagePlaceholder: "এখানে আপনার বার্তা লিখুন...",

sendMessage: "বার্তা পাঠান",

contactNote:
"আপনার তথ্য শুধুমাত্র আপনার অনুরোধের উত্তর দেওয়ার জন্য ব্যবহার করা হবে।",

footerDescription:
  "সুপারি ও অর্থ সংক্রান্ত চুক্তি তৈরি ও নিরাপদে পরিচালনার জন্য একটি নিরাপদ ডিজিটাল প্ল্যাটফর্ম।",

secureAgreementManagement: "নিরাপদ চুক্তি ব্যবস্থাপনা",

navigation: "নেভিগেশন",

platformTitle: "প্ল্যাটফর্ম",

agreementsTitle: "চুক্তি",

myDashboard: "আমার ড্যাশবোর্ড",

privacyPolicy: "গোপনীয়তা নীতি",

termsOfUse: "ব্যবহারের শর্তাবলী",

designedDevelopedBy: "ডিজাইন ও ডেভেলপমেন্ট",

copyright:
  "© ২০২৬ SAMS। সর্বস্বত্ব সংরক্ষিত।",

  systemName: "সুপারি এগ্রিমেন্ট ম্যানেজমেন্ট সিস্টেম",
systemTagline: "নিরাপদ চুক্তি • সুরক্ষিত রেকর্ড",
loading: "লোড হচ্ছে",
systemReady: "সিস্টেম প্রস্তুত",
agreementSystem: "চুক্তি সিস্টেম",


  "loginDescription": "আপনার নিরাপদ চুক্তি ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন।",
  "rememberMe": "আমাকে মনে রাখুন",
  "forgotPassword": "পাসওয়ার্ড ভুলে গেছেন?",
  "dontHaveAccount": "অ্যাকাউন্ট নেই?",
  "signup": "সাইন আপ",
  "password": "পাসওয়ার্ড",

  "loginDescription": "আপনার নিরাপদ চুক্তি ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন।",
"password": "পাসওয়ার্ড",
"rememberMe": "আমাকে মনে রাখুন",
"forgotPassword": "পাসওয়ার্ড ভুলে গেছেন?",
"dontHaveAccount": "অ্যাকাউন্ট নেই?",
"signup": "সাইন আপ",

"signupDescription": "নিরাপদ চুক্তি পরিচালনার জন্য আপনার SAMS অ্যাকাউন্ট তৈরি করুন।",
"fullName": "পূর্ণ নাম",
"enterFullName": "আপনার পূর্ণ নাম লিখুন",
"mobileNumber": "মোবাইল নম্বর",
"enterMobile": "মোবাইল নম্বর লিখুন",
"businessType": "ব্যবসার ধরন",
"selectBusinessType": "ব্যবসার ধরন নির্বাচন করুন",
"individual": "ব্যক্তিগত",
"farmer": "কৃষক",
"trader": "ব্যবসায়ী",
"supplier": "সরবরাহকারী",
"company": "কোম্পানি",
"other": "অন্যান্য",
"confirmPassword": "পাসওয়ার্ড নিশ্চিত করুন",
"acceptTerms": "আমি শর্তাবলী ও গোপনীয়তা নীতিতে সম্মত",
"alreadyAccount": "আগেই অ্যাকাউন্ট আছে?",

"emailVerification": "ইমেইল যাচাইকরণ",
"verifyOtp": "OTP যাচাই করুন",
"otpDescription": "আপনার ইমেইলে পাঠানো ৬ সংখ্যার OTP লিখুন।",
"didntReceiveOtp": "OTP পাননি?",
"resendOtp": "আবার OTP পাঠান",
"forgotPasswordDescription": "পাসওয়ার্ড রিসেট OTP পাওয়ার জন্য আপনার নিবন্ধিত ইমেইল ঠিকানা লিখুন।",
"sendOtp": "OTP পাঠান",
"resetPassword": "পাসওয়ার্ড রিসেট করুন",
"resetPasswordDescription": "আপনার SAMS অ্যাকাউন্টের জন্য একটি নতুন নিরাপদ পাসওয়ার্ড তৈরি করুন।"

    },
  },


  //NEPALI//

  ne: {
    translation: {
      language: "नेपाली",
      home: "गृहपृष्ठ",
      agreements: "सम्झौताहरू",
      howItWorks: "यसले कसरी काम गर्छ",
      about: "हाम्रो बारेमा",
      security: "सुरक्षा",
      contact: "सम्पर्क",
      installApp: "एप इन्स्टल गर्नुहोस्",
      login: "लगइन",

      heroBadge: "सुरक्षित डिजिटल सम्झौता प्लेटफर्म",
      heroEyebrow: "स्मार्ट • सुरक्षित • व्यावसायिक",
      heroTitle: "सम्झौता बनाउन अब",
      heroHighlight: "सरल र सुरक्षित।",
      heroDescription:
        "एउटै प्रिमियम डिजिटल प्लेटफर्मबाट आफ्नो सुपारी र पैसा सम्बन्धी सम्झौताहरू सिर्जना, व्यवस्थापन र सुरक्षित रूपमा राख्नुहोस्।",
      exploreAgreements: "सम्झौताहरू हेर्नुहोस्",
      loginSams: "SAMS मा लगइन गर्नुहोस्",

      agreementServices: "सम्झौता सेवाहरू",
chooseYour: "आफ्नो",
agreementWord: "सम्झौता छान्नुहोस्",
agreementSectionDescription:
  "व्यावसायिक सम्झौताहरू सिर्जना गर्नुहोस्, सुरक्षित डिजिटल रेकर्ड राख्नुहोस् र आवश्यक पर्दा सजिलै पहुँच गर्नुहोस्।",

samsAgreement: "SAMS सम्झौता",

supariAgreement: "सुपारी सम्झौता",
supariDescription:
  "विक्रेता, खरिदकर्ता, साक्षी र कारोबारको जानकारीसहित सुपारी खरिद सम्झौता सिर्जना गरी सुरक्षित राख्नुहोस्।",

buyerSeller: "खरिदकर्ता र विक्रेता विवरण",
witnessInfo: "साक्षीको जानकारी",
printablePdf: "प्रिन्ट गर्न मिल्ने सम्झौता PDF",
secureRecord: "सुरक्षित डिजिटल रेकर्ड",

moneyAgreement: "पैसा सम्बन्धी सम्झौता",
moneyDescription:
  "ऋणदाता, ऋणी, रकम, भुक्तानी सर्त र साक्षीको जानकारीसहित व्यवस्थित सम्झौता सिर्जना गर्नुहोस्।",

lenderBorrower: "ऋणदाता र ऋणी विवरण",
amountTerms: "रकम र सर्तहरू",

createAgreement: "सम्झौता सिर्जना गर्नुहोस्",


simpleProcess: "सरल प्रक्रिया",
howSams: "SAMS कसरी",
works: "काम गर्छ",
howDescription:
  "खाता सिर्जना गर्नेदेखि सम्झौताहरू सुरक्षित रूपमा व्यवस्थापन गर्नेसम्म SAMS ले सम्पूर्ण प्रक्रियालाई सरल र व्यवस्थित राख्छ।",

getStarted: "सुरु गर्नुहोस्",
createAccount: "खाता सिर्जना गर्नुहोस्",
createAccountDesc:
  "आफ्नो सुरक्षित SAMS खाता सिर्जना गरी व्यक्तिगत सम्झौता ड्यासबोर्ड पहुँच गर्न लगइन गर्नुहोस्।",

selectService: "सेवा छान्नुहोस्",
chooseAgreement: "सम्झौता छान्नुहोस्",
chooseAgreementDesc:
  "तपाईंले बनाउन चाहेको रेकर्डअनुसार सुपारी सम्झौता वा पैसा सम्बन्धी सम्झौता छान्नुहोस्।",

addDetails: "विवरण थप्नुहोस्",
fillSubmit: "भर्नुहोस् र पेश गर्नुहोस्",
fillSubmitDesc:
  "संरचित फारममार्फत सम्बन्धित पक्ष, कारोबार, सर्त र साक्षीको आवश्यक जानकारी प्रविष्ट गर्नुहोस्।",

manageSecurely: "सुरक्षित व्यवस्थापन",
accessRecords: "रेकर्ड हेर्नुहोस्",
accessRecordsDesc:
  "आवश्यक पर्दा आफ्नो SAMS ड्यासबोर्डबाट सम्झौता रेकर्ड सुरक्षित रूपमा हेर्नुहोस् र व्यवस्थापन गर्नुहोस्।",

  aboutSamsLabel: "SAMS को बारेमा",
aboutTitle: "सम्झौताहरूलाई चाहिन्छ",
aboutHighlight: "राम्रो व्यवस्थापन।",
aboutDescription1:
  "SAMS — सुपारी सम्झौता व्यवस्थापन प्रणाली — सम्झौता रेकर्डलाई सरल, व्यवस्थित र एउटै सुरक्षित डिजिटल प्लेटफर्मबाट सजिलै पहुँचयोग्य बनाउन डिजाइन गरिएको हो।",
aboutDescription2:
  "छरिएका कागजात र म्यानुअल रेकर्डमा मात्र निर्भर हुनुको सट्टा, प्रयोगकर्ताले सुपारी र पैसा सम्बन्धी सम्झौताका महत्वपूर्ण जानकारी व्यवस्थित प्रणालीमा राख्न सक्छन्।",

structuredRecords: "व्यवस्थित डिजिटल सम्झौता रेकर्ड",
organizedManagement: "सरल र व्यवस्थित व्यवस्थापन",
secureAccess: "सुरक्षित खाता-आधारित पहुँच",
exploreSams: "SAMS हेर्नुहोस्",

systemLabel: "SAMS / प्रणाली",
secure: "सुरक्षित",
agreementManagement: "सम्झौता व्यवस्थापन",
agreementType: "सम्झौताको प्रकार",
active: "सक्रिय",
systemStatus: "प्रणाली स्थिति",
recordsProtected: "रेकर्ड सुरक्षित",


securityLabel: "सुरक्षा तथा गोपनीयता",

securityTitle: "तपाईंका रेकर्डहरू।",
securityHighlight: "पूर्ण रूपमा सुरक्षित।",

securityDescription:
"सुरक्षित प्रमाणीकरण, नियन्त्रित पहुँच र भूमिका-आधारित अनुमति मार्फत SAMS ले तपाईंका सम्झौता रेकर्डहरू सुरक्षित राख्छ।",

securityCore: "SAMS सुरक्षा",
protectedSystem: "सुरक्षित प्रणाली",

securityActive: "सुरक्षा सक्रिय",

access: "पहुँच",
authorized: "अधिकृत",

records: "रेकर्ड",
protected: "सुरक्षित",

status: "स्थिति",
secureStatus: "सुरक्षित",

accountSecurity: "खाता सुरक्षा",
secureAuthentication: "सुरक्षित प्रमाणीकरण",

authenticationDescription:
"प्रमाणित प्रयोगकर्ताले मात्र आफ्नो खाता र सम्झौता रेकर्ड पहुँच गर्न सक्छन्।",

dataProtection: "डाटा सुरक्षा",

protectedRecords: "सुरक्षित रेकर्ड",

recordDescription:
"सबै सम्झौता रेकर्डहरू सुरक्षित डिजिटल प्रणालीमा भण्डारण गरिन्छ।",

controlledAccess: "नियन्त्रित पहुँच",

roleBased: "भूमिका-आधारित पहुँच",

roleDescription:
"एडमिन र प्रयोगकर्तालाई उनीहरूको भूमिकाअनुसार फरक अनुमति प्रदान गरिन्छ।",

userPrivacy: "प्रयोगकर्ता गोपनीयता",

privateData: "निजी प्रयोगकर्ता डाटा",

privacyDescription:
"प्रत्येक प्रयोगकर्ताको जानकारी अधिकृत प्रयोगकर्ताले मात्र हेर्न सक्छ।",


installLabel: "SAMS वेब एप",

installTitle: "SAMS, सधैं",
installHighlight: "तपाईंको पहुँचमा।",

installDescription:
"ब्राउजर नखोली आफ्नो सम्झौता र ड्यासबोर्डमा छिटो पहुँचका लागि SAMS इन्स्टल गर्नुहोस्।",

quickAccess: "छिटो पहुँच",

quickAccessDesc:
"आफ्नो उपकरणबाट सिधै SAMS खोल्नुहोस्।",

appExperience: "एप जस्तै अनुभव",

appExperienceDesc:
"समर्थित उपकरणमा सफा र सहज इन्टरफेसको अनुभव लिनुहोस्।",

alwaysUpdated: "सधैं अद्यावधिक",

alwaysUpdatedDesc:
"SAMS को नवीनतम संस्करण प्रयोग गर्नुहोस्।",

installWebApp: "वेब एप इन्स्टल गर्नुहोस्",

installNow: "SAMS इन्स्टल गर्नुहोस्",

noPlayStore: "Play Store आवश्यक छैन",

welcomeTo: "स्वागत छ",

agreementManagementText: "सम्झौता व्यवस्थापन",

protectedAccess: "सुरक्षित पहुँच",

webApp: "वेब एप",

readyInstall: "इन्स्टल गर्न तयार",

contactLabel: "सम्पर्क गर्नुहोस्",

contactTitle: "SAMS सम्बन्धी",
contactHighlight: "सहयोग चाहिन्छ?",

contactDescription:
"यदि तपाईंको खाता, सम्झौता वा SAMS सम्बन्धी कुनै प्रश्न छन् भने हामीलाई सन्देश पठाउनुहोस्। हाम्रो सहायता टोलीले चाँडै तपाईंलाई सम्पर्क गर्नेछ।",

support: "सहयोग",
supportText: "खाता तथा सम्झौता सहायता",

platform: "प्लेटफर्म",
platformText: "सुरक्षित डिजिटल सहायता",

accessLabel: "पहुँच",
accessText: "अनलाइन उपलब्ध",

contactSams: "SAMS लाई सम्पर्क गर्नुहोस्",

sendMessageTitle: "सन्देश पठाउनुहोस्",

online: "अनलाइन",

yourName: "तपाईंको नाम",
enterName: "आफ्नो नाम लेख्नुहोस्",

emailAddress: "इमेल ठेगाना",
enterEmail: "आफ्नो इमेल लेख्नुहोस्",

subject: "विषय",
subjectPlaceholder: "हामी तपाईंलाई कसरी सहयोग गर्न सक्छौं?",

message: "सन्देश",
messagePlaceholder: "आफ्नो सन्देश यहाँ लेख्नुहोस्...",

sendMessage: "सन्देश पठाउनुहोस्",

contactNote:
"तपाईंको जानकारी केवल तपाईंको अनुरोधको उत्तर दिनका लागि मात्र प्रयोग गरिनेछ।",

footerDescription:
  "सुपारी तथा पैसा सम्बन्धी सम्झौताहरू सिर्जना र सुरक्षित रूपमा व्यवस्थापन गर्नका लागि सुरक्षित डिजिटल प्लेटफर्म।",

secureAgreementManagement: "सुरक्षित सम्झौता व्यवस्थापन",

navigation: "नेभिगेसन",

platformTitle: "प्लेटफर्म",

agreementsTitle: "सम्झौताहरू",

myDashboard: "मेरो ड्यासबोर्ड",

privacyPolicy: "गोपनीयता नीति",

termsOfUse: "प्रयोगका सर्तहरू",

designedDevelopedBy: "डिजाइन तथा विकास",

copyright:
  "© २०२६ SAMS। सबै अधिकार सुरक्षित।",

  systemName: "सुपारी सम्झौता व्यवस्थापन प्रणाली",
systemTagline: "सुरक्षित सम्झौता • सुरक्षित रेकर्ड",
loading: "लोड हुँदैछ",
systemReady: "प्रणाली तयार",
agreementSystem: "सम्झौता प्रणाली",


  "loginDescription": "आफ्नो सुरक्षित सम्झौता ड्यासबोर्डमा पहुँच गर्न लगइन गर्नुहोस्।",
  "rememberMe": "मलाई सम्झनुहोस्",
  "forgotPassword": "पासवर्ड बिर्सनुभयो?",
  "dontHaveAccount": "खाता छैन?",
  "signup": "साइन अप",
  "password": "पासवर्ड",

"loginDescription": "आफ्नो सुरक्षित सम्झौता ड्यासबोर्डमा पहुँच गर्न लगइन गर्नुहोस्।",
"password": "पासवर्ड",
"rememberMe": "मलाई सम्झनुहोस्",
"forgotPassword": "पासवर्ड बिर्सनुभयो?",
"dontHaveAccount": "खाता छैन?",
"signup": "साइन अप",

"signupDescription": "सुरक्षित सम्झौता व्यवस्थापनका लागि आफ्नो SAMS खाता बनाउनुहोस्।",
"fullName": "पूरा नाम",
"enterFullName": "आफ्नो पूरा नाम लेख्नुहोस्",
"mobileNumber": "मोबाइल नम्बर",
"enterMobile": "मोबाइल नम्बर लेख्नुहोस्",
"businessType": "व्यवसायको प्रकार",
"selectBusinessType": "व्यवसाय छान्नुहोस्",
"individual": "व्यक्तिगत",
"farmer": "किसान",
"trader": "व्यापारी",
"supplier": "आपूर्तिकर्ता",
"company": "कम्पनी",
"other": "अन्य",
"confirmPassword": "पासवर्ड पुष्टि गर्नुहोस्",
"acceptTerms": "म नियम तथा गोपनीयता नीतिमा सहमत छु",
"alreadyAccount": "पहिले नै खाता छ?",

"emailVerification": "इमेल प्रमाणीकरण",
"verifyOtp": "OTP प्रमाणीकरण गर्नुहोस्",
"otpDescription": "तपाईंको इमेलमा पठाइएको ६ अङ्कको OTP प्रविष्ट गर्नुहोस्।",
"didntReceiveOtp": "OTP प्राप्त भएन?",
"resendOtp": "OTP पुनः पठाउनुहोस्",

"forgotPasswordDescription": "पासवर्ड रिसेट OTP प्राप्त गर्न आफ्नो दर्ता गरिएको इमेल ठेगाना प्रविष्ट गर्नुहोस्।",
"sendOtp": "OTP पठाउनुहोस्",
"resetPassword": "पासवर्ड रिसेट गर्नुहोस्",
"resetPasswordDescription": "आफ्नो SAMS खाताका लागि नयाँ सुरक्षित पासवर्ड सिर्जना गर्नुहोस्।"

    },
  },
};

const savedLanguage = localStorage.getItem("sams-language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",

    supportedLngs: ["en", "hi", "bn", "ne"],

    ns: ["translation"],
    defaultNS: "translation",
     debug: false,


    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
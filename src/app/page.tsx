

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Sprout,
  Warehouse,
  IndianRupee,
  Leaf,
  Tractor,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Upload,
  FileText,
  X,
  Languages,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Logo } from "@/components/icons";
import type { Role } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDropzone } from "react-dropzone";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  icon: React.ElementType;
  dataAiHint: string;
}

const content = {
  en: {
    langName: "English",
    welcome: "Welcome to AaharSetu",
    tagline: "Transforming Agriculture with a Single Digital Platform",
    chooseRole: "Choose Your Role to Get Started",
    roles: [
      {
        role: "farmer" as Role,
        title: "Farmer",
        description: "Manage your crops, predict spoilage, and reduce waste.",
        icon: Sprout,
        dataAiHint: "farm crops",
      },
      {
        role: "dealer" as Role,
        title: "Dealer",
        description: "Browse surplus crops, place orders, and track deliveries.",
        icon: ShoppingBag,
        dataAiHint: "market stall",
      },
      {
        role: "green-guardian" as Role,
        title: "Warehouse Manager",
        description: "Monitor storage, manage inventory, and ensure quality.",
        icon: Warehouse,
        dataAiHint: "warehouse interior",
      },
      {
        role: "logistics" as Role,
        title: "Logistics",
        description: "Manage transportation, track deliveries, and optimize routes.",
        icon: Truck,
        dataAiHint: "delivery truck",
      },
      {
        role: "admin" as Role,
        title: "Admin",
        description: "Oversee the platform, manage users, and view analytics.",
        icon: ShieldCheck,
        dataAiHint: "data dashboard",
      },
    ],
    continueAs: "Continue as",
    topPerformers: "Top Performers",
    guidelinesTitle: "Standard Guidelines",
    guidelinesDescription: "Access and download the operational guidelines, quality standards, and best practices for all platform stakeholders.",
    documentCenterTitle: "Document Center",
    documentCenterDescription: "Upload or download important PDF documents, DOCX files, etc.",
    dropzoneActive: "Drop the files here ...",
    dropzoneIdle: "Drag 'n' drop some files here, or click to select files",
    dropzoneHint: "PDF, DOCX, etc. up to 10MB",
    impactTitle: "Our Impact",
    impactStats: [
      {
          icon: Warehouse,
          value: "150+",
          label: "Warehouses Connected",
      },
      {
          icon: Leaf,
          value: "5,000+ Tons",
          label: "Food Saved from Waste",
      },
      {
          icon: IndianRupee,
          value: "₹25 Cr+",
          label: "Value Created for Farmers",
      },
    ],
    footerAbout: "About Us",
    footerCareers: "Careers",
    footerPress: "Press",
    footerContact: "Contact Us",
    footerLegal: "Legal",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCookie: "Cookie Policy",
    footerFollow: "Follow Us",
    footerRights: "All rights reserved.",
  },
  hi: {
    langName: "हिंदी",
    welcome: "आहारसेतु में आपका स्वागत है",
    tagline: "एक ही डिजिटल प्लेटफॉर्म के साथ कृषि को बदलना",
    chooseRole: "आरंभ करने के लिए अपनी भूमिका चुनें",
    roles: [
      {
        role: "farmer" as Role,
        title: "किसान",
        description: "अपनी फसलों का प्रबंधन करें, खराब होने का अनुमान लगाएं और कचरे को कम करें।",
        icon: Sprout,
        dataAiHint: "farm crops",
      },
      {
        role: "dealer" as Role,
        title: "व्यापारी",
        description: "अधिशेष फसलों को ब्राउज़ करें, ऑर्डर दें और डिलीवरी ट्रैक करें।",
        icon: ShoppingBag,
        dataAiHint: "market stall",
      },
      {
        role: "green-guardian" as Role,
        title: "गोदाम प्रबंधक",
        description: "भंडारण की निगरानी करें, इन्वेंट्री का प्रबंधन करें और गुणवत्ता सुनिश्चित करें।",
        icon: Warehouse,
        dataAiHint: "warehouse interior",
      },
      {
        role: "logistics" as Role,
        title: "रसद",
        description: "परिवहन का प्रबंधन करें, डिलीवरी ट्रैक करें और मार्गों का अनुकूलन करें।",
        icon: Truck,
        dataAiHint: "delivery truck",
      },
      {
        role: "admin" as Role,
        title: "व्यवस्थापक",
        description: "प्लेटफ़ॉर्म की देखरेख करें, उपयोगकर्ताओं का प्रबंधन करें और विश्लेषण देखें।",
        icon: ShieldCheck,
        dataAiHint: "data dashboard",
      },
    ],
    continueAs: "के रूप में जारी रखें",
    topPerformers: "शीर्ष प्रदर्शन करने वाले",
    guidelinesTitle: "मानक दिशानिर्देश",
    guidelinesDescription: "सभी प्लेटफ़ॉर्म हितधारकों के लिए परिचालन दिशानिर्देश, गुणवत्ता मानक और सर्वोत्तम प्रथाओं तक पहुंचें और डाउनलोड करें।",
    documentCenterTitle: "दस्तावेज़ केंद्र",
    documentCenterDescription: "महत्वपूर्ण PDF दस्तावेज़, DOCX फ़ाइलें आदि अपलोड या डाउनलोड करें।",
    dropzoneActive: "फ़ाइलों को यहाँ छोड़ें...",
    dropzoneIdle: "कुछ फ़ाइलों को यहाँ खींचें और छोड़ें, या फ़ाइलों का चयन करने के लिए क्लिक करें",
    dropzoneHint: "PDF, DOCX, आदि 10MB तक",
    impactTitle: "हमारा प्रभाव",
     impactStats: [
      {
          icon: Warehouse,
          value: "150+",
          label: "गोदाम जुड़े",
      },
      {
          icon: Leaf,
          value: "5,000+ टन",
          label: "भोजन बर्बादी से बचाया",
      },
      {
          icon: IndianRupee,
          value: "₹25 करोड़+",
          label: "किसानों के लिए बनाया गया मूल्य",
      },
    ],
    footerAbout: "हमारे बारे में",
    footerCareers: "करियर",
    footerPress: "प्रेस",
    footerContact: "हमसे संपर्क करें",
    footerLegal: "कानूनी",
    footerPrivacy: "गोपनीयता नीति",
    footerTerms: "सेवा की शर्तें",
    footerCookie: "कुकी नीति",
    footerFollow: "हमें फॉलो करें",
    footerRights: "सर्वाधिकार सुरक्षित।",
  },
  bn: {
    langName: "বাংলা",
    welcome: "আहारসেতুতে স্বাগতম",
    tagline: "একটি ডিজিটাল প্ল্যাটফর্মের মাধ্যমে কৃষির রূপান্তর",
    chooseRole: "শুরু করতে আপনার ভূমিকা પસંદ করুন",
    roles: [
      { role: "farmer", title: " কৃষক", description: "আপনার ফসল পরিচালনা করুন, 예측 করুন এবং বর্জ্য হ্রাস করুন।", icon: Sprout, dataAiHint: "farm crops" },
      { role: "dealer", title: "ডিলার", description: "উודিলারৃত্ত ফসল ব্রাউজ করুন, অর্ডার দিন এবং ডেলিভারি ট্র্যাক করুন।", icon: ShoppingBag, dataAiHint: "market stall" },
      { role: "green-guardian", title: "গুদام ব্যবস্থাপک", description: "স্টোরেজ নিরীক্ষণ করুন, ইনভেন্টরি পরিচালনা করুন এবং গুণমান নিশ্চিত করুন।", icon: Warehouse, dataAiHint: "warehouse interior" },
      { role: "logistics", title: "লজিস্টিকস", description: "পরিবহন পরিচালনা করুন, ডেলিভারি ট্র্যাক করুন এবং রুট অপ্টিমাইজ করুন।", icon: Truck, dataAiHint: "delivery truck" },
      { role: "admin", title: "অ্যাডমিন", description: "প্ল্যাটফর্মের তত্ত্বাবধান করুন, ব্যবহারকারীদের পরিচালনা করুন এবং বিশ্লেষণ দেখুন।", icon: ShieldCheck, dataAiHint: "data dashboard" },
    ],
    continueAs: "হিসাবে চালিয়ে যান",
    topPerformers: "শীর্ষ प्रदर्शनকারী",
    guidelinesTitle: "স্ট্যান্ডার্ড নির্দেশিকা",
    guidelinesDescription: "সমস্ত প্ল্যাটফর্ম স্টেকহোল্ডারদের জন্য অপারেশনাল নির্দেশিকা, গুণমানের معیار এবং সেরা অনুশীলনগুলি অ্যাক্সেস এবং ডাউনলোড করুন।",
    documentCenterTitle: "ডকুমেন্ট 센터",
    documentCenterDescription: "গুরুত্বপূর্ণ PDF ডকুমেন্ট, DOCX ফাইল ইত্যাদি আপলোড বা ডাউনলোড করুন।",
    dropzoneActive: "এখানে ফাইলগুলি ড্রপ করুন...",
    dropzoneIdle: "এখানে कुछ ফাইল টেনে আনুন, বা ফাইল নির্বাচন করতে ক্লিক করুন",
    dropzoneHint: "PDF, DOCX, ইত্যাদি 10MB পর্যন্ত",
    impactTitle: "আমাদের প্রভাব",
    impactStats: [
      { icon: Warehouse, value: "150+", label: "সংযুক্ত গুদাম" },
      { icon: Leaf, value: "5,000+ টন", label: "খাদ্য অপচয় থেকে বাঁচানো হয়েছে" },
      { icon: IndianRupee, value: "₹25 কোটি+", label: "কৃষকদের জন্য তৈরি मूल्य" },
    ],
    footerAbout: "আমাদের সম্পর্কে",
    footerCareers: "কেরিয়ার",
    footerPress: "প্রেস",
    footerContact: "যোগাযোগ করুন",
    footerLegal: "আইনি",
    footerPrivacy: "গোপনীয়তা নীতি",
    footerTerms: "পরিষেবার শর্তাবলী",
    footerCookie: "কুকি নীতি",
    footerFollow: "আমাদের অনুসরণ করুন",
    footerRights: "সমস্ত अधिकार সংরক্ষিত।",
  },
  te: {
    langName: "తెలుగు",
    welcome: "ఆహారसेतुకు స్వాగతం",
    tagline: "ఒకే డిజిటల్ ప్లాట్‌ఫారమ్‌తో వ్యవసాయాన్ని మార్చడం",
    chooseRole: "ప్రారంభించడానికి మీ పాత్రను ఎంచుకోండి",
    roles: [
      { role: "farmer", title: "రైతు", description: "మీ పంటలను నిర్వహించండి, పాడుకాకుండా అంచనా వేయండి మరియు వ్యర్థాలను తగ్గించండి.", icon: Sprout, dataAiHint: "farm crops" },
      { role: "dealer", title: "డీलर", description: "మిగులు పంటలను బ్రౌజ్ చేయండి, ఆర్డర్లు ఇవ్వండి మరియు డెలివరీలను ట్రాక్ చేయండి.", icon: ShoppingBag, dataAiHint: "market stall" },
      { role: "green-guardian", title: "గిడ్డంగి व्यवस्थापक", description: "నిల్వను పర్యవేక్షించండి, इन्वेंटरीని నిర్వహించండి మరియు నాణ్యతను నిర్ధారించండి.", icon: Warehouse, dataAiHint: "warehouse interior" },
      { role: "logistics", title: "లాజిస్టిక్స్", description: "రవాణాను నిర్వహించండి, డెలివరీలను ట్రాక్ చేయండి మరియు మార్గాలను ఆప్టిమైజ్ చేయండి.", icon: Truck, dataAiHint: "delivery truck" },
      { role: "admin", title: "అഡ്మిన్", description: "ప్లాట్‌ఫారమ్‌ను పర్యవేక్షించండి, వినియోగదారులను నిర్వహించండి మరియు విశ్లేషణలను వీక్షించండి.", icon: ShieldCheck, dataAiHint: "data dashboard" },
    ],
    continueAs: "గా కొనసాగండి",
    topPerformers: "అగ్ర ప్రదర్శకులు",
    guidelinesTitle: "ప్రామాణిక మార్గదర్శకాలు",
    guidelinesDescription: "అన్ని ప్లాట్‌ఫారమ్ பங்குதாரர்களுக்கான కార్యాಚರಣ మార్గదర్శకాలు, నాణ్యता ప్రమాణాలు మరియు ఉత్తమ అభ್ಯಾసాలను యాక్సెస్ చేయండి మరియు డౌన్‌లోడ్ చేయండి.",
    documentCenterTitle: "పత్ర కేంద్రం",
    documentCenterDescription: "ముఖ్యమైన PDF పత్రాలు, DOCX ఫైళ్లు మొదలైనవి అప్‌లోడ్ చేయండి లేదా డౌన్‌లోడ్ చేయండి.",
    dropzoneActive: "ఫైళ్లను ఇక్కడ వదలండి...",
    dropzoneIdle: "కొన్ని ఫైళ్లను ఇక్కడ లాగి వదలండి, లేదా ఫైళ్లను ఎంచుకోవడానికి క్లిక్ చేయండి",
    dropzoneHint: "PDF, DOCX, మొదలైనవి 10MB వరకు",
    impactTitle: "మా ప్రభావం",
    impactStats: [
      { icon: Warehouse, value: "150+", label: "అనుసంధానించబడిన గిడ్డంగులు" },
      { icon: Leaf, value: "5,000+ టన్నులు", label: "ఆహారం వృధా కాకుండా కాపాడబడింది" },
      { icon: IndianRupee, value: "₹25 కోట్లు+", label: "రైతుల కోసం సృష్టించబడిన విలువ" },
    ],
    footerAbout: "మా గురించి",
    footerCareers: "కెరీర్లు",
    footerPress: "ప्रेस",
    footerContact: "మమ్మల్ని సంప్రదించండి",
    footerLegal: "చట్టపరమైన",
    footerPrivacy: "గోప్యతా విధానం",
    footerTerms: "సేವಾ నిబంధనలు",
    footerCookie: "కుకీ విధానం",
    footerFollow: "మమ్మల్ని అనుసరించండి",
    footerRights: "అన్ని హక్కులూ ਰਾਖਵించబడినవి.",
  },
  mr: {
    langName: "मराठी",
    welcome: "आहारसेतूमध्ये स्वागत आहे",
    tagline: "एकाच डिजिटल प्लॅटफॉर्मसह शेतीत परिवर्तन",
    chooseRole: "सुरुवात करण्यासाठी तुमची भूमिका निवडा",
    roles: [
        { role: "farmer", title: "शेतकरी", description: "तुमच्या पिकांचे व्यवस्थापन करा, नासाडीचा अंदाज घ्या आणि कचरा कमी करा.", icon: Sprout, dataAiHint: "farm crops" },
        { role: "dealer", title: "व्यापारी", description: "शिल्लक पिके ब्राउझ करा, ऑर्डर द्या आणि डिलिव्हरीचा मागोवा घ्या.", icon: ShoppingBag, dataAiHint: "market stall" },
        { role: "green-guardian", title: "वेअरहाऊस व्यवस्थापक", description: "साठवणुकीचे निरीक्षण करा, इन्व्हेंटरी व्यवस्थापित करा आणि गुणवत्ता सुनिश्चित करा.", icon: Warehouse, dataAiHint: "warehouse interior" },
        { role: "logistics", title: "लॉजिस्टिक्स", description: "वाहतुकीचे व्यवस्थापन करा, डिलिव्हरीचा मागोवा घ्या आणि मार्ग ऑप्टिमाइझ करा.", icon: Truck, dataAiHint: "delivery truck" },
        { role: "admin", title: "प्रशासक", description: "प्लॅटफॉर्मचे निरीक्षण करा, वापरकर्त्यांचे व्यवस्थापन करा आणि विश्लेषणे पहा.", icon: ShieldCheck, dataAiHint: "data dashboard" },
    ],
    continueAs: "म्हणून सुरू ठेवा",
    topPerformers: "शीर्ष कामगिरी करणारे",
    guidelinesTitle: "मानक मार्गदर्शक तत्त्वे",
    guidelinesDescription: "सर्व प्लॅtform भागधारकांसाठी operasional मार्गदर्शक तत्त्वे, गुणवत्ता मानके आणि सर्वोत्तम पद्धतींमध्ये प्रवेश करा आणि डाउनलोड करा.",
    documentCenterTitle: "दस्तऐवज केंद्र",
    documentCenterDescription: "महत्त्वाची PDF दस्तऐवज, DOCX फाइल्स इत्यादी अपलोड किंवा डाउनलोड करा.",
    dropzoneActive: "קבצים येथे टाका...",
    dropzoneIdle: "येथे काही फाइल्स ड्रॅग आणि ड्रॉप करा, किंवा फाइल्स निवडण्यासाठी क्लिक करा",
    dropzoneHint: "PDF, DOCX, इत्यादी 10MB पर्यंत",
    impactTitle: "आमचा प्रभाव",
    impactStats: [
        { icon: Warehouse, value: "150+", label: "जोडलेली गोदामे" },
        { icon: Leaf, value: "5,000+ टन", label: "अन्न वाया जाण्यापासून वाचवले" },
        { icon: IndianRupee, value: "₹25 कोटी+", label: "शेतकऱ्यांसाठी निर्माण केलेले मूल्य" },
    ],
    footerAbout: "आमच्याबद्दल",
    footerCareers: "करिअर",
    footerPress: "प्रेस",
    footerContact: "आमच्याशी संपर्क साधा",
footerLegal: "कायदेशीर",
    footerPrivacy: "गोपनीयता धोरण",
    footerTerms: "सेवा अटी",
    footerCookie: "कुकी धोरण",
    footerFollow: "आम्हाला फॉलो करा",
    footerRights: "सर्व हक्क राखीव.",
  },
  ta: {
    langName: "தமிழ்",
    welcome: "ஆஹார்சேதுவுக்கு வரவேற்கிறோம்",
    tagline: "ஒரே டிஜிட்டல் தளத்துடன் விவசாயத்தை மாற்றுதல்",
    chooseRole: "தொடங்குவதற்கு உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்",
    roles: [
        { role: "farmer", title: "விவசாயி", description: "உங்கள் பயிர்களை நிர்வகிக்கவும், கெட்டுப்போவதை கணிக்கவும் மற்றும் கழிவுகளை குறைக்கவும்.", icon: Sprout, dataAiHint: "farm crops" },
        { role: "dealer", title: "డీलर", description: "உபரி பயிர்களை உலவவும், ஆர்டர்களை வைக்கவும் மற்றும் டெலிவரிகளைக் கண்காணிக்கவும்.", icon: ShoppingBag, dataAiHint: "market stall" },
        { role: "green-guardian", title: "கிடங்கு மேலாளர்", description: "சேமிப்பகத்தை கண்காணிக்கவும், சரக்குகளை நிர்வகிக்கவும் மற்றும் தரத்தை உறுதிப்படுத்தவும்.", icon: Warehouse, dataAiHint: "warehouse interior" },
        { role: "logistics", title: "லாஜிஸ்டிக்ஸ்", description: "போக்குவரத்தை நிர்வகிக்கவும், டெலிவரிகளைக் கண்காணிக்கவும் மற்றும் வழிகளை மேம்படுத்தவும்.", icon: Truck, dataAiHint: "delivery truck" },
        { role: "admin", title: "நிர்வாகி", description: "தளத்தை மேற்பார்வையிடவும், பயனர்களை நிர்வகிக்கவும் మరియు பகுப்பாய்வுகளைப் பார்க்கவும்.", icon: ShieldCheck, dataAiHint: "data dashboard" },
    ],
    continueAs: "ஆக തുടരുക",
    topPerformers: "சிறந்த செயல்திறன் காட்டுபவர்கள்",
    guidelinesTitle: "தரமான வழிகாட்டுதல்கள்",
    guidelinesDescription: "அனைத்து தள பங்குதாரர்களுக்கான செயல்பாட்டு வழிகாட்டுதல்கள், தர стандаரங்கள் மற்றும் சிறந்த நடைமுறைகளை அணுகவும் మరియు பதிவிறக்கவும்.",
    documentCenterTitle: "ஆவண மையம்",
    documentCenterDescription: "முக்கியமான PDF ஆவணங்கள், DOCX கோப்புகள் போன்றவற்றை பதிவேற்றவும் அல்லது பதிவிறக்கவும்.",
    dropzoneActive: "கோப்புகளை இங்கே விடுங்கள்...",
    dropzoneIdle: "சில கோப்புகளை இங்கே இழுத்து விடுங்கள், அல்லது கோப்புகளைத் தேர்ந்தெடுக்க கிளிக் செய்யவும்",
    dropzoneHint: "PDF, DOCX, போன்றவை 10MB வரை",
    impactTitle: "எங்கள் தாக்கம்",
    impactStats: [
        { icon: Warehouse, value: "150+", label: "இணைக்கப்பட்ட கிடங்குகள்" },
        { icon: Leaf, value: "5,000+ டன்கள்", label: "உணவு வீணாவதிலிருந்து சேமிக்கப்பட்டது" },
        { icon: IndianRupee, value: "₹25 கோடி+", label: "விவசாயிகளுக்காக உருவாக்கப்பட்ட மதிப்பு" },
    ],
    footerAbout: "எங்களைப் பற்றி",
    footerCareers: "வேலை வாய்ப்புகள்",
    footerPress: "பத்திரிகை",
    footerContact: "ഞങ്ങളെ ಸಂಪರ್ಕിക്കുക",
    footerLegal: "சட்டரீதியான",
    footerPrivacy: "தனியுரிமைக் கொள்கை",
    footerTerms: "सेवा നിബന്ധനകൾ",
    footerCookie: "குकी கொள்கை",
    footerFollow: "ഞങ്ങളെ പിന്തുടരുക",
    footerRights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  }
};

type LangKey = keyof typeof content;


function RoleCard({ role, title, description, icon: Icon, lang, continueAsText }: RoleCardProps & { lang: LangKey; continueAsText: string }) {
  return (
    <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-2 hover:border-primary bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <Icon className="h-8 w-8 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-base text-muted-foreground mb-6 min-h-[60px]">{description}</p>
        <Button asChild size="lg" className="w-full text-lg">
          <Link href={`/dashboard?role=${role}`}>
             {continueAsText} {title}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

interface PerformerCardProps {
  name: string;
  role: string;
  location: string;
  achievement: string;
  avatarUrl: string;
}

function PerformerCard({ name, role, location, achievement, avatarUrl }: PerformerCardProps) {
    return (
        <Card className="h-full flex flex-col p-6 bg-blue-100 dark:bg-blue-900/30 border-blue-200 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-0 flex-grow">
                <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20 border-4 border-white flex-shrink-0">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                             <div className="flex-1">
                                <h4 className="font-bold text-lg text-foreground">{name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{role}</p>
                                <p className="text-sm text-muted-foreground">{location}</p>
                             </div>
                            <div className="text-right">
                                <Image src="https://i.ibb.co/sp1M0WnQ/Copilot-20250908-154142-Photoroom.png" alt="Medal" width={60} height={60} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <div className="mt-4">
                <div className="bg-white dark:bg-card rounded-full px-4 py-2 text-sm text-blue-800 dark:text-blue-200 font-semibold shadow-inner text-center">
                    {achievement}
                </div>
            </div>
        </Card>
    );
}


export default function RoleSelectionPage() {
  const [lang, setLang] = useState<LangKey>('en');
  const pageContent = content[lang];
  
  const topPerformers: PerformerCardProps[] = [
    {
      name: "Vijay Kumar",
      role: "Logistics Head",
      location: "Maharashtra Region",
      achievement: "1.2 tons of food wastage saved",
      avatarUrl: "https://i.pravatar.cc/150?u=vijay"
    },
    {
      name: "Meera Patel",
      role: "Warehouse Manager",
      location: "Nashik Cold Storage",
      achievement: "25% spoilage reduction",
      avatarUrl: "https://i.pravatar.cc/150?u=meera"
    },
    {
      name: "Rohan Gupta",
      role: "Top Farmer",
      location: "Pune District",
      achievement: "Highest crop utilization rate",
      avatarUrl: "https://i.pravatar.cc/150?u=rohan"
    },
    {
      name: "Aisha Sharma",
      role: "Quality Control Lead",
      location: "Nagpur Hub",
      achievement: "99.8% quality rating",
      avatarUrl: "https://i.pravatar.cc/150?u=aisha"
    },
    {
      name: "Suresh Singh",
      role: "Top Dealer",
      location: "Aurangabad",
      achievement: "50+ tons of surplus moved",
      avatarUrl: "https://i.pravatar.cc/150?u=suresh"
    },
    {
        name: "Priya Rao",
        role: "Eco-Farmer",
        location: "Satara",
        achievement: "30% reduction in food waste",
        avatarUrl: "https://i.pravatar.cc/150?u=priya"
    },
    {
        name: "Amit Deshmukh",
        role: "Logistics Coordinator",
        location: "Mumbai Port",
        achievement: "On-time delivery rate 98%",
        avatarUrl: "https://i.pravatar.cc/150?u=amit"
    }
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [performerApi, setPerformerApi] = useState<CarouselApi>();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };


  useEffect(() => {
    if (!api) {
      return;
    }
    const updateSlideInfo = () => {
      setCurrent(api.selectedScrollSnap());
    }
    
    updateSlideInfo();
    api.on("select", updateSlideInfo);
    
    return () => {
      api.off("select", updateSlideInfo);
    };
  }, [api]);

  useEffect(() => {
    if (!performerApi) {
      return;
    }
  }, [performerApi]);


  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background">
      <div className="w-full h-24 bg-white grid grid-cols-3 items-center px-4">
        <div className="flex items-center gap-4 justify-start">
          <Image src="https://i.ibb.co/td7KZ93/Chat-GPT-Image-Sep-9-2025-07-46-01-AM.png" alt="AaharSetu Logo" width={112} height={45} />
          <Image src="https://i.ibb.co/twpxgfHk/logoagriculture.png" alt="logoagriculture" width={168} height={68}/>
        </div>
        <div className="flex justify-center">
            <Image src="https://i.ibb.co/R4S2M88G/Azadi-Ka-Amrit-Mahotsav-Logo.png" alt="Azadi-Ka-Amrit-Mahotsav-Logo" width={88} height={88} />
        </div>
        <div className="flex items-center gap-2 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Languages className="mr-2 h-4 w-4" />
                  {content[lang].langName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('hi')}>हिंदी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('bn')}>বাংলা</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('te')}>తెలుగు</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('mr')}>मराठी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ta')}>தமிழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <hr className="w-full border-t-4 border-primary" />
        <div className="flex w-full flex-col items-center justify-center p-4 grow wavy-border">

            <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-center pt-16">
                <div className="mb-6 text-foreground">
                    <h1 className="text-5xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-top-4 duration-1000">
                        {pageContent.welcome}
                    </h1>
                </div>
                <p className="max-w-3xl text-center text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-top-6 duration-1000">
                    {pageContent.tagline}
                </p>

                 <p className="text-lg text-muted-foreground mb-8">{pageContent.chooseRole}</p>

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000"
                >
                    <CarouselContent className="-ml-4">
                    {pageContent.roles.map((role, index) => (
                        <CarouselItem
                            key={index}
                            className={cn(
                                "pl-4 md:basis-1/2 lg:basis-1/3 transition-all duration-300",
                                "carousel-item",
                                { "is-active": index === current }
                            )}
                            style={{
                                opacity: "var(--carousel-item-opacity, 0.3)",
                                transform: "scale(var(--carousel-item-scale, 0.9))",
                            }}
                        >
                          <div className="p-1">
                              <RoleCard {...role} lang={lang} continueAsText={pageContent.continueAs} />
                          </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-10" />
                    <CarouselNext className="mr-10" />
                </Carousel>
                
                 <div className="mt-20 w-full max-w-5xl text-center animate-in fade-in duration-1000">
                    <div className="mb-8">
                        <hr className="w-1/4 mx-auto border-t-2 border-primary/20" />
                    </div>

                    <div className="my-12">
                        <Image src="https://i.ibb.co/TB55Lx4Q/Chat-GPT-Image-Sep-9-2025-07-46-12-AM.png" alt="Partner Logos" width={800} height={92} className="mx-auto" />
                    </div>

                    <h2 className="text-4xl font-bold text-foreground mb-8">{pageContent.topPerformers}</h2>
                     <Carousel
                        setApi={setPerformerApi}
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full max-w-5xl mx-auto"
                    >
                        <CarouselContent className="-ml-4">
                        {topPerformers.map((performer, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 md:basis-1/2 lg:basis-[48%]"
                            >
                              <div className="p-1 h-full">
                                  <PerformerCard {...performer} />
                              </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-0" />
                        <CarouselNext className="mr-0" />
                    </Carousel>
                </div>

                <div className="mt-20 w-full max-w-5xl text-center animate-in fade-in duration-1000">
                    <div className="mb-8">
                        <hr className="w-1/4 mx-auto border-t-2 border-primary/20" />
                    </div>
                     <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl">
                        <h2 className="text-4xl font-bold text-foreground mb-4">{pageContent.guidelinesTitle}</h2>
                        <p className="max-w-2xl mx-auto text-muted-foreground mb-8">{pageContent.guidelinesDescription}</p>
                        <Card className="max-w-3xl mx-auto text-left">
                            <CardHeader>
                                <CardTitle>{pageContent.documentCenterTitle}</CardTitle>
                                <CardDescription>{pageContent.documentCenterDescription}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div {...getRootProps()} className={cn("flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50", isDragActive && "bg-muted/50 border-primary")}>
                                    <input {...getInputProps()} />
                                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        {isDragActive ? pageContent.dropzoneActive : pageContent.dropzoneIdle}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{pageContent.dropzoneHint}</p>
                                </div>
                                {files.length > 0 && (
                                    <div className="mt-4 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                        {files.map(file => (
                                            <Card key={file.name} className="p-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                   <FileText className="h-5 w-5 flex-shrink-0" />
                                                   <span className="text-sm truncate">{file.name}</span>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(file.name)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                     </div>
                </div>

                <div className="mt-20 w-full max-w-5xl text-center animate-in fade-in duration-1000">
                     <div className="mb-8">
                        <hr className="w-1/4 mx-auto border-t-2 border-primary/20" />
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-8">{pageContent.impactTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {pageContent.impactStats.map((stat, index) => (
                         <Card key={index} className="p-6 text-center">
                            <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                            <p className="text-4xl font-bold">{stat.value}</p>
                            <p className="text-muted-foreground mt-1">{stat.label}</p>
                         </Card>
                       ))}
                    </div>
                </div>
            </div>
        </div>

         <footer className="w-full bg-gray-900 text-white py-12 animate-in fade-in duration-1000 mt-20">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Logo className="h-8 w-8 text-primary" />
                        <span className="text-xl font-semibold">AaharSetu</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Reducing food waste, one crop at a time. A digital ecosystem for sustainable agriculture.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="#" className="hover:text-white">{pageContent.footerAbout}</Link></li>
                        <li><Link href="#" className="hover:text-white">{pageContent.footerCareers}</Link></li>
                        <li><Link href="#" className="hover:text-white">{pageContent.footerPress}</Link></li>
                        <li><Link href="#" className="hover:text-white">{pageContent.footerContact}</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4">{pageContent.footerLegal}</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="#" className="hover:text-white">{pageContent.footerPrivacy}</Link></li>
                        <li><Link href="#" className="hover:text-white">{pageContent.footerTerms}</Link></li>
                        <li><Link href="#" className="hover:text-white">{pageContent.footerCookie}</Link></li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold mb-4">{pageContent.footerFollow}</h4>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-gray-400 hover:text-white"><Facebook className="h-6 w-6" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><Twitter className="h-6 w-6" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><Instagram className="h-6 w-6" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><Linkedin className="h-6 w-6" /></Link>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} AaharSetu. {pageContent.footerRights}</p>
            </div>
        </footer>
    </div>
  );
}

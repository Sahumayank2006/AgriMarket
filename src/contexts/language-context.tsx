
"use client"

import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { Role } from '@/lib/types';
import { Sprout, ShoppingBag, Warehouse, ShieldCheck, IndianRupee, Leaf, Users } from 'lucide-react';
import { translateText } from '@/lib/translate';

// English content is now the source of truth
export const content = {
  en: {
    langName: "English",
    welcome: "Welcome to eAaharSetu",
    tagline: "Transforming Agriculture with a Single Digital Platform",
    chooseRole: "Choose Your Role to Get Started",
    roles: [
      { role: "farmer" as Role, title: "Farmer", titleKey: "farmer", description: "Manage your crops, predict spoilage, and reduce waste.", descriptionKey: "farmer_desc", icon: Sprout, dataAiHint: "farm crops" },
      { role: "dealer" as Role, title: "Dealer", titleKey: "dealer", description: "Browse surplus crops, place orders, and track deliveries.", descriptionKey: "dealer_desc", icon: ShoppingBag, dataAiHint: "market stall" },
      { role: "green-guardian" as Role, title: "Warehouse Manager", titleKey: "green-guardian", description: "Monitor storage, manage inventory, and ensure quality.", descriptionKey: "green-guardian_desc", icon: Warehouse, dataAiHint: "warehouse interior" },
      { role: "admin" as Role, title: "Admin", titleKey: "admin", description: "Oversee the platform, manage users, and view analytics.", descriptionKey: "admin_desc", icon: ShieldCheck, dataAiHint: "data dashboard" },
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
      { icon: Warehouse, value: "150+", label: "Warehouses Connected", labelKey: "warehouses_connected" },
      { icon: Leaf, value: "5,000+ Tons", label: "Food Saved from Waste", labelKey: "food_saved" },
      { icon: IndianRupee, value: "₹25 Cr+", label: "Value Created for Farmers", labelKey: "value_created" },
      { icon: Users, value: "25,000+", label: "People Fed", labelKey: "people_fed" },
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
    dashboardTitle: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    logout: "Log out",
  },
  hi: { langName: "हिंदी" },
  bn: { langName: "বাংলা" },
  te: { langName: "తెలుగు" },
  mr: { langName: "मराठी" },
  ta: { langName: "தமிழ்" },
};

export type LangKey = keyof typeof content;

type Translations = { [key: string]: string };

interface LanguageContextType {
    lang: LangKey;
    setLang: (lang: LangKey) => void;
    t: (key: string, defaultValue: string) => string;
    loading: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
    lang: 'en',
    setLang: () => {},
    t: (_key, defaultValue) => defaultValue,
    loading: false,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<LangKey>('en');
    const [translations, setTranslations] = useState<Translations>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.classList.remove('lang-en', 'lang-hi', 'lang-bn', 'lang-te', 'lang-ta', 'lang-mr');
        document.body.classList.add(`lang-${lang}`);

        if (lang === 'en') {
            setTranslations({});
            return;
        }

        const translateContent = async () => {
            setLoading(true);
            const newTranslations: Translations = {};
            const sourceContent = content.en;
            
            const translationPromises = Object.entries(sourceContent).map(async ([key, value]) => {
                if (typeof value === 'string') {
                    newTranslations[key] = await translateText(value, lang);
                }
            });

            await Promise.all(translationPromises);
            setTranslations(newTranslations);
            setLoading(false);
        };

        translateContent();
    }, [lang]);

    const t = useCallback((key: string, defaultValue: string): string => {
        if (lang === 'en') {
            return defaultValue;
        }
        return translations[key] || defaultValue;
    }, [lang, translations]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, loading }}>
            {children}
        </LanguageContext.Provider>
    );
};

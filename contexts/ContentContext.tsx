
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the structure of your site's content
interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  // We will add other sections here later
}

// Default content, hardcoded as a fallback
const defaultContent: SiteContent = {
  hero: {
    title: 'Propulsez Votre Marque Touristique',
    subtitle: 'Telya Agency - Votre partenaire en marketing digital pour le tourisme et les loisirs.',
    cta: 'Découvrir Nos Services',
  },
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (field: string, value: string) => void;
  saveContent: () => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Helper to safely get nested properties
const getNested = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

// Helper to safely set nested properties
const setNested = (obj: any, path: string, value: string) => {
  const parts = path.split('.');
  const last = parts.pop();
  if (!last) return;

  let lastObj = obj;
  for(let i=0; i < parts.length; i++) {
    if (lastObj[parts[i]] === undefined) {
      lastObj[parts[i]] = {};
    }
    lastObj = lastObj[parts[i]];
  }

  lastObj[last] = value;
};


export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  // Load content from localStorage on initial render
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        // Merge saved content with defaults to avoid errors if structure changes
        const parsedContent = JSON.parse(savedContent);
        const mergedContent = JSON.parse(JSON.stringify(defaultContent));
        if (parsedContent.hero) {
            mergedContent.hero = {...mergedContent.hero, ...parsedContent.hero};
        }
        setContent(mergedContent);
      }
    } catch (error) {
      console.error("Failed to load content from localStorage", error);
      setContent(defaultContent);
    }
  }, []);

  const updateContent = useCallback((field: string, value: string) => {
    setContent(prevContent => {
      const newContent = JSON.parse(JSON.stringify(prevContent)); // Deep copy
      setNested(newContent, field, value);
      return newContent;
    });
  }, []);

  const saveContent = () => {
    try {
      localStorage.setItem('siteContent', JSON.stringify(content));
      alert('Contenu sauvegardé localement !');
    } catch (error) {
      console.error("Failed to save content to localStorage", error);
      alert('Erreur lors de la sauvegarde.');
    }
  };
  
  const resetContent = () => {
    localStorage.removeItem('siteContent');
    setContent(defaultContent);
    alert('Contenu réinitialisé.');
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, saveContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

interface EditableTextProps {
  fieldId: string;
  // FIX: Changed type from `keyof JSX.IntrinsicElements` to `React.ElementType` to resolve JSX-related type errors.
  // `React.ElementType` is the correct type for a prop that determines the rendered HTML tag or component.
  as?: React.ElementType;
  className?: string;
}

// Helper to safely get nested properties
const getNested = (obj: any, path: string): string => {
    const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
    return value || '';
}


export const EditableText: React.FC<EditableTextProps> = ({ fieldId, as: Component = 'span', className }) => {
  const { isAdmin } = useAuth();
  const { content, updateContent } = useContent();

  const text = getNested(content, fieldId);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    // Only update if the text has actually changed
    if (e.currentTarget.innerText !== text) {
        updateContent(fieldId, e.currentTarget.innerText);
    }
  };
  
  if (isAdmin) {
    return (
      <Component
        contentEditable={true}
        suppressContentEditableWarning={true} // Important for React
        onBlur={handleBlur}
        className={`${className} outline-none focus:ring-2 focus:ring-brand-green-500 focus:ring-offset-2 focus:ring-offset-black/50 p-1 rounded-sm border-2 border-dashed border-transparent hover:border-brand-green-300 transition-all`}
        style={{ cursor: 'text' }}
        dangerouslySetInnerHTML={{ __html: text }} // Use dangerouslySetInnerHTML to set initial content
      />
    );
  }

  return <Component className={className}>{text}</Component>;
};

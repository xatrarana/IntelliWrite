import React from 'react';

interface TruncateContentProps {
  content: string;
  maxWords: number;
}

const TruncateContent: React.FC<TruncateContentProps> = ({ content, maxWords }) => {
  const truncate = (str: string, numWords: number): string => {
    const words = str.split(' ');
    return words.length > numWords ? words.slice(0, numWords).join(' ') + '...' : str;
  };

  const truncatedContent = truncate(content, maxWords);

  return (
    <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
  );
};

export default TruncateContent;



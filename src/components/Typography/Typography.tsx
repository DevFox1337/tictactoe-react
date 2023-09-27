import React from 'react';
import './Typography.scss';

interface TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  content: string;
  size?: 'small' | 'regular' | 'medium' | 'large';
  weight?: 'normal' | 'bold';
}

function Typography({ as = 'span', content, size = 'regular', weight = 'normal' }: TypographyProps) {
  
  const className = `typography typography--${size} typography--${weight}`;

  return React.createElement(as, { className }, content);
}


export default Typography
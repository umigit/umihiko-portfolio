import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  value: string;
  language?: string;
};

export const CodeBlock: React.FC<Props> = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={vs2015}>
      {value}
    </SyntaxHighlighter>
  );
};

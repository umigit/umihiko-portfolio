import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './codeblock';

type Props = {
  markdown: string;
};

export const Markdown: React.FC<Props> = ({ markdown }) => {
  return (
    <ReactMarkdown
      source={markdown}
      renderers={{ code: CodeBlock }}
      allowDangerousHtml
    />
  );
};

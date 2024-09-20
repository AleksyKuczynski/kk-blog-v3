// src/main/lib/markdown/markdownToHtml.ts
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export function convertMarkdownToHtmlSync(markdown: string): string {
  return remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .processSync(markdown)
    .toString();
}
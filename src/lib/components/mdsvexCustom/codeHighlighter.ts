import {escapeSvelte} from "mdsvex";
import {getHighlighter} from "shiki";
const THEME = "github-dark";

async function highlighter(code: string, lang = "text") {
  console.log(123);
  const highlighter = await getHighlighter({
    theme: THEME,
  });
  const html = escapeSvelte(highlighter.codeToHtml(code, {lang}));
  return html;
}

export {highlighter};

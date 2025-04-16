declare module "@toast-ui/editor" {
  export default class Editor {
    getMarkdown(): string;
    getInstance(): Editor;
    setMarkdown(markdown: string): void;
  }
}

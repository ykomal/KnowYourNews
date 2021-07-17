export class HTMLParsers {
  parser: DOMParser;
  tabSourceCode: any;
  htmlDoc: Document;

  constructor(sourceCode: any) {
    this.tabSourceCode = sourceCode;
    this.parser = new DOMParser();
    this.htmlDoc = this.parser.parseFromString(this.tabSourceCode, 'text/html')
  }

  public getTagsFromHead(tagName: string) {
    if (this.htmlDoc.head.getElementsByTagName(tagName).length > 0) {
      return this.htmlDoc.head.getElementsByTagName(tagName);
    }
    return undefined;
  }

  public getTitleTagValue() {
    var titleTag = this.getTagsFromHead("title");
    if (titleTag !== undefined) {
      return titleTag[0].innerHTML.toLowerCase();
    }
    else {
      return null;
    }
  }
}
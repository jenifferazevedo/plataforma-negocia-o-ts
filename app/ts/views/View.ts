export abstract class View<T> {
  private _element: JQuery;
  private _escape: boolean;
  constructor(selector: string, escape: boolean = false) {
    this._element = $(selector);
    this._escape = escape;
  }
  update(model: T): void {
    let template = this.template(model);
    if(this._escape) {
     template = template.replace(/<script>[\s\S]*?<\/script>/g, '');}
    this._element.html(template);
  }
  abstract template(model: T): string;
}
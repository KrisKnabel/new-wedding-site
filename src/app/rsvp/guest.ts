export class Guest {
  public name: string;
  public isChild: boolean;

  constructor( _name: string, _isChild: boolean ) {
    this.name = _name;
    this.isChild = _isChild;
  }
}
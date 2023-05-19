export class IngresoEgreso {

  constructor(
    public description: string,
    public amount: string,
    public type: string,
    public uid?: string
    ) {}
}

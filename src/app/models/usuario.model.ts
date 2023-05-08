export class Usuario {

  static fromFirestore({ uid, nombre, email }): Usuario {
    return new Usuario(uid, nombre, email);
  }

  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}
}

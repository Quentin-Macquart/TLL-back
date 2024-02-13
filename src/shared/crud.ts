export interface ICRUD<T> {
  findById?(id: string, auth?: object): Promise<T>;

  find?(id?: string, query?: object, auth?: object): Promise<T>;

  put?(id: string, obj: T, auth?: object): Promise<T>;

  delete?(id?: string, auth?: object): T;

  create?(obj: T, auth?: object): T;

  update?(id: string, obj: T, auth?: object);
}

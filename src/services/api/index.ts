export class Api implements IService {
  private inited = false

  constructor() {}

  async init(): PVoid {
    if (!this.inited) {
      this.inited = true
    }
  }
}

import { makeAutoObservable } from 'mobx'
import { hydrateStore, makePersistable } from 'mobx-persist-store'

export class Test implements IStore {
  counter = 0

  constructor() {
    makeAutoObservable(this)

    // makePersistable(this, {
    //   name: 'Sample',
    //   properties: [],
    // })
  }

  increment(): void {
    this.counter++
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this)
  }
}

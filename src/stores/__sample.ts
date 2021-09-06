import { makeAutoObservable } from 'mobx'
import { hydrateStore, makePersistable } from 'mobx-persist-store'

export class Sample implements IStore {
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'Sample',
      properties: [],
    })
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this)
  }
}

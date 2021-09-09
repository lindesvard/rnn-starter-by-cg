import { makeAutoObservable } from 'mobx'
import { hydrateStore, makePersistable } from 'mobx-persist-store'

export class User implements IStore {
  accessToken: string | null = null
  email: string | null = null
  name: string | null = null

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'User',
      properties: ['accessToken', 'name', 'email'],
    })
  }

  isAuthorized(): boolean {
    return !!this.accessToken
  }

  set({ email }: { email: string }): void {
    this.accessToken = String(Math.random() * 1000)
    this.email = email
    this.name = 'Joe Doe'
  }

  clear(): void {
    this.accessToken = null
    this.email = null
    this.name = null
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this)
  }
}

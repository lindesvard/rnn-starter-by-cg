import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export class Storage implements IService {
  private inited = false

  delete = storage.delete.bind(storage)
  getAllKeys = storage.getAllKeys.bind(storage)
  getBoolean = storage.getBoolean.bind(storage)
  getNumber = storage.getNumber.bind(storage)
  getString = storage.getString.bind(storage)
  set = storage.set.bind(storage)

  init = async (): PVoid => {
    if (!this.inited) {
      this.inited = true
    }
  }
}

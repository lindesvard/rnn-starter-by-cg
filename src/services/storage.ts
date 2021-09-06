import { MMKV } from 'react-native-mmkv'

export class Storage implements IService {
  private inited = false

  delete = MMKV.delete
  getAllKeys = MMKV.getAllKeys
  getBoolean = MMKV.getBoolean
  getNumber = MMKV.getNumber
  getString = MMKV.getString
  set = MMKV.set

  init = async (): PVoid => {
    if (!this.inited) {
      this.inited = true
    }
  }
}

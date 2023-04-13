import {makeAutoObservable} from "mobx";

class CounterStore {
  count: number = 0
  timer = 60
  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count = this.count + 1
  }

  decrement() {
    this.count = this.count - 1
  }

  get total() {
    return `count + timer = ${this.timer + this.count}`
  }
}

export default new CounterStore()
import {isEqual} from "@core/utils"

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.sub = null
        this.prevState = {}
    }

    subscribeCompontents(compontents) {
        this.prevState = this.store.getState()
        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if (!isEqual(this.prevState[key], state[key])) {
                    compontents.forEach(compontent => {
                     if (compontent.isWatching(key)) {
                         const changes = {[key]: state[key]}
                         compontent.storeChanged(changes)
                     }
                    })
                }
            })
            this.prevState = this.store.getState()
        })
    }
    unsubscribeFromStore() {
        this.sub.unsubscribe()
    }
}

export const useEventStore = defineStore('event', {
  state: () => ({
    events: []
  }),
  actions: {
    addEvent(event) {
      this.events.push(event)
    }
  },
  getters: {
    getEvents: (state) => state.events
  }
})
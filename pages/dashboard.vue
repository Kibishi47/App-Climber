<template>
    <div class="min-h-screen bg-gray-100">
        <Header title="Hello Julien !" />

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <h2 class="text-xl text-center mb-6">Prêt à s'amuser ?</h2>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <!-- Sessions widget -->
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Événements à venir</h3>
                            <ul class="divide-y divide-gray-200">
                                <li v-for="event in upcomingEvents" :key="event.id"
                                    class="py-3 flex justify-between items-center">
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">{{ event.spot.name }}</p>
                                        <p class="text-sm text-gray-500">{{ formatDateTime(event.date, event.time) }}
                                        </p>
                                    </div>
                                    <button @click="goToEventChat(event.id)"
                                        class="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition duration-300">
                                        <MessageCircle class="h-5 w-5" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Climb button -->
                    <div class="bg-white overflow-hidden shadow rounded-lg flex items-center justify-center">
                        <button @click="startClimbing"
                            class="bg-primary w-full h-full text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition duration-300">
                            Grimper
                        </button>
                    </div>

                    <!-- Map component -->
                    <div class="bg-white overflow-hidden shadow rounded-lg col-span-1 sm:col-span-2 lg:col-span-1">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Carte des spots</h3>
                            <Map :defaultSpot="defaultSpot" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { MessageCircle } from 'lucide-vue-next';
import { useEventStore } from '~/stores/eventStore.js'

const router = useRouter()
const eventStore = useEventStore()

const defaultSpot = ref({ name: "Rocher de l'Éléphant", lat: 48.8566, lng: 2.3522 })

const upcomingEvents = computed(() => {
    return eventStore.getEvents.slice().sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.time)
        const dateB = new Date(b.date + 'T' + b.time)
        return dateA - dateB
    })
})

const startClimbing = () => {
    router.push('/event/step1')
}

const goToEventChat = (eventId) => {
    router.push(`/event/${eventId}`)
}

const formatDateTime = (date, time) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(date + 'T' + time).toLocaleDateString('fr-FR', options)
}
</script>

<style scoped>
.bg-primary {
    background-color: #3490dc;
}

.bg-primary-dark {
    background-color: #2779bd;
}
</style>
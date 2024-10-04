<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
        <Header :title="'Discussion - ' + (event?.spot?.name ?? 'Chargement...')" />

        <main class="flex-grow flex flex-col max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
            <div class="flex-grow flex flex-col px-4 py-6 sm:px-0">
                <div
                    class="shrink flex-grow justify-between flex flex-col bg-white shadow sm:rounded-lg overflow-hidden">
                    <div class="px-4 py-5 shrink sm:p-6 flex flex-col h-full">
                        <h2 class="text-2xl font-bold mb-4">{{ event ? formatDateTime(event.date, event.time) :
                            'Chargement...' }}</h2>
                        <!-- Chat messages -->
                        <div class="overflow-y-auto shrink mb-4 flex flex-col space-y-4">
                            <div v-for="message in messages" :key="message.id" class="flex">
                                <div
                                    :class="['max-w-xs sm:max-w-md rounded-lg px-4 py-2', message.isCurrentUser ? 'ml-auto bg-primary text-white' : 'bg-gray-200']">
                                    <p class="font-bold">{{ message.userName }}</p>
                                    <p>{{ message.text }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Message input -->
                    <div class="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
                        <form @submit.prevent="sendMessage" class="flex">
                            <input v-model="newMessage" type="text" placeholder="Tapez votre message..."
                                class="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            <button type="submit"
                                class="bg-primary text-white font-bold py-2 px-4 rounded-r-md hover:bg-primary-dark transition duration-300">
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from '#app'
import { useEventStore } from '~/stores/eventStore'

const route = useRoute()
const eventStore = useEventStore()

const eventId = computed(() => route.params.id)
const event = ref(null)

onMounted(async () => {
    // Charger l'événement depuis le store
    try {
        event.value = await eventStore.getEventById(parseInt(eventId.value))
    } catch (error) {
        console.error(error)
    }

})

const messages = ref([
    { id: 1, userName: 'Alice', text: 'Salut tout le monde !', isCurrentUser: false },
    { id: 2, userName: 'Bob', text: 'Hey Alice, prête pour l\'escalade ?', isCurrentUser: false },
    { id: 3, userName: 'Vous', text: 'Bonjour à tous, j\'ai hâte de grimper !', isCurrentUser: true },
])

const newMessage = ref('')

const sendMessage = () => {
    if (newMessage.value.trim()) {
        messages.value.push({
            id: messages.value.length + 1,
            userName: 'Vous',
            text: newMessage.value,
            isCurrentUser: true
        })
        newMessage.value = ''
        // Faire défiler jusqu'au dernier message
        setTimeout(() => {
            const messageContainer = document.querySelector('.overflow-y-auto')
            if (messageContainer) {
                messageContainer.scrollTop = messageContainer.scrollHeight
            }
        }, 0)
    }
}

const formatDateTime = (date, time) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(date + 'T' + time).toLocaleDateString('fr-FR', options)
}
</script>

<style scoped>
.bg-primary {
    @apply bg-blue-600;
}

.bg-primary-dark {
    @apply bg-blue-700;
}
</style>
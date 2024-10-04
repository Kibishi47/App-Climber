<template>
    <div class="min-h-screen bg-gray-100">
        <Header title="Choisir la date et l'heure" />

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <h2 class="text-2xl font-bold mb-6">Étape 2 : Choisissez la date et l'heure</h2>

                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <form @submit.prevent="submitEvent" class="space-y-6">
                            <div>
                                <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                                <input type="date" id="date" v-model="date" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>

                            <div>
                                <label for="time" class="block text-sm font-medium text-gray-700">Heure</label>
                                <input type="time" id="time" v-model="time" required
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>

                            <div class="flex justify-end">
                                <button type="submit"
                                    class="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition duration-300">
                                    Créer l'événement
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>

const router = useRouter()
const route = useRoute()
const eventStore = useEventStore()

const date = ref('')
const time = ref('')
const selectedSpot = ref(null)

onMounted(() => {
    const spotParam = route.query.spot
    if (spotParam) {
        selectedSpot.value = JSON.parse(spotParam)
    }
})

const submitEvent = () => {
    const newEvent = {
        id: Date.now(), // Utiliser un ID unique pour chaque événement
        spot: selectedSpot.value,
        date: date.value,
        time: time.value
    }

    // Ajouter l'événement au store
    eventStore.addEvent(newEvent)

    // Rediriger vers le dashboard
    router.push('/dashboard')
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
<template>
    <div class="min-h-screen bg-gray-100">
        <Header title="Choisir un spot" />

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <h2 class="text-2xl font-bold mb-6">Étape 1 : Choisissez un spot pour grimper</h2>

                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <Map @spot-selected="selectSpot" :defaultSpot="defaultSpot" />
                    </div>
                </div>

                <div v-if="selectedSpot" class="mt-4 p-4 bg-green-100 rounded-lg">
                    <p class="text-green-800">Spot sélectionné : {{ selectedSpot.name }}</p>
                </div>

                <div class="mt-6 flex justify-end">
                    <button @click="goToStep2" :disabled="!selectedSpot"
                        class="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition duration-300 disabled:opacity-50">
                        Suivant
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>

const router = useRouter()
const selectedSpot = ref(null)
const defaultSpot = ref({ name: "Rocher de l'Éléphant", lat: 48.8566, lng: 2.3522 })

onMounted(() => {
    selectedSpot.value = defaultSpot.value
})

const selectSpot = (spot) => {
    selectedSpot.value = spot
}

const goToStep2 = () => {
    if (selectedSpot.value) {
        router.push({
            path: '/event/step2',
            query: { spot: JSON.stringify(selectedSpot.value) }
        })
    }
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
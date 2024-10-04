<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div>
                    <button @click="goToDashboard" class="mr-4 text-gray-600 hover:text-gray-900">
                        <HomeIcon class="h-6 w-6" />
                    </button>
                    <button @click="goToAccount" class="text-gray-600 hover:text-gray-900">
                        <UserIcon class="h-6 w-6" />
                    </button>
                </div>
                <h1 class="text-2xl font-bold text-gray-900">Hello Julien !</h1>
                <div></div> <!-- Empty div for flex spacing -->
            </div>
        </header>

        <!-- Main content -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <h2 class="text-xl text-center mb-6">Prêt à s'amuser ?</h2>

                <!-- Grid layout for widgets -->
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <!-- Current session widget -->
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Session en cours</h3>
                            <p class="text-gray-600">Aucune session en cours</p>
                        </div>
                    </div>

                    <!-- Climb button -->
                    <div class="bg-white overflow-hidden shadow rounded-lg flex items-center justify-center">
                        <button @click="startClimbing"
                            class="bg-primary text-white font-bold w-full h-full py-2 px-4 rounded hover:bg-primary-dark transition duration-300">
                            Grimper
                        </button>
                    </div>

                    <!-- Map placeholder -->
                    <div class="bg-white overflow-hidden shadow rounded-lg col-span-1 sm:col-span-2 lg:col-span-1">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Carte</h3>
                            <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                                <span class="text-gray-500">Carte en cours de chargement...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { HomeIcon, UserIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDashboard = () => {
    router.push('/dashboard')
}

const goToAccount = () => {
    router.push('/account')
}

const startClimbing = () => {
    // Implement climbing functionality here
    console.log('Starting climbing session...')
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
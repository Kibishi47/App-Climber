<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Entrez votre ID
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="submitId">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="id" class="sr-only">ID</label>
                        <input id="id" name="id" type="text" required v-model="id"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Entrez votre ID" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Soumettre
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const id = ref('')
const router = useRouter()

const submitId = () => {
    if (id.value.trim()) {
        // Rediriger vers une autre page avec l'ID comme paramètre
        router.push('/dashboard')
    }
}
</script>
<template>
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
            <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
            <div></div> <!-- Empty div for flex spacing -->
        </div>
    </header>
</template>

<script setup>
import { HomeIcon, UserIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

const router = useRouter()

const goToDashboard = () => {
    router.push('/dashboard')
}

const goToAccount = () => {
    router.push('/account')
}
</script>
<template>
    <div v-if="isClient">
        <div ref="mapContainer" class="h-64 w-full rounded-lg"></div>
    </div>
    <div v-else class="h-64 w-full rounded-lg bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">Chargement de la carte...</span>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'

const mapContainer = ref(null)
const map = shallowRef(null)
const isClient = ref(false)

onMounted(async () => {
    isClient.value = true

    // Chargement dynamique de Leaflet
    const L = await import('leaflet')

    // Création de la carte
    map.value = L.map(mapContainer.value).setView([48.8566, 2.3522], 13) // Coordonnées de Paris

    // Ajout de la couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value)

    // Ajout d'un marqueur
    L.marker([48.8566, 2.3522]).addTo(map.value)
        .bindPopup('Votre position actuelle')
        .openPopup()

    // Forcer la mise à jour de la taille de la carte
    setTimeout(() => {
        map.value.invalidateSize()
    }, 0)
})

onUnmounted(() => {
    if (map.value) {
        map.value.remove()
    }
})
</script>

<style>
@import 'leaflet/dist/leaflet.css';
</style>
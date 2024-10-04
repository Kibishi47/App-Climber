<template>
    <div v-if="isClient">
        <div ref="mapContainer" class="h-96 w-full rounded-lg"></div>
    </div>
    <div v-else class="h-96 w-full rounded-lg bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">Chargement de la carte...</span>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, shallowRef, watch } from 'vue'

const props = defineProps({
    defaultSpot: {
        type: Object,
        required: true
    }
})

const mapContainer = ref(null)
const map = shallowRef(null)
const isClient = ref(false)
const userMarker = shallowRef(null)
const spotMarkers = shallowRef({})

const emit = defineEmits(['spot-selected'])

// Spots d'escalade fictifs (à remplacer par des données réelles)
const climbingSpots = [
    { name: "Rocher de l'Éléphant", lat: 48.8566, lng: 2.3522 },
    { name: "Falaise du Dragon", lat: 48.8606, lng: 2.3376 },
    { name: "Mur de la Lune", lat: 48.8744, lng: 2.3526 },
    { name: "Bloc du Soleil", lat: 48.8417, lng: 2.3716 },
    { name: "Paroi de l'Aigle", lat: 48.8661, lng: 2.3242 }
]

onMounted(async () => {
    isClient.value = true

    const L = await import('leaflet')

    map.value = L.map(mapContainer.value).setView([props.defaultSpot.lat, props.defaultSpot.lng], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value)

    // Géolocalisation
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords

            // Marqueur de l'utilisateur
            userMarker.value = L.marker([latitude, longitude], {
                icon: L.divIcon({
                    className: 'user-marker',
                    html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>'
                })
            }).addTo(map.value)
                .bindPopup("Vous êtes ici")
        }, (error) => {
            console.error("Erreur de géolocalisation:", error.message)
        })
    }

    // Ajouter les spots d'escalade
    climbingSpots.forEach((spot) => {
        const marker = L.marker([spot.lat, spot.lng], {
            icon: L.divIcon({
                className: 'climbing-spot-marker',
                html: '<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>'
            })
        }).addTo(map.value)
            .bindPopup(spot.name)
            .on('click', () => {
                selectSpot(spot)
            })

        spotMarkers.value[spot.name] = marker
    })

    // Sélectionner le spot par défaut
    selectSpot(props.defaultSpot)

    setTimeout(() => {
        map.value.invalidateSize()
    }, 0)
})

function selectSpot(spot) {
    // Réinitialiser tous les marqueurs
    Object.values(spotMarkers.value).forEach(marker => {
        marker.setIcon(L.divIcon({
            className: 'climbing-spot-marker',
            html: '<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>'
        }))
    })

    // Mettre en évidence le spot sélectionné
    const selectedMarker = spotMarkers.value[spot.name]
    if (selectedMarker) {
        selectedMarker.setIcon(L.divIcon({
            className: 'climbing-spot-marker-selected',
            html: '<div class="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>'
        }))
        selectedMarker.openPopup()
    }

    emit('spot-selected', spot)
}

onUnmounted(() => {
    if (map.value) {
        map.value.remove()
    }
})
</script>

<style>
@import 'leaflet/dist/leaflet.css';

.user-marker {
    display: flex;
    justify-content: center;
    align-items: center;
}

.climbing-spot-marker,
.climbing-spot-marker-selected {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
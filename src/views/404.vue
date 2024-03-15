<template>
    <h1>Page not found!</h1>
    <p>Redirecting you to homepage in {{ seconds }} seconds</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const seconds = ref(3)

onMounted(() => {
    setInterval(() => {
        seconds.value--
        if (seconds.value == 0) {
            router.push({ path: '/' });
        }
    }, 1000)
});

</script>

<style></style>
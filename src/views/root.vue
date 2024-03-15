<template>
    <p>Loading...</p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

onMounted(() => {
    axios.get('/admin/admin/getInfo')
        .then((response) => {
            if (response.data.code == 1) {
                router.push({ path: '/dashboard' });
            } else {
                router.push({ path: '/login' });
            }

        })
        .catch(() => {
            router.push({ path: '/login' });

        })
});

</script>

<style></style>
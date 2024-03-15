<template>
    <div id="page">
        <div id="loginCard">
            <h2>登录 - <i>Book思益</i></h2>
            <el-form :model="loginForm" @keydown.enter.native="login">
                <el-form-item label="用户名" prop="acount" size="large">
                    <el-input v-model="loginForm.acount" />
                </el-form-item>
                <el-form-item label="密　码" prop="password" size="large">
                    <el-input type="password" v-model="loginForm.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login" style="width: 80%; margin: 10px auto;">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const loginForm = ref({
    acount: '',
    password: ''
});

function login() {
    axios.post('/admin/admin/login', loginForm.value)
        .then((response) => {
            if (response.data.code == 1) {
                localStorage.setItem("token", response.data.data.token);
                axios.defaults.headers.common['token'] = localStorage.getItem("token")
                router.push({ path: '/dashboard' });
            } else {
                console.log(response.data);
            }
        })
};
</script>

<style>
#page {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('/images/loginBG.jpg');
    background-size: cover;
    background-position: 50% 75%;
}

#loginCard {
    position: absolute;
    top: 50%;
    right: 18%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 36px 44px 16px;
    z-index: 100;
}

h2 {
    text-align: center;
    margin: 0 0 30px;
}
</style>
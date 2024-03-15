<template>
    <el-form :model="formData" :rules="formRules" ref="loginForm">
        <el-form-item label="Date" prop="date">
            <el-date-picker v-model="formData.date" type="date" placeholder="Select date"></el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { ref } from 'vue';

// Form data
const formData = ref({
    date: null,
});

// Custom validation function to check if the date is in the future
const validateFutureDate = (rule, value, callback) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        callback(new Error('Please select a future date'));
    } else {
        callback();
    }
};

// Form validation rules
const formRules = {
    date: [
        { required: true, message: 'Please select a date', trigger: 'change' },
        { validator: validateFutureDate, trigger: 'change' }
    ]
};

// Method to submit the form
const submitForm = () => {
    // Trigger form validation
    const formRef = $refs.loginForm;
    formRef.validate((valid) => {
        if (valid) {
            // Form is valid, submit it
            console.log('Form submitted successfully:', formData.value);
        } else {
            // Form is invalid, do something (e.g., display error message)
            console.log('Form validation failed');
        }
    });
};
</script>
  
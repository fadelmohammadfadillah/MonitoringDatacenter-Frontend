<template>
    <div>
      <v-form ref="form" validate-on="submit" @submit.prevent="submit">
        <v-card
            class="mx-auto pa-10"
            elevation="4"
            max-width="80%"
            rounded="lg"
        >
            <div class="text-h4 font-weight-bold pb-4">Login</div>
            <div class="text-body-1 font-weight-regular pb-4">Selamat datang kembali 👋🏻. Silahkan login ke akun Anda.</div>
            <!-- Username Field -->
            <div class="text-caption font-weight-bold">Username</div>
            <v-text-field
                v-model="credential.username"
                placeholder="username123"
                :rules="usernameRules"
                required
                rounded="lg"
                variant="outlined"
                density="compact"
                clearable
            ></v-text-field>
    
            <!-- Kata Sandi Field -->
            <div class="text-caption font-weight-bold ">
                Kata Sandi
            </div>
            <v-text-field
                v-model="credential.password"
                :rules="passwordRules"
                :append-inner-icon="visible ?  'mdi-eye': 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                rounded="lg"
                placeholder="••••••••••"
                variant="outlined"
                @click:append-inner="visible = !visible"
                density="compact"
            ></v-text-field>

            <!-- Lupa Kata Sandi Tag -->
            <a
                class="text-caption text-decoration-none text-orange"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
            >
            Lupa Kata Sandi?</a>
            
            <!-- Login Button -->
            <v-btn
                :loading="loading"
                class="mb-8 font-weight-medium text-button"
                color="orange"
                size="large"
                block
                type="submit"
            >
                <p class="text-white">Login</p>
            </v-btn>
            <!-- Sign Up Tag -->
            <v-card-text class="text-center">
            <p>Belum memiliki akun? <a
                class="text-orange text-decoration-none"
                rel="noopener noreferrer"
                target="_blank"
            >
                Sign up
            </a></p>
            
            </v-card-text>
        </v-card>
      </v-form>
    </div>
  </template>
<script setup>
import { ref, toRaw } from 'vue';
import authService from '@/services/AuthService';
import { useRouter } from 'vue-router';
const loading = ref(false);
const credential = ref({
    username: "",
    password: "",
});
const visible = ref(false);
const form = ref(null);
const timeout = ref(null);
const router = useRouter();

const usernameRules = [
  v => !!v || 'Username is required',
];

const passwordRules = [
  v => !!v || 'Password is required',
];

const submit = async (event) => {
  const isValid = await form.value?.validate();
  if (!isValid.valid) {
    return;
  }

  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  loading.value = false;
  const result = await authService.login(toRaw(credential.value));
  console.log(result);
  if (result === true) {
    router.push({name: 'UserManagementTable'});
  } else {
    alert(JSON.stringify({ message: 'Username atau Password salah!' }));
  }
};
</script>
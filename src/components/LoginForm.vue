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
            <!-- Email Field -->
            <div class="text-caption font-weight-bold">Email</div>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                placeholder="email@example.com"
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
                v-model="password"
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
<script>
    import {defineComponent, ref} from 'vue'
    export default defineComponent({
        name:'LoginForm',
        setup(){
            const loading = ref(false)
            const email = ref('')
            const password = ref('')
            const visible = ref(false)
            const form = ref(null)
            const timeout = ref(null)

            const emailRules = [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
            ]

            const passwordRules = [
                v => !!v || 'Password is required'
            ]

            const checkApi = (email, password) => {
                return new Promise(resolve =>{
                    if(timeout.value !== null){
                        clearTimeout(timeout.value)
                    }
                    // console.log(email, password)
                    timeout.value = setTimeout(() => {
                        if(email === "admin@mail.com" && password === "admin"){
                            resolve(true)
                        }else{
                            resolve(false)
                        }
                    }, 1000)
                })
            }

            const submit = async (event) =>{
                const isValid = await form.value?.validate()
                // console.log(isValid.valid)
                if(!isValid.valid){
                    return
                }

                loading.value = true
                await new Promise(resolve=>setTimeout(resolve, 1000))
                loading.value = false
                const result = await checkApi(email.value, password.value)
                // console.log('result=' + result)
                if (result === true){
                    alert(JSON.stringify({message: 'login berhasil!'}))
                }else{
                    alert(JSON.stringify({message: 'Email atau Password salah!'}))
                }
            }

            return {
                loading,
                email,
                password,
                visible,
                emailRules,
                passwordRules,
                submit,
                form,
            }
        }
    });
</script>
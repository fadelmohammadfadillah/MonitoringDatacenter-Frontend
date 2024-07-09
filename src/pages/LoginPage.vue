<template>
    <v-main class="position-relative" style="z-index: 0;">
        <v-row>
            <v-col cols="12" md="5" class="d-flex justify-center align-center">
                <LoginForm/>
            </v-col>
            <v-col cols="12" md="7" class="d-flex justify-center align-center">
                <v-img
                    src="../assets/bg-transparent.png"
                    cover
                    rounded="lg"
                    max-height="100vh"
                ></v-img>
                <v-img
                    src="../assets/Logo-Collega.png"
                    class="position-absolute collega-logo"
                    style="z-index: 5;"
                    min-width="10%"
                    min-height="10%"
                ></v-img>
                <v-img
                    src="../assets/Checklist-bro.png"
                    class="position-absolute"
                    style="z-index: 5;"
                    min-width="30%"
                    min-height="30%"
                ></v-img>
                <div
                    class="position-absolute app-name-text text-h4 font-weight-medium"
                    style="z-index: 5;"
                >Checklist Status Monitoring</div>
                <div
                    class="position-absolute app-name-sub-text text-h5 font-weight-regular"
                    style="z-index: 5;"
                >Switching-724 ATM</div>
            </v-col>
        </v-row>
    </v-main>
        
</template>

<script setup>
    import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped>
    .collega-logo{
        top: 5%;
        right: 3%;
    }
    .app-name-text{
        top: 80%;
    }
    .app-name-sub-text{
        top: 85%;
    }
</style>

  
<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import useNotificationStore from '~/stores/notifications';
    import { NotificationsTypes } from '~/types/notification';
    import type { PersonalUser } from '~/types/user';

    const login = ref('');
    const password = ref('');
    const passwordIsVisible = ref(false);

    const notificationsStore = useNotificationStore();
    const userStore = useUserStore();

    async function handleLogin() {
    try {

        const body = await $fetch<{ user: PersonalUser }>('http://localhost:3100/auth/login', {
            method: "POST",
            body: {
                login: login.value,
                password: password.value,
            },
            credentials: 'include'
        });

        console.log('Успех:', body);
        userStore.setUser(body.user);
        
    } catch (err: any) {
        console.error('Ошибка логина:', err);

        notificationsStore.createNotification(NotificationsTypes.error, { 
            title: "Login error", 
            message: err.data?.message || "Check your credentials",
            additional: "zed31rus.ru" 
        });
    }
}

</script>

<template>
    <div>
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-2xl font-semibold text-white/90 tracking-tight">Sign in</h1>
                <p class="text-sm text-white/40 mt-1">Return to our community</p>
            </div>
            <div class="w-1.5 h-12 rounded-full bg-cyan-600"></div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">

            <div class="space-y-2">
                <label class="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Login</label>
                <input v-model="login" placeholder="Enter your login"
                    class="w-full bg-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 
                    focus:outline-none focus:ring-2 focus:ring-cyan-600/50 focus:bg-white/10 transition-all duration-300"
                    required />
            </div>

            <div class="space-y-2">
                    <label class="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Password</label>
                <div class="relative">
                    <input v-model="password" :type="passwordIsVisible ? 'text' : 'password'" :placeholder="passwordIsVisible? 'My strong password !' : '••••••••'"
                        class="w-full bg-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 
                        focus:outline-none focus:ring-2 focus:ring-cyan-600/50 focus:bg-white/10 transition-all duration-300"
                        required />
                        <button @click="passwordIsVisible = !passwordIsVisible" type="button" class="absolute right-4 top-[24px] -translate-y-[50%]"> <Icon :icon="passwordIsVisible ? 'mdi:eye' : 'mdi:eye-closed'"/> </button>
                </div>
            </div>

            <div class="pt-4">
                <button type="submit"
                    class="w-full py-3 px-4 bg-cyan-600/20 hover:bg-white/20 text-cyan-400 font-semibold uppercase tracking-wider text-sm rounded-xl transition-all active:scale-[0.98] duration-200">
                    Sign In
                </button>
            </div>

        </form>

        <div class="mt-6 text-center">
            <p class="text-sm text-white/40">
                Don't have an account? 
                <button 
                    @click="$emit('switch')" 
                    type="button"
                    class="text-cyan-400 hover:text-cyan-300 font-medium transition-colors ml-1"
                >
                    Create one
                </button>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import useNotificationStore from '~/stores/notifications';
    import { NotificationsTypes } from '~/types/notification';
import type { PublicUser } from '~/types/user';

    const usernamePlaceholderInitialState = 'Choose a name';

    const login = ref('');
    const username = ref('');
    const usernamePlaceholder = ref(usernamePlaceholderInitialState);
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const passwordIsVisible = ref(false);
    const confirmPasswordIsVisible = ref(false);


    watch(login, (newState, oldState) => {
        if (usernamePlaceholder.value === oldState || usernamePlaceholder.value.length === 0 || usernamePlaceholder.value == usernamePlaceholderInitialState) {
            usernamePlaceholder.value = newState
        };
        if (newState.length == 0) {
            usernamePlaceholder.value = usernamePlaceholderInitialState;
        }
    });

    const notificationStore = useNotificationStore();

    async function handleRegister() {
        if (password.value !== confirmPassword.value) {
            notificationStore.createNotification(NotificationsTypes.error, { title: 'Registration error', message: 'Passwords do not match', additional: 'zed31rus.ru'} );
            return;
        }

        if (usernamePlaceholder.value == usernamePlaceholderInitialState) return

        const formLogin = login.value;
        const formNickname = username.value || usernamePlaceholder.value;
        const formPassword = password.value;
        const formEmail = email.value;

        const res = await fetch('http://localhost:3100/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: formLogin,
                email: formEmail,
                password: formPassword,
                nickname: formNickname
            })
        });

        if (!res.ok) notificationStore.createNotification(NotificationsTypes.error, { title: "Registration error", message: "error while registration", additional: "zed31rus.ru" })

        const body = await res.json() as { user:  PublicUser};

        console.log(body)

    };

</script>

<template>
    <div>

        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-2xl font-semibold text-white/90 tracking-tight">Create Account</h1>
                <p class="text-sm text-white/40 mt-1">Join our community today</p>
            </div>
            <div class="w-1.5 h-12 rounded-full bg-emerald-600"></div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">

            <div class="space-y-2">
                <label class="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Login</label>
                <input v-model="login" type="text" placeholder="Choose a name"
                    class="w-full bg-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 
                    focus:outline-none focus:ring-2 focus:ring-emerald-600/50 focus:bg-white/10 transition-all duration-300"
                    required />
            </div>

            <div class="space-y-2">
                <label class="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Username</label>
                <div class="relative h-12">
                    <input v-model="username" :placeholder="usernamePlaceholder" type="text"
                        class="w-full bg-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 
                        focus:outline-none focus:ring-2 focus:ring-emerald-600/50 focus:bg-white/10 transition-all duration-300"
                        />
                </div>
            </div>

            <div class="space-y-2">
                <label class="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Email</label>
                <input v-model="email" type="email" placeholder="your@email.com"
                    class="w-full bg-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 
                    focus:outline-none focus:ring-2 focus:ring-emerald-600/50 focus:bg-white/10 transition-all duration-300"
                    required />
            </div>

            <div class="space-y-2">
                <label class="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Password</label>
                <div class="relative h-12">
                    <input v-model="password" :type="passwordIsVisible ? 'text' : 'password'" :placeholder="passwordIsVisible ? 'My strong password !' : '••••••••'"
                        class="w-full bg-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 
                        focus:outline-none focus:ring-2 focus:ring-emerald-600/50 focus:bg-white/10 transition-all duration-300"
                        required />
                    <button type="button" @click="passwordIsVisible = !passwordIsVisible" class="absolute right-4 top-[24px] -translate-y-[50%]"> <Icon :icon="passwordIsVisible ? 'mdi:eye' : 'mdi:eye-closed'"/> </button>
                </div>
            </div>

            <div class="space-y-2">
                <label class="text-xs font-medium text-white/50 uppercase tracking-widest ml-1">Confirm Password</label>
                <div class="relative h-12">
                    <input v-model="confirmPassword" :type="confirmPasswordIsVisible ? 'text' : 'password'" :placeholder="confirmPasswordIsVisible ? 'My strong password !' : '••••••••'"
                        class="w-full bg-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 
                        focus:outline-none focus:ring-2 focus:ring-emerald-600/50 focus:bg-white/10 transition-all duration-300"
                        required />
                    <button type="button" @click="confirmPasswordIsVisible = !confirmPasswordIsVisible" class="absolute right-4 top-[24px] -translate-y-[50%]"> <Icon :icon="confirmPasswordIsVisible ? 'mdi:eye' : 'mdi:eye-closed'"/> </button>
                </div>
            </div>

            <div class="pt-4">
                <button type="submit"
                    class="w-full py-3 px-4 bg-emerald-600/20 hover:bg-white/20 text-emerald-400 font-semibold uppercase tracking-wider text-sm rounded-xl transition-all active:scale-[0.98] duration-200">
                    Get Started
                </button>
            </div>

        </form>

        <div class="mt-6 text-center">
            <p class="text-sm text-white/40">
                Already have an account? 
                <button 
                    @click="$emit('switch')" 
                    type="button"
                    class="text-emerald-400 hover:text-emerald-300 font-medium transition-colors ml-1"
                >
                Sign in
                </button>
            </p>
        </div>

    </div>
</template>
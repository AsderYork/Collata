<template>
    <div>
        <NuxtLoadingIndicator />
        <header class="bg-dark text-white">
            <div>
                <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="d-flex">
                        <a href="/boards" class="d-flex align-items-center text-white text-decoration-none">
                        <div class="btn bg-light px-1 py-0 rounded-start-0">
                            <img src="/favicon.ico" style="height: 30px;">
                        </div>
                    </a>

                    </div>
                   
                    <div class="d-flex">
                        <div class="text-end d-flex">
                            <div class="d-flex">
                                <div class="border rounded rounded-end-0 px-2 d-flex">{{ username }}</div>
                                <button type="button" class="btn btn-sm btn-outline-light rounded-start-0 rounded-end-0" title="Log out" @click.prevent="signOut( {callbackUrl:'/auth'})">
                                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>

        <slot />
    </div>
</template>

<script setup>


const { data, signOut } = useAuth()
const username = ref(data?.value?.name)


</script>

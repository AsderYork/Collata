<style>
html, body {
    height: 100%;
    background: linear-gradient(180deg, rgb(27, 27, 27) 0%, rgba(22,19,23,1) 96%, rgba(34,29,38,1) 100%);
}
</style>

<template>
    <div>
        <NuxtLoadingIndicator />
        <header class="py-1 bg-dark text-white">
            <div class="mx-2">
                <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="d-flex">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <div class="btn bg-light px-1 py-0">
                            <img src="/favicon.ico" style="height: 30px;">
                        </div>
                    </a>

                    </div>
                   
                    <div class="d-flex">

                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" class="form-control form-control-sm form-control-dark"
                                placeholder="Search..." aria-label="Search">
                        </form>

                        <div class="text-end d-flex">
                            <div class="d-flex">
                                <div class="border rounded rounded-end-0 px-2 d-flex">{{ username }}</div>
                                <button type="button" class="btn btn-sm btn-outline-light me-2 rounded-start-0" @click.prevent="signOut( {callbackUrl:'/auth'})">
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

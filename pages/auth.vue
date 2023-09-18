<style>
body { 
    background: black;
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(240,165,255,0.4514180672268907) 0%, rgba(77,39,138,0.29735644257703087) 22%, rgba(198,102,102,0.1825105042016807) 47%, rgba(198,102,102,0) 75%);
}
</style>
<template>
    
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <form class="card-body p-5 py-2  text-center" method="post" @submit.prevent="attemptSignIn()">

                            <div>
                                <h1 class="fw-bold mb-0 text-uppercase">Lowball</h1>
                                <h5 class="fw-bold mb-2 text-uppercase border-top">Take your tasks and move 'em around</h5>

                                <div v-if="!isLoading" class="mt-md-4">

                                    <div class="form-outline form-white mb-4 mt-5">
                                        <input type="text" id="typeEmailX" class="form-control form-control-lg" name="login" v-model="login"/>
                                        <label class="form-label" for="typeEmailX" >Login/Email</label>
                                    </div>

                                    <div class="form-outline form-white">
                                        <input type="password" id="typePasswordX" class="form-control form-control-lg" name="pasword" v-model="password"/>
                                        <label class="form-label mb-0" for="typePasswordX">Password</label>
                                        <div>
                                            <small class="text-danger">{{ lastError }}</small>
                                        </div>
                                    </div>

                                    <p class="small mb-5 pb-lg-2">
                                        <a class="text-white-50" href="#!">Forgot password?</a>
                                    </p>

                                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    <div>
                                        <p class="mb-0 mt-1">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mb-2 mt-3" v-if="isLoading">
                            <div class="spinner-border" role="status" style="width: 5rem; height: 5rem;">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>

const { signIn } = useAuth()

const login = ref();
const password = ref();
const lastError = ref();
const isLoading = ref(false);


definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  }
});

async function attemptSignIn() {
    isLoading.value = true;

    try {
        const signInObj = {login:login.value, password:password.value};
        var res = await signIn(signInObj, {callbackUrl:'/'});
    } catch(exception) {
        lastError.value = exception.statusMessage; 
    }
    
    isLoading.value = false;

}


</script>

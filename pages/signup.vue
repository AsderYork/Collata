<style>
html {
    background: #505050;
}
body { 
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(240,165,255,0.4514180672268907) 0%, rgba(77,39,138,0.29735644257703087) 22%, rgba(198,102,102,0.1825105042016807) 47%, rgba(198,102,102,0) 75%);
}
</style>
<template>
    
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <form class="card-body p-5 py-2  text-center" method="post" @submit.prevent="attemptSignUp()">

                            <div>
                                <h1 class="fw-bold mb-0 text-uppercase">Collata</h1>
                                <h5 class="fw-bold mb-2 text-uppercase border-top">Take your tasks and move 'em around</h5>

                                <div v-if="!isLoading" class="mt-md-4">

                                    <div>
                                        <h2>Create new account</h2>
                                    </div>

                                    <div class="form-outline form-white mb-4 ">
                                        <input type="text" id="typeEmailX" class="form-control form-control" name="login" v-model="login"/>
                                        <label class="form-label" for="typeEmailX" >Login</label>
                                    </div>

                                    <div class="form-outline form-white mb-4 ">
                                        <input type="text" id="typeEmailX" class="form-control form-control" name="login" v-model="name"/>
                                        <label class="form-label" for="typeEmailX" >Name</label>
                                    </div>

                                    <div class="form-outline form-white  pb-lg-2 mb-4">
                                        <input type="password" id="typePasswordX" class="form-control form-control" name="pasword" v-model="password"/>
                                        <label class="form-label mb-0" for="typePasswordX">Password</label>
                                    </div>

                                    <div class="form-outline form-white  pb-lg-2">
                                        <input type="password" id="typeRepeatPasswordX" class="form-control form-control" v-model="repeatPassword"/>
                                        <label class="form-label mb-0" for="typeRepeatPasswordX">Repeat password</label>
                                    </div>

                                    
                                    <div class="mb-5" v-if="lastError">
                                        <small class="text-danger">{{ lastError }}</small>
                                    </div>


                                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Create new account</button>
                                    <div>
                                        <a href="/auth"><small>Allready have an account? Sign in then</small></a>
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

const { signUp } = useAuth()

const name = ref();
const login = ref();
const password = ref();
const lastError = ref();
const repeatPassword = ref();
const isLoading = ref(false);

watch(login, (next, prev) => {
    if(name.value == prev) {
        name.value = next;
    }
})



definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  }
});

async function attemptSignUp() {
    isLoading.value = true;

    if(login.value == null) {
        lastError.value = 'Login cannot be empty';
    }

    if(password.value == null) {
        lastError.value = 'Password cannot be empty';
    }

    try {
        const signInObj = {login:login.value, password:password.value};
        var res = await signUp(signInObj, {callbackUrl:'/boards'});
    } catch(exception) {
        lastError.value = exception.statusMessage; 
    }
    
    isLoading.value = false;

}


</script>

<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Accountify</span>
      <div class="input-field">
        <input 
          id="email" 
          type="text" 
          v-model.trim="email" 
          :class="{ invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid) }"
          />
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-if="v$.email.$dirty && v$.email.required.$invalid"
        >
          This field is required
        </small>
        <small 
          class="helper-text invalid"
          v-else-if="v$.email.$dirty && v$.email.email.$invalid"
        >
          Given email is invalid
        </small>
      </div>
      <div class="input-field">
        <input 
          id="password" 
          type="password" 
          v-model.trim="password"
          :class="{ invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid) }" 
        />
        <label for="password">Password</label>
        <small 
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.required.$invalid"
        >
          Enter password
        </small>
        <small 
          class="helper-text invalid"
          v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
        >
          Minimum password length - {{ v$.password.minLength.$params.min }}. Given - {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Log in
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        New here?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
  name: 'login',
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  },
  methods: {
    submitHandler() {
      if(this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
      this.$router.push('/')
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
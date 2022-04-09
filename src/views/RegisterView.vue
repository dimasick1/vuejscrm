<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Accountify</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              (v$.email.$dirty && v$.email.required.$invalid) ||
              (v$.email.$dirty && v$.email.email.$invalid),
          }"
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
          :class="{
            invalid:
              (v$.password.$dirty && v$.password.required.$invalid) ||
              (v$.password.$dirty && v$.password.minLength.$invalid),
          }"
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
          Minimum password length - {{ v$.password.minLength.$params.min }}.
          Given - {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: v$.name.$dirty && v$.name.required.$invalid,
          }"
        />
        <label for="name">Name</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.required.$invalid"
        >
          Enter your name
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span :class="{ invalid: v$.agree.$dirty && v$.agree.checked.$invalid }">
            I've had russian baby for breakfast today
          </span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Sign up
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Been here?
        <router-link to="/login">Log In!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";

export default {
  name: "register",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(8) },
      name: { required },
      agree: { checked: v => v },
    };
  },
  methods: {
    submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      console.log(formData);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
span.invalid {
  color: #f44336;
  &:before {
    border-color: #f44336;
  }
}
</style>

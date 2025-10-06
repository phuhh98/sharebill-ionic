<template>
  <ion-page>
    <ion-header id="header">
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form
        @submit.prevent="handleLoginFormSubmit"
        class="tw:w-full tw:h-full tw:flex tw:flex-col tw:pt-12 tw:gap-2 tw:px-2"
      >
        <ion-input
          label="Username"
          v-model="username"
          class="userinput"
          :required="true"
          type="email"
          @ion-blur="onUsernameBlur"
          error-text="Please enter a valid email address."
        ></ion-input>
        <ion-input
          type="password"
          label="Password"
          v-model="password"
          class="userinput"
          :required="true"
          error-text="Password must be 8-20 characters long and include at least one letter, one number, and one special character."
          @ionBlur="onPasswordBlur"
        >
          <ion-input-password-toggle slot="end"></ion-input-password-toggle>
        </ion-input>
        <ion-button type="submit" expand="block">Login</ion-button>
        <ion-button
          expand="block"
          color="light"
          @click.prevent="router.push('/signup')"
          >Sign Up</ion-button
        >
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonInputCustomEvent } from "@ionic/core";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { useRouter } from "vue-router";

import { signInWithEmailAndPassWord } from "@/firebase/auth";
import { composeIonInputValidate, markIonTouched } from "@/lib/ionEvents";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@/lib/patterns";
import { useToastStore } from "@/stores/toast";

const router = useRouter();

const username = defineModel<string>("username");
const password = defineModel<string>("password");

const toastStore = useToastStore();

enum ToastMessage {
  LOGIN_FAIL = "Login failed. Please try again.",
  LOGIN_SUCCESS = "Login successful!",
  SAFE = "",
}

const handleLoginFormSubmit = async () => {
  if (!username.value || !password.value) {
    return;
  }
  try {
    await signInWithEmailAndPassWord(username.value, password.value);
    toastStore.showToast({
      message: ToastMessage.LOGIN_SUCCESS,
      safe: true,
    });
    router.push("/");
    return;
  } catch (err) {
    toastStore.showToast({
      message: ToastMessage.LOGIN_FAIL,
      safe: false,
    });
    return;
  }
};

const validatePassword = (password: string) => {
  return PASSWORD_PATTERN.test(password);
};

const validateEmail = (email: string) => {
  return EMAIL_PATTERN.test(email);
};
const onPasswordBlur = (event: IonInputCustomEvent<FocusEvent>) => {
  markIonTouched(event);
  composeIonInputValidate(validatePassword)(event);
};

const onUsernameBlur = (event: IonInputCustomEvent<FocusEvent>) => {
  markIonTouched(event);
  composeIonInputValidate(validateEmail)(event);
};
</script>

<style>
ion-input.userinput {
  --border-radius: 8px;
  --highlight-color-focus: red;
  --background: var(--color-gray-100);
  --padding-end: 1rem;
  --padding-start: 1rem;
  --background: var(--tw-color-gray-100);
}
</style>

<template>
  <ion-page>
    <ion-header id="header">
      <ion-toolbar>
        <ion-title>Sign up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form
        @submit.prevent="handleSignUpFormSubmit"
        class="tw:w-full tw:h-full tw:flex tw:flex-col tw:pt-10 tw:gap-2 tw:px-2"
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
        <ion-input
          type="password"
          label="Retype password"
          v-model="retypePassword"
          class="userinput"
          :required="true"
          error-text="Passwords do not match."
          @ionBlur="onRetypePasswordBlur"
        >
          <ion-input-password-toggle slot="end"></ion-input-password-toggle>
        </ion-input>
        <ion-button type="submit" expand="block">Sign Up and Login</ion-button>
      </form>

      <app-toast></app-toast>
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

import AppToast from "@/components/AppToast.vue";
import {
  signInWithEmailAndPassWord,
  signUpWithEmailAndPassWord,
} from "@/firebase/auth";
import { composeIonInputValidate, markIonTouched } from "@/lib/ionEvents";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@/lib/patterns";
import { useToastStore } from "@/stores/toast";

const router = useRouter();

const username = defineModel<string>("username");
const password = defineModel<string>("password");
const retypePassword = defineModel<string>("retypePassword");

const toastStore = useToastStore();

enum ToastMessage {
  LOGIN_FAIL = "Login failed. Please try again.",
  LOGIN_SUCCESS = "Login successful!",
  SAFE = "",
  SIGNUP_FAIL = "Sign up failed. Please try again.",
  SIGNUP_SUCCESS = "Sign up successful!",
}

const handleSignUpFormSubmit = async () => {
  if (!username.value || !password.value) {
    return;
  }

  try {
    await signUpWithEmailAndPassWord(username.value, password.value);
    toastStore.showToast({
      message: ToastMessage.SIGNUP_SUCCESS,
      safe: true,
    });

    router.push("/");
  } catch (err) {
    toastStore.showToast({
      message: ToastMessage.SIGNUP_FAIL,
      safe: false,
    });
  }

  try {
    await signInWithEmailAndPassWord(username.value, password.value);
    toastStore.showToast({
      message: ToastMessage.LOGIN_SUCCESS,
      safe: true,
    });
  } catch (err) {
    toastStore.showToast({
      message: ToastMessage.LOGIN_FAIL,
      safe: false,
    });
  }
};

const validatePassword = (password: string) => {
  return PASSWORD_PATTERN.test(password);
};

const validateEmail = (email: string) => {
  return EMAIL_PATTERN.test(email);
};

const validateRetypePassword = (retypePassword: string) => {
  return retypePassword === password.value;
};
const onPasswordBlur = (event: IonInputCustomEvent<FocusEvent>) => {
  markIonTouched(event);
  composeIonInputValidate(validatePassword)(event);
};

const onUsernameBlur = (event: IonInputCustomEvent<FocusEvent>) => {
  markIonTouched(event);
  composeIonInputValidate(validateEmail)(event);
};

const onRetypePasswordBlur = (event: IonInputCustomEvent<FocusEvent>) => {
  markIonTouched(event);
  composeIonInputValidate(validateRetypePassword)(event);
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

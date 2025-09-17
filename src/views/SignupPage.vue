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

      <ion-toast
        :is-open="toast.isOpen"
        :message="toast.message"
        :duration="2500"
        @didDismiss="toastDismiss"
        :color="toast.safe ? 'success' : 'danger'"
        swipe-gesture="vertical"
        position-anchor="header"
        position="top"
      ></ion-toast>
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
  IonToast,
  IonToolbar,
} from "@ionic/vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

import {
  signInWithEmailAndPassWord,
  signUpWithEmailAndPassWord,
} from "@/firebase/auth";
import { composeIonInputValidate, markIonTouched } from "@/lib/ionEvents";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@/lib/patterns";

const router = useRouter();

const username = defineModel<string>("username");
const password = defineModel<string>("password");
const retypePassword = defineModel<string>("retypePassword");

enum ToastMessage {
  LOGIN_FAIL = "Login failed. Please try again.",
  LOGIN_SUCCESS = "Login successful!",
  SAFE = "",
  SIGNUP_FAIL = "Sign up failed. Please try again.",
  SIGNUP_SUCCESS = "Sign up successful!",
}

const toast = reactive<{
  isOpen: boolean;
  message: string | ToastMessage;
  safe: boolean;
}>({
  isOpen: false,
  message: ToastMessage.SAFE,
  safe: true,
});

const toastDismiss = () => {
  toast.isOpen = false;
  toast.message = "";
  toast.safe = true;
};
const handleSignUpFormSubmit = async () => {
  if (!username.value || !password.value) {
    return;
  }

  try {
    await signUpWithEmailAndPassWord(username.value, password.value);
    toast.isOpen = true;
    toast.message = ToastMessage.SIGNUP_SUCCESS;
    toast.safe = true;

    router.push("/");
  } catch (err) {
    toast.isOpen = true;
    toast.message = ToastMessage.SIGNUP_FAIL;
    toast.safe = false;
  }

  try {
    await signInWithEmailAndPassWord(username.value, password.value);
    toast.isOpen = true;
    toast.message = ToastMessage.LOGIN_SUCCESS;
    toast.safe = true;
  } catch (err) {
    toast.isOpen = true;
    toast.message = ToastMessage.LOGIN_FAIL;
    toast.safe = false;
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

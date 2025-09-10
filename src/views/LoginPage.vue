<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="w-full h-full pt-12 px-4">
        <form @submit.prevent="handleLoginFormSubmit">
          <ion-input
            label="Username"
            v-model="username"
            class="userinput"
          ></ion-input>
          <br />
          <ion-input
            type="password"
            label="Password"
            v-model="password"
            class="userinput"
          >
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
          </ion-input>
          <br />
          <ion-button type="submit" expand="block">Login</ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  IonHeader,
  IonToolbar,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonTitle,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonContent,
} from "@ionic/vue";
import { cloudUpload, receipt, calculator, personAdd } from "ionicons/icons";
import { signInWithEmailAndPassWord } from "@/firebase/auth";

const router = useRouter();

const username = defineModel<string>("username");
const password = defineModel<string>("password");

const handleLoginFormSubmit = (event: SubmitEvent) => {
  console.log(username, password);
  if (!username.value || !password.value) {
    return;
  }
  signInWithEmailAndPassWord(username.value, password.value)
    .then(() => {
      console.log("Login succeed");
      router.push("/");
    })
    .catch((err) => {
      console.log("login fail", err);
    });
};
</script>

<style>
ion-input.userinput {
  --border-radius: 8px;
  --highlight-color-focus: red;
  --background: var(--color-gray-100);
  --padding-end: 1rem;
  --padding-start: 1rem;
}
</style>

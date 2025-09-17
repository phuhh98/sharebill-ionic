import { IonInputCustomEvent } from "@ionic/core";

export const markIonTouched = (event: IonInputCustomEvent<Event>) => {
  event.target.classList.add("ion-touched");
};

export const composeIonInputValidate = (
  validateFn: (value: string) => boolean
) => {
  return (event: IonInputCustomEvent<Event>) => {
    const value = event.target.value;

    event.target.classList.remove("ion-valid");
    event.target.classList.remove("ion-invalid");

    if (!value) return;

    validateFn(value.toString())
      ? event.target.classList.add("ion-valid")
      : event.target.classList.add("ion-invalid");
  };
};

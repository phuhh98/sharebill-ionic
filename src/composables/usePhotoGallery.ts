import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { ref } from "vue";

const photos = ref<TakenPhoto[]>([]);

export interface TakenPhoto {
  filename: string;
  format: string;
  webviewPath?: string;
}

export const usePhotoGallery = () => {
  const takePhoto = async () => {
    const permissions = await Camera.checkPermissions();

    if (Capacitor.getPlatform() !== "web" && permissions.camera !== "granted") {
      await Camera.requestPermissions();
    }

    try {
      const photo = await Camera.getPhoto({
        allowEditing: Capacitor.getPlatform() === "web" ? false : true,
        quality: 100,
        resultType: CameraResultType.Uri,
        source:
          Capacitor.getPlatform() === "web"
            ? CameraSource.Prompt
            : CameraSource.Camera,
      });

      const fileName = Date.now() + photo.format;
      const savedFileImage: TakenPhoto = {
        filename: fileName,
        format: photo.format,
        webviewPath: photo.webPath,
      };

      photos.value = [savedFileImage, ...photos.value];
    } catch (err) {
      console.error(err);
    }
  };

  const pickFromGallary = async () => {
    const permissions = await Camera.requestPermissions();

    if (
      Capacitor.getPlatform() !== "web" &&
      !["granted", "limited"].includes(permissions.photos)
    ) {
      await Camera.requestPermissions();
    }

    const galleryPhotos = await Camera.pickImages({
      limit: 10,
      quality: 100,
    });

    galleryPhotos.photos.forEach((photo) => {
      const fileName = Date.now() + photo.format;
      const savedFileImage: TakenPhoto = {
        filename: fileName,
        format: photo.format,
        webviewPath: photo.webPath,
      };

      photos.value = [savedFileImage, ...photos.value];
    });
  };

  return {
    photos,
    pickFromGallary,
    takePhoto,
  };
};

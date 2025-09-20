import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

const photos = ref<TakenPhoto[]>([]);

export interface TakenPhoto {
  filename: string;
  format: string;
  id: string;
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
        id: uuidv4(),
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
        id: uuidv4(),
        webviewPath: photo.webPath,
      };

      photos.value = [savedFileImage, ...photos.value];
    });
  };

  const clearPhotos = () => {
    photos.value = [];
  };

  const removePhoto = (photo: TakenPhoto) => {
    const index = photos.value.findIndex((p) => p.id === photo.id);
    if (index === -1) return;

    photos.value.splice(index, 1);
  };

  return {
    clearPhotos,
    photos,
    pickFromGallary,
    removePhoto,
    takePhoto,
  };
};

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { onMounted, ref, watch } from "vue";

const photos = ref<TakenPhoto[]>([]);

export interface TakenPhoto {
  filepath: string;
  // photo: Photo;
  format: string;
  webviewPath?: string;
}

export const usePhotoGallery = () => {
  const takePhoto = async () => {
    const permissions = await Camera.checkPermissions();

    if (Capacitor.getPlatform() !== "web" && permissions.camera !== "granted") {
      await Camera.requestPermissions();
    }

    const photo = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    const fileName = Date.now() + photo.format;
    const savedFileImage: TakenPhoto = {
      filepath: fileName,
      format: photo.format,
      webviewPath: photo.webPath,
    };

    photos.value = [savedFileImage, ...photos.value];
  };

  const pickFromGallary = async () => {
    const permissions = await Camera.requestPermissions();

    // const photos = await Camera.
  };

  return {
    photos,
    takePhoto,
  };
};

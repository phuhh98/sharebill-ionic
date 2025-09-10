import { ref, onMounted, watch } from "vue";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";

const photos = ref<TakenPhoto[]>([]);

export interface TakenPhoto {
  filepath: string;
  webviewPath?: string;
}

export const usePhotoGallery = () => {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = Date.now() + ".jpeg";
    const savedFileImage: TakenPhoto = {
      filepath: fileName,
      webviewPath: photo.webPath,
    };

    photos.value = [savedFileImage, ...photos.value];
  };

  return {
    takePhoto,
    photos,
  };
};

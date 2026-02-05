import { launchImageLibrary } from "react-native-image-picker";

export const pickPhotos = async (limit: number) => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: limit, // max limit
      },
      (response) => {
        if (response.didCancel) {
          reject("User cancelled");
          return;
        }

        if (response.errorCode) {
          reject(response.errorMessage);
          return;
        }

        const assets = response.assets;
        if (!assets) {
          reject("No images selected");
          return;
        }

        resolve(assets);
      }
    );
  });
};

import { launchImageLibrary } from "react-native-image-picker";

export const pickVideo = async () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: "video",
        videoQuality: "high",
        selectionLimit: 1,
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

        const asset = response.assets?.[0];
        if (!asset) {
          reject("No video selected");
          return;
        }

        // ---- MAX SIZE CHECK (100 MB) ----
        const MAX_SIZE = 100 * 1024 * 1024; // 100MB
        if (asset.fileSize && asset.fileSize > MAX_SIZE) {
          reject("Video too large. Max size allowed is 100 MB.");
          return;
        }

        resolve(asset);
      }
    );
  });
};

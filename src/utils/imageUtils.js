import imageCompression from "browser-image-compression";
import moment from "moment";
import { upload } from "./restUtils";

export const uploadImageToServer = async (img) => {
  const response = await fetch(img);
  const blob = await response.blob();

  const options = {
    maxSizeMB: 2,
    useWebWorker: true,
    maxIteration: 10,
    quality: 0.8,
  };
  const compressedBlob = await imageCompression(blob, options);

  const fileType = compressedBlob.type;
  const fileExtension = fileType.split("/").pop();
  const file = new File(
    [compressedBlob],
    `img_${moment().valueOf()}.${fileExtension}`,
    {
      type: fileType,
    }
  );

  const formData = new FormData();
  formData.append("file", file);

  const uploadRes = await upload(formData);

  if (!uploadRes || uploadRes?.status || uploadRes?.statusCode) {
    return null;
  }

  return uploadRes?.filename;
};

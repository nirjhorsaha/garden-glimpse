/* eslint-disable prettier/prettier */
import axios from "axios";

export const useUploadImage = async (file: File, apiKey: string) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );

    if (response.data.success) {
      return response.data.data.url;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

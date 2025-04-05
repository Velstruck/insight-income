import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();    

    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data", //header for form data fileuploads
            },
        })
        return response.data; 
    } catch (error) {
        console.error("Error uploading image kekw:", error);
        throw error; 
    }
}

export default uploadImage;
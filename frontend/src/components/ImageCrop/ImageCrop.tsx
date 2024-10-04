import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import CustomModal from "../Popup/Popup";
import "./ImageCrop.css";
import { getCroppedImg } from "./Helper";
import { refreshUser, updateUserImage } from "../../services/user";
import { useAuth } from "../../helpers/AuthProvider";

interface ImageCropProps {
  type: "cover" | "profile";
  image: File | null;
  setImage: (pic: File | null) => void;
}

const ImageCrop: React.FC<ImageCropProps> = ({ type, image, setImage }) => {
  const { setAuth } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const isCoverImage = type === "cover";

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image, isCoverImage]);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const urlToFile = (url: string) => {
    let arr = url.split(",");
    let mimeMatch = arr[0].match(/:(.*?);/);
    let mime = mimeMatch ? mimeMatch[1] : "";
    let data = arr[1];
    let ext = mime.split("/")[1];

    let dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);

    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }
    return new File([dataArr], `image.${ext}`, { type: mime });
  };

  const onSave = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      const image = urlToFile(croppedImage);
      const formData = new FormData();

      if (image) {
        formData.append("image", image);
        await updateUserImage(formData, type);

        const newUser = await refreshUser();
        setAuth(newUser.user);
        setImage(null);
        setIsModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <CustomModal isOpen={isModalOpen}>
        <div className="crop-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={isCoverImage ? 16 / 9 : 1}
            cropShape={isCoverImage ? "rect" : "round"}
            showGrid={false}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="controls">
          <div className="slider-container">
            <span> Zoom </span>
            <input
              className="slider"
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </div>
          <div className="slider-container">
            <span> Rotation </span>
            <input
              className="slider"
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
            />
          </div>
          <button className="save" onClick={onSave}>
            Save
          </button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default ImageCrop;

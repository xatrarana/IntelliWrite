"use client";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Button } from "../ui/button";
import instance from "@/lib/axios";
import { AxiosError } from "axios";
import { FormSuccess } from "../form-success";
import { FormErorr } from "../form-error";
import Image from "next/image";


type ImageUploadProps = {
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUpload = ({setImageUrl}: ImageUploadProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.set("file", file as File);
    try {
      const response = await instance.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
        setImageUrl(response.data.path);
        setSuccess(response.data.success);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        setError(error.response?.data?.error);
      }
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-gray-400"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {image ? (
          <div className="flex flex-col items-center">
            <Image
              width={200}
              height={200}
              src={image}
              alt="Uploaded"
              className="max-w-full max-h-64 object-contain mb-4"
            />
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <FormSuccess message={success}/>
      <FormErorr message={error}/>
      {image && (
        <div className="flex gap-x-5 items-center justify-center mt-4">
          <Button variant={"destructive"} onClick={() => setImage(null)}>
            Remove Image
          </Button>
          <Button variant={"default"} onClick={handleUploadImage}>
            Upload Image
          </Button>
        </div>
      )}
    </>
  );
};

export default ImageUpload;

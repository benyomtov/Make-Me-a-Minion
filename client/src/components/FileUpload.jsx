import React from 'react';
import { useState, useRef } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isCameraStarted, setIsCameraStarted] = useState(false);
    const videoRef = useRef(null);

    const onChangeHandler = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleStartCamera = () => {

        setSelectedFile(null);

        const constraints = {
            video: { facingMode: "user" },
            audio: false,
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStream) {
                videoRef.current.srcObject = mediaStream;
                setIsCameraStarted(true);
            })
            .catch(function (error) {
                console.log("Error starting camera", error);
            });
    };

    const handleCapturePhoto = () => {
        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            const file = new File([blob], "image.png", { type: "image/png" });
            setSelectedFile(file);
        }, "image/png", 1);
    };

    return (
        <div>
            <input type="file" 
            accept="image/png"
            capture="environment"
            onChange={onChangeHandler} 
            />

            <button onClick={handleStartCamera}>Take New Photo</button>

            <button onClick={handleCapturePhoto} disabled={!isCameraStarted}>
                Capture Photo
            </button>

            {selectedFile ? (
                <div>
                <p>File Name: {selectedFile.name}</p>
            <img src={URL.createObjectURL(selectedFile)} alt="upload" />
            </div>
            ) : (
                <video ref={videoRef} 
                style={{ width: "100%", height: "auto" }}
                autoPlay 
                playsInline />
            )}
        </div>

    );
};

export default FileUpload;
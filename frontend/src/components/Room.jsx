import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Room = () => {
  const [toggleVideo, setToggleVideo] = useState(false);
  const videoRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");

  const playVideoFromCamera = async () => {
    try {
      const constraints = {
        video: {
          width: 640,
          height: 480,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  };

  const stopStreamedVideo = async () => {
    try {
      const stream = await videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    } catch (error) {
      console.error("Error closing video camera.", error);
    }
  };

  useEffect(() => {
    playVideoFromCamera();
  }, []);

  return (
    <div className="video-section">
      <div>Hi {name}</div>
      <video id="localVideo" ref={videoRef} autoPlay playsInline={false} />
      <button
        onClick={() => {
          toggleVideo ? playVideoFromCamera() : stopStreamedVideo();
          setToggleVideo(!toggleVideo);
        }}
      >
        {toggleVideo ? "Open Camera" : "Close Camera"}
      </button>
    </div>
  );
};

export default Room;

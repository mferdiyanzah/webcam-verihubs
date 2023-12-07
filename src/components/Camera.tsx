import { CameraOutlined, SettingOutlined } from "@ant-design/icons";
import { Checkbox, Dropdown, MenuProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Webcam from "react-webcam";
import { filter } from "../constants/filter";
import Button from "./Button";
import Filter from "./Filter";
import Info from "./Info";
import PreviewModal from "./PreviewModal";
import Spinner from "./Spinner";

export default function Camera() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [filterIndex, setFilterIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [cameraWidth, setCameraWidth] = useState(0);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [settings, setSettings] = useState({
    isMirrored: true,
    isFlipped: false,
  });

  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.filter = filter[filterIndex].style.filter as string;
        if (settings.isFlipped) {
          ctx.scale(1, -1);
          ctx.drawImage(img, 0, -img.height);
        } else {
          ctx.drawImage(img, 0, 0);
        }

        const screenshot = canvas.toDataURL("image/png");

        setUrl(screenshot);
        setIsOpen(true);
      }
    };
    img.src = imageSrc as string;
  };

  const changeFilter = (increment: number) => {
    const newIndex = (filterIndex + increment + filter.length) % filter.length;
    setFilterIndex(newIndex);
  };

  useEffect(() => {
    checkCameraPermission();

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUserMedia = () => {
    setIsCameraReady(true);
    setTimeout(() => {
      setCameraWidth(
        webcamRef.current?.video?.getBoundingClientRect().width as number
      );
    }, 200);
  };

  const isBrowserWidthLessThanCameraWidth = cameraWidth >= dimensions.width;

  const checkCameraPermission = async () => {
    setIsPromptOpen(true);
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsPromptOpen(false);
      setIsCameraAllowed(true);
    } catch (error) {
      setIsPromptOpen(false);
      setIsCameraAllowed(false);
    }
  };

  const Loading = () => {
    if (isPromptOpen || !isCameraReady) {
      return <Spinner />;
    } else if (!isCameraAllowed) {
      return (
        <Info text="Unfortunately, you can't use this app without allowing camera access. Please reset your browser settings and try again." />
      );
    } else return null;
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Checkbox
          onChange={() =>
            setSettings({ ...settings, isMirrored: !settings.isMirrored })
          }
        >
          Mirror
        </Checkbox>
      ),
    },
    {
      key: "2",
      label: (
        <Checkbox
          onChange={() =>
            setSettings({ ...settings, isFlipped: !settings.isFlipped })
          }
        >
          Flip
        </Checkbox>
      ),
    },
  ];

  return (
    <div className="relative w-full h-screen flex justify-center bg-amber-50 overflow-y-hidden">
      <Loading />
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        className={
          isMobile || isBrowserWidthLessThanCameraWidth
            ? "object-cover"
            : "object-contain"
        }
        ref={webcamRef}
        videoConstraints={{ facingMode: "user" }}
        mirrored={settings.isMirrored}
        style={{
          filter: filter[filterIndex].style.filter,
          display: isCameraReady ? "block" : "none",
          transform: settings.isFlipped ? "scaleY(-1)" : "scaleY(1)",
        }}
        onUserMedia={handleUserMedia}
      />
      <Filter />
      <div
        className="absolute bottom-16 justify-between px-4"
        style={{
          width: isBrowserWidthLessThanCameraWidth ? "100%" : cameraWidth,
          display: isCameraReady ? "flex" : "none",
          bottom: isMobile ? "12svh" : "10%",
        }}
      >
        <Dropdown menu={{ items }} placement="top">
          <a onClick={(e) => e.preventDefault()}>
            <Button text={<SettingOutlined />} />
          </a>
        </Dropdown>
        <div className="flex w-1/2 justify-between">
          <Button text="<" onClick={() => changeFilter(1)} />
          {filter.map((f, index) => (
            <Button
              key={index}
              text={f.name}
              onClick={() => setFilterIndex(index)}
              className={`w-2/3 ${index === filterIndex ? "block" : "hidden"}`}
            />
          ))}
          <Button text=">" onClick={() => changeFilter(-1)} />
        </div>
        <Button text={<CameraOutlined />} onClick={capture} />
      </div>
      <PreviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url={url}
      />
    </div>
  );
}

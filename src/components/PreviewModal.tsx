import { Input, Modal } from "antd";
import Button from "./Button";
import { useState } from "react";

interface PreviewModalProps {
  onClose: () => void;
  isOpen: boolean;
  url: string;
}

export default function PreviewModal({
  onClose,
  isOpen,
  url,
}: PreviewModalProps) {
  const time = new Date().toLocaleDateString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [fileName, setFileName] = useState(time);

  const onDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.png`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      open={isOpen}
      centered
      onCancel={onClose}
      footer={null}
      title="Preview Image"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img src={url} alt="Preview" />
          <div className="flex col items-center justify-center mt-4">
            <Input
              placeholder="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="mr-2 py-2 px-4"
            />
            <Button text="Download" onClick={onDownload} className="mr-2" />
          </div>
        </div>
      </div>
    </Modal>
  );
}

import { useState } from "react";
import Camera from "./components/Camera";
import Home from "./components/Home";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="h-full">
      <div className="bg-amber-100 p-2 text-2xl">Webcam Verihubs</div>
      {isCameraOpen ? (
        <Camera />
      ) : (
        <Home setIsCameraOpen={() => setIsCameraOpen(true)} />
      )}
    </div>
  );
}

export default App;

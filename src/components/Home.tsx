import Button from "./Button";

export default function Home({
  setIsCameraOpen,
}: {
  setIsCameraOpen: () => void;
}) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-amber-50">
      <h1 className="text-4xl font-bold mb-2 text-center p-2">
        Welcome to WebcamToy Verihubs
      </h1>
      <Button onClick={setIsCameraOpen} text="Open Camera" />
    </div>
  );
}

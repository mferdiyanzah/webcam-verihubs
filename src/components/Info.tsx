export default function Info({ text }: { text: string | React.ReactNode }) {
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <h1 className="text-xl w-1/2 font-bold mb-2 text-center p-2">{text}</h1>
    </div>
  );
}

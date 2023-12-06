import { Spin } from "antd";

export default function Spinner() {
  return (
    <div className="h-screen grid place-items-center">
      <Spin size="large" />
    </div>
  );
}

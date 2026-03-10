import Spinner from "./spinner";

export default function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size={36} text="Loading..." />
    </div>
  );
}
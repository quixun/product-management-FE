import { CldUploadWidget } from "next-cloudinary";

export function UploadCloudinary({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!}
      options={{
        folder: "Product",
        sources: ["local", "url", "camera"],
        maxFiles: 1,
        multiple: false,
        cropping: false,
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onUpload={(result: any) => {
        if (result.event === "success") {
          const imageUrl = result.info.secure_url;
          onUpload(imageUrl);
        }
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Upload Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}

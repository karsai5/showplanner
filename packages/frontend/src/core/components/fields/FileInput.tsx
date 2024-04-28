import { api } from "core/api";
import { MediaDTO } from "core/api/generated";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const FileInput: React.FC<{
  onChange: (media: MediaDTO) => void;
  label: string;
  path: string;
  fileName?: string;
}> = ({ label, onChange, path, fileName }) => {
  const [loading, setLoading] = useState(false);

  const saveFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    let finalName = file.name;
    if (fileName) {
      if (fileName.includes(".")) {
        finalName = fileName;
      } else {
        finalName = `${fileName}.${file.name.split(".").pop()}`;
      }
    }

    try {
      const result = await api.mediaUploadPost({
        file: file,
        key: `${path}/${finalName}`,
      });
      onChange(result);
    } catch (e) {
      toast.error("Failed to upload file");
      console.error("Failed to upload file", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-control w-full max-w-xs mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={saveFile}
        disabled={loading}
      />
      {loading && <progress className="progress w-full mt-2"></progress>}
    </div>
  );
};
export default FileInput;

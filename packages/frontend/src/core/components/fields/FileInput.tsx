import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const FileInput: React.FC<{
  onChange: (id: string) => void;
  label: string;
}> = ({ label }) => {
  const [loading, setLoading] = useState(false);
  // const client = useAuthenticatedAxiosClient();

  const saveFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('files', file);

    try {
      // const result = await client.post("/upload", formData);
      // if (onChange) {
      //   onChange(result.data?.[0]?.id);
      // }
    } catch (e) {
      toast.error('Failed to upload file');
      console.error('Failed to upload file', e);
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

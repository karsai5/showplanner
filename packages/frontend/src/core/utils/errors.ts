import { toast } from "react-toastify";

export const showToastError = (message: string, error?: Error | any) => {
  toast.error(message);
  console.error(message, error);
}


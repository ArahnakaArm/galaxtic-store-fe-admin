import { ToastContainer, toast } from "react-toastify";

export const ToastSuccess = (text = "Success!") => {
  toast.success(text, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
};

export const ToastError = (text = "Failed!") => {
  toast.error(text, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
};

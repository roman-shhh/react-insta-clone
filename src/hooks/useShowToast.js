import { useCallback } from "react";
import { toaster } from "../components/ui/toaster-state";

const useShowToast = () => {
  const showToast = useCallback(
    (title, description, type) => {
      toaster.create({
        title: title,
        description: description,
        type: type,
        duration: 3000,
        closable: true,
      });
    },
    [],
  );

  return showToast;
};

export default useShowToast;
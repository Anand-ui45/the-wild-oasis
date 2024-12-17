import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editSettings };
}

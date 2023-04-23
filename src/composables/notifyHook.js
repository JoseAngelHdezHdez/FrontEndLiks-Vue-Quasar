import { useQuasar } from "quasar";

export const useNotify = () => {
  const $q = useQuasar();

  const errorNotify = (message = 'Error de servidor 😱🔥🔥') => {
    $q.notify({
      message,
      color: 'negative',
      icon: "report_problem"
    })
  }

  const successNotify = (message = 'Todo bien broo, no te preocupes 😎👍👍') => {
    $q.notify({
      message,
      color: 'green ',
      icon: "report_problem"
    })
  }
  const showNotify = (
    message = "Error de servidor",
    color = "negative",
    icon =   "report_problem"
  ) => {
    $q.notify({
      message,
      color,
      icon,
    });
  };

  return { showNotify, successNotify, errorNotify  };
};

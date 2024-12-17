import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCaputure = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener("click", handleClick, listenCaputure);

      return () =>
        document.removeEventListener("click", handleClick, listenCaputure);
    },
    [handler, listenCaputure]
  );
  return ref;
}

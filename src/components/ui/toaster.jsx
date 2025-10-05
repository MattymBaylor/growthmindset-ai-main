import * as React from "react";

export function Toaster() {
  return null;
}

export function useToast() {
  return {
    toast: () => {},
    dismiss: () => {},
  };
}

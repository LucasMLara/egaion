"use client";

import { useRef, useState, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
};

export function useConfirmModal() {
  const [open, setOpen] = useState(false);
  const optsRef = useRef<ConfirmOptions>({});
  const resolverRef = useRef<(v: boolean) => void>(() => {});

  const confirm = useCallback((opts?: ConfirmOptions) => {
    optsRef.current = opts ?? {};
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const close = (result: boolean) => {
    resolverRef.current?.(result);
    setOpen(false);
  };

  const ConfirmDialog = (
    <AlertDialog open={open} onOpenChange={(o) => !o && close(false)}>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {optsRef.current.title ?? "Tem certeza?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {optsRef.current.description ??
              "Essa ação não poderá ser desfeita."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => close(false)}>
            {optsRef.current.cancelText ?? "Cancelar"}
          </AlertDialogCancel>
          <AlertDialogAction
            className={
              optsRef.current.destructive
                ? "bg-auxiliary-error-400 hover:bg-auxiliary-error-600"
                : ""
            }
            onClick={() => close(true)}
          >
            {optsRef.current.confirmText ?? "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return { confirm, ConfirmDialog };
}

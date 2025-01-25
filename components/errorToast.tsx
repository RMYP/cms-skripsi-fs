"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function ToastDestructive({ message }: { message: string }) {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: message,
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }, [toast, message]);

  return null;
}

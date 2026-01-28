// DeleteConfirmationDialog.tsx

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
import { Loader2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  categoryToDelete: { id: string; name: string } | null;
  handleDelete: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteConfirmationDialog({
  open,
  setOpen,
  categoryToDelete,
  handleDelete,
  isDeleting,
}: DeleteConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{categoryToDelete?.name}
            &quot;? This action cannot be undone and will also delete all
            subcategories.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

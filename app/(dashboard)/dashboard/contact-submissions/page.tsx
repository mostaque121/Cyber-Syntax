"use client";

import PaginationControl from "@/components/custom-ui/pagination-control";
import { useUrlParams } from "@/hooks/use-url-params";
import { ContactStatus } from "@/prisma/generated/prisma";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteContactSubmission,
  updateContactStatus,
} from "../../actions/contact-actions";
import { useContactSubmissions } from "../../hooks/use-contact-submissions";
import ContactFilter from "./components/contact-filter";
import ContactList from "./components/contact-list";

export default function ContactSubmissionsPage() {
  const { searchParams, setParam } = useUrlParams();
  const limit = 10;

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const status = searchParams.get("status") || "all";

  const { submissions, pagination, isLoading, isError, error, refetch } =
    useContactSubmissions({
      page,
      limit,
      search,
      status,
    });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteContactSubmission(id),
    onSuccess: () => {
      toast.success("Submission deleted successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete submission");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      updateContactStatus(id, status),
    onSuccess: () => {
      toast.success("Status updated successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const handleStatusChange = (id: string, newStatus: ContactStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  return (
    <div className="px-4 md:px-8 py-8 container mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-bold text-2xl">Contact Submissions</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and respond to customer inquiries
          </p>
        </div>
      </div>

      <ContactFilter
        status={status}
        onStatusChange={(val) => setParam("status", val)}
        onSearch={(val) => setParam("search", val)}
        searchValue={search || ""}
      />

      <ContactList
        className="mt-6"
        isLoading={isLoading}
        isUpdating={updateStatusMutation.isPending}
        onDelete={deleteMutation.mutate}
        onStatusChange={handleStatusChange}
        isError={isError}
        error={error}
        submissions={submissions}
      />

      <PaginationControl
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={(page) => setParam("page", page.toString())}
      />
    </div>
  );
}

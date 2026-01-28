"use client";

import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ContactStatus } from "@/prisma/generated/prisma";
import { format } from "date-fns";
import { Eye, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface ContactListProps {
  submissions: ContactSubmission[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isUpdating: boolean;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ContactStatus) => void;
  className?: string;
}

const statusColors: Record<ContactStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-300",
  RESOLVED: "bg-green-100 text-green-800 border-green-300",
  CLOSED: "bg-gray-100 text-gray-800 border-gray-300",
};

const statusLabels: Record<ContactStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

export default function ContactList({
  submissions,
  isLoading,
  isError,
  error,
  isUpdating,
  onDelete,
  onStatusChange,
  className,
}: ContactListProps) {
  const [viewItem, setViewItem] = useState<ContactSubmission | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error?.message || "Failed to load submissions"}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No contact submissions found.
      </div>
    );
  }

  return (
    <>
      <Card className={cn("mt-6", className)}>
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
          <CardDescription>
            Manage and respond to customer inquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {submission.name}
                  </TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {submission.subject}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{submission.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-7 px-2 text-xs font-medium border",
                            statusColors[submission.status]
                          )}
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            statusLabels[submission.status]
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {Object.values(ContactStatus).map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() =>
                              onStatusChange(submission.id, status)
                            }
                            className={cn(
                              submission.status === status && "bg-accent"
                            )}
                          >
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full mr-2",
                                status === "PENDING" && "bg-yellow-500",
                                status === "IN_PROGRESS" && "bg-blue-500",
                                status === "RESOLVED" && "bg-green-500",
                                status === "CLOSED" && "bg-gray-500"
                              )}
                            />
                            {statusLabels[status]}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {format(new Date(submission.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setViewItem(submission)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteDialog
                          title="Delete Submission"
                          description="Are you sure you want to delete this contact submission? This action cannot be undone."
                          onConfirm={() => onDelete(submission.id)}
                        >
                          <DropdownMenuItem
                            className="text-red-600"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DeleteDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
            <DialogDescription>
              Submitted on{" "}
              {viewItem &&
                format(
                  new Date(viewItem.createdAt),
                  "MMMM dd, yyyy 'at' h:mm a"
                )}
            </DialogDescription>
          </DialogHeader>
          {viewItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-gray-900">{viewItem.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900">{viewItem.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-gray-900">{viewItem.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Category
                  </label>
                  <p className="text-gray-900">{viewItem.category}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Subject
                </label>
                <p className="text-gray-900">{viewItem.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Message
                </label>
                <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {viewItem.message}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge className={cn("ml-2", statusColors[viewItem.status])}>
                    {statusLabels[viewItem.status]}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${viewItem.email}?subject=Re: ${viewItem.subject}`}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

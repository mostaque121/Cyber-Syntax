"use client";
import { useQuotationWizard } from "@/app/(dashboard)/hooks/use-quotation-wizard";
import { getQuotationData } from "@/app/(dashboard)/lib/get-document-data";
import { OrderWithMappedDocuments } from "@/app/(dashboard)/types/order.types";
import { QuotationFormData } from "@/app/(dashboard)/validations/quotation.validation";
import { LoadingButton } from "@/components/custom-ui/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { BillingFromStep } from "./billing-from-step";
import { BillingToStep } from "./billing-to-step";
import { CostsStep } from "./cost-step";
import { DateStep } from "./date-step";
import { QuotationNotesStep } from "./note-step";
import { ProductsStep } from "./products-step";
import { ServicesStep } from "./services-step";

const quotationTabs = [
  { id: "date", label: "Quotation Date" },
  { id: "billingFrom", label: "Billing From" },
  { id: "billingTo", label: "Billing To" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "costs", label: "Costs & Taxes" },
  { id: "notes", label: "Notes & Send Email" },
];

interface SectionProps {
  open: boolean;
  order: OrderWithMappedDocuments;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
export default function QuotationFormWizard({
  open,
  onOpenChange,
  onSuccess,
  order,
}: SectionProps) {
  const {
    form,
    handleNext,
    handlePrevious,
    currentTab,
    totalTabs,
    currentTabIndex,
    completedTabs,
    jumpToStep,
    mutation,
    setSendEmail,
    sendEmail,
  } = useQuotationWizard({
    initialData: getQuotationData(order),
    onSuccess,
  });
  const isEditMode = !!order.mappedDocuments.QUOTATION;
  const docId = order.mappedDocuments.QUOTATION?.id;
  const handleSubmit = (data: QuotationFormData) => {
    mutation.mutate({ orderId: order.orderId, data, isEditMode, docId });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="hidden">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent className="h-full max-h-screen w-full max-w-full min-w-full! rounded-none border-0 p-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="hidden w-96 flex-col bg-gray-900 p-6 text-primary-foreground md:flex max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-5">
              {isEditMode ? "Edit Quotation" : "Create Quotation"}
            </h2>

            <div className="flex-1 space-y-1">
              {quotationTabs.map((tab, index) => {
                const isActive = currentTab.id === tab.id;
                const isCompleted = completedTabs[index];

                return (
                  <button
                    key={tab.id}
                    onClick={() => jumpToStep(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md p-3 text-left transition-all text-sm",
                      isActive
                        ? "bg-primary-foreground/20"
                        : "hover:bg-primary-foreground/10"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border",
                        isActive
                          ? "border-primary-foreground bg-primary-foreground text-primary"
                          : isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-primary-foreground/25"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>

                    <p className="font-medium">{tab.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex max-h-screen  w-full flex-col space-y-6 h-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b px-8 py-4">
                <div className="md:hidden">
                  <p className="font-medium">
                    Step {currentTabIndex + 1} of {totalTabs}
                  </p>
                </div>
                <div className="hidden md:block">
                  <h3 className="text-lg font-semibold">
                    {quotationTabs[currentTabIndex]?.label}
                  </h3>
                </div>
              </div>

              {/* Mobile Progress */}
              <div className="flex gap-2 px-8 py-4 md:hidden">
                {quotationTabs.map((step, idx) => (
                  <div
                    key={step.id}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      idx <= currentTabIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto flex flex-col px-4 py-6 md:px-8">
                <Tabs value={currentTab.id} className="w-full ">
                  <TabsList className="hidden">
                    {quotationTabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} />
                    ))}
                  </TabsList>
                  <TabsContent value="date">
                    <DateStep form={form} />
                  </TabsContent>

                  <TabsContent value="billingFrom">
                    <BillingFromStep form={form} />
                  </TabsContent>

                  <TabsContent value="billingTo">
                    <BillingToStep form={form} />
                  </TabsContent>

                  <TabsContent value="products">
                    <ProductsStep form={form} />
                  </TabsContent>

                  <TabsContent value="services">
                    <ServicesStep form={form} />
                  </TabsContent>

                  <TabsContent value="costs">
                    <CostsStep form={form} />
                  </TabsContent>

                  <TabsContent value="notes">
                    <QuotationNotesStep
                      form={form}
                      sendEmail={sendEmail}
                      onSendEmailChange={setSendEmail}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Footer */}
              <div className="border-t  px-8 py-4">
                <div className="mx-auto flex max-w-md justify-between items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentTabIndex === 0 || mutation.isPending}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    {currentTabIndex + 1} of {totalTabs}
                  </div>

                  {currentTabIndex === totalTabs - 1 ? (
                    <LoadingButton type="submit" loading={mutation.isPending}>
                      {mutation.isPending
                        ? isEditMode
                          ? "Updating..."
                          : "Creating..."
                        : isEditMode
                        ? "Update Quotation"
                        : "Create Quotation"}
                    </LoadingButton>
                  ) : (
                    <Button type="button" onClick={handleNext}>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

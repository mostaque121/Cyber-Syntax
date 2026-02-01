"use client";
import { useQuotationWizard } from "@/app/(dashboard)/hooks/use-quotation-wizard";
import { getQuotationData } from "@/app/(dashboard)/lib/get-document-data";
import { OrderWithMappedDocuments } from "@/app/(dashboard)/types/order.types";
import { QuotationFormData } from "@/app/(dashboard)/validations/quotation.validation";
import { LoadingButton } from "@/components/custom-ui/loading-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isEditMode = !!order.mappedDocuments.QUOTATION;
  const docId = order.mappedDocuments.QUOTATION?.id;
  const handleSubmit = (data: QuotationFormData) => {
    mutation.mutate({ orderId: order.orderId, data, isEditMode, docId });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal Container - uses fixed positioning with inset */}
      <div
        className="absolute inset-0 flex flex-col bg-background md:flex-row"
        style={{ height: "100dvh" }}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:right-6 md:top-6"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        {/* Sidebar - Desktop only */}
        <aside className="hidden w-80 shrink-0 flex-col bg-gray-900 p-6 text-primary-foreground md:flex lg:w-96">
          <h2 className="mb-5 text-xl font-semibold">
            {isEditMode ? "Edit Quotation" : "Create Quotation"}
          </h2>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            {quotationTabs.map((tab, index) => {
              const isActive = currentTab.id === tab.id;
              const isCompleted = completedTabs[index];

              return (
                <button
                  key={tab.id}
                  onClick={() => jumpToStep(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md p-3 text-left text-sm transition-all",
                    isActive
                      ? "bg-primary-foreground/20"
                      : "hover:bg-primary-foreground/10",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      isActive
                        ? "border-primary-foreground bg-primary-foreground text-primary"
                        : isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-primary-foreground/25",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            {/* Header */}
            <header className="shrink-0 border-b px-4 py-3 pr-12 md:px-8 md:py-4">
              <div className="md:hidden">
                <p className="text-sm font-medium text-muted-foreground">
                  Step {currentTabIndex + 1} of {totalTabs}
                </p>
                <h3 className="text-lg font-semibold">
                  {quotationTabs[currentTabIndex]?.label}
                </h3>
              </div>
              <div className="hidden md:block">
                <h3 className="text-lg font-semibold">
                  {quotationTabs[currentTabIndex]?.label}
                </h3>
              </div>
            </header>

            {/* Mobile Progress Bar */}
            <div className="shrink-0 flex gap-1 px-4 py-2 md:hidden">
              {quotationTabs.map((step, idx) => (
                <div
                  key={step.id}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    idx <= currentTabIndex ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>

            {/* Scrollable Content */}
            <main className="min-h-0 flex-1 overflow-y-auto">
              <div className="px-4 py-4 md:px-8 md:py-6">
                <Tabs value={currentTab.id} className="w-full">
                  <TabsList className="hidden">
                    {quotationTabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} />
                    ))}
                  </TabsList>
                  <TabsContent value="date" className="mt-0">
                    <DateStep form={form} />
                  </TabsContent>
                  <TabsContent value="billingFrom" className="mt-0">
                    <BillingFromStep form={form} />
                  </TabsContent>
                  <TabsContent value="billingTo" className="mt-0">
                    <BillingToStep form={form} />
                  </TabsContent>
                  <TabsContent value="products" className="mt-0">
                    <ProductsStep form={form} />
                  </TabsContent>
                  <TabsContent value="services" className="mt-0">
                    <ServicesStep form={form} />
                  </TabsContent>
                  <TabsContent value="costs" className="mt-0">
                    <CostsStep form={form} />
                  </TabsContent>
                  <TabsContent value="notes" className="mt-0">
                    <QuotationNotesStep
                      form={form}
                      sendEmail={sendEmail}
                      onSendEmailChange={setSendEmail}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </main>

            {/* Fixed Footer */}
            <footer className="shrink-0 border-t bg-background px-4 py-3 md:px-8 md:py-4">
              <div className="mx-auto flex max-w-md items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentTabIndex === 0 || mutation.isPending}
                  className="md:size-default"
                >
                  <ChevronLeft className="mr-1 h-4 w-4 md:mr-2" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </Button>

                <span className="text-xs text-muted-foreground md:text-sm">
                  {currentTabIndex + 1} / {totalTabs}
                </span>

                {currentTabIndex === totalTabs - 1 ? (
                  <LoadingButton
                    type="submit"
                    size="sm"
                    loading={mutation.isPending}
                    className="md:size-default"
                  >
                    {mutation.isPending
                      ? isEditMode
                        ? "Updating..."
                        : "Creating..."
                      : isEditMode
                        ? "Update"
                        : "Create"}
                  </LoadingButton>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleNext}
                    className="md:size-default"
                  >
                    <span>Next</span>
                    <ChevronRight className="ml-1 h-4 w-4 md:ml-2" />
                  </Button>
                )}
              </div>
            </footer>
          </form>
        </Form>
      </div>
    </div>
  );
}

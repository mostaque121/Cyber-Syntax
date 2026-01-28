// pages/test-invoice.js
'use client'
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from "@react-pdf/renderer";

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    width: "210mm",
    height: "297mm",
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 10,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#d4f1c5",
    padding: 4,
    fontWeight: "bold",
  },
  tableCol: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: 10,
  },
});

// Dummy data
const invoiceData = {
  company: {
    name: "ITEC - International Training & Education Counsel",
    address: "Ultimo, New South Wales 2007, Dhaka, Bangladesh",
    email: "info@itecounsel.com",
    phone: "1300 535 922",
    website: "www.itecounsel.com",
  },
  client: {
    name: "Mostaque Ahmad",
    email: "aaa@gmail.com",
    address: "Dhaka Uttar pradesh, fd dh",
  },
  invoiceInfo: {
    invoiceNumber: "INV-001",
    orderNumber: "ORD-001",
    date: "May 22, 2025",
    dueDate: "May 27, 2025",
  },
  items: [
    { no: 1, product: "Laptop - High Performance Gaming Laptop", warranty: "1 Year", quantity: 2, unitPrice: 750, total: 1500 },
    { no: 2, product: "Wireless Mouse", warranty: "6 Months", quantity: 3, unitPrice: 25, total: 75 },
    { no: 3, product: "Mechanical Keyboard", warranty: "1 Year", quantity: 2, unitPrice: 45, total: 90 },
    { no: 4, product: "27-inch Monitor", warranty: "2 Years", quantity: 1, unitPrice: 200, total: 200 },
  ],
  paymentInfo: {
    notes: "Please make payment within 5 days to avoid penalties.",
    bank: {
      accountName: "Education Group Australia",
      bsb: "062339",
      accountNumber: "11059035",
    },
  },
};

// PDF Document Component
const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text>{invoiceData.company.name}</Text>
          <Text>{invoiceData.company.address}</Text>
          <Text>{invoiceData.company.email}</Text>
          <Text>{invoiceData.company.phone}</Text>
          <Text>{invoiceData.company.website}</Text>
        </View>
        <View style={{ textAlign: "right" }}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text>Invoice #: {invoiceData.invoiceInfo.invoiceNumber}</Text>
          <Text>Order #: {invoiceData.invoiceInfo.orderNumber}</Text>
          <Text>Invoice Date: {invoiceData.invoiceInfo.date}</Text>
          <Text>Payment Due: {invoiceData.invoiceInfo.dueDate}</Text>
        </View>
      </View>

      {/* Bill To */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Bill To:</Text>
        <Text>{invoiceData.client.name}</Text>
        <Text>{invoiceData.client.email}</Text>
        <Text>{invoiceData.client.address}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableColHeader, { width: "5%" }]}>No</Text>
          <Text style={[styles.tableColHeader, { width: "40%" }]}>Product / Service</Text>
          <Text style={[styles.tableColHeader, { width: "15%", textAlign: "right" }]}>Warranty</Text>
          <Text style={[styles.tableColHeader, { width: "10%", textAlign: "right" }]}>Qty</Text>
          <Text style={[styles.tableColHeader, { width: "15%", textAlign: "right" }]}>Unit Price</Text>
          <Text style={[styles.tableColHeader, { width: "15%", textAlign: "right" }]}>Total</Text>
        </View>

        {/* Table Body */}
        {invoiceData.items.map((item) => (
          <View style={styles.tableRow} key={item.no}>
            <Text style={[styles.tableCol, { width: "5%" }]}>{item.no}</Text>
            <Text style={[styles.tableCol, { width: "40%" }]}>{item.product}</Text>
            <Text style={[styles.tableCol, { width: "15%", textAlign: "right" }]}>{item.warranty}</Text>
            <Text style={[styles.tableCol, { width: "10%", textAlign: "right" }]}>{item.quantity}</Text>
            <Text style={[styles.tableCol, { width: "15%", textAlign: "right" }]}>{item.unitPrice.toFixed(2)}</Text>
            <Text style={[styles.tableCol, { width: "15%", textAlign: "right" }]}>{item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Payment Info */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Notes / Terms:</Text>
        <Text>{invoiceData.paymentInfo.notes}</Text>
        <Text style={{ marginTop: 4 }}>Bank Details:</Text>
        <Text>{invoiceData.paymentInfo.bank.accountName}</Text>
        <Text>{invoiceData.paymentInfo.bank.bsb}</Text>
        <Text>{invoiceData.paymentInfo.bank.accountNumber}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text>_____________________</Text>
          <Text>Customer Signature</Text>
        </View>
        <View>
          <Text>_____________________</Text>
          <Text>Authorized Signature</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default function TestInvoicePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Test Invoice PDF</h1>
      <PDFDownloadLink
        document={<InvoicePDF invoiceData={invoiceData} />}
        fileName="test-invoice.pdf"
        style={{
          padding: "8px 12px",
          backgroundColor: "#4ade80",
          color: "#000",
          borderRadius: 4,
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
}

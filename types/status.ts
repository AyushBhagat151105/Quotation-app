export interface Status {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  expired: number;
  recent: Array<StatusItems>;
}

interface StatusItems {
  id: string;
  adminId: string;
  clientName: string;
  clientEmail: string;
  status: string;
  totalAmount: number;
  validityDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationItem {
  id: string;
  quotationId: string;
  itemName: string;
  description: string | null;
  quantity: number;
  unitPrice: string;
  tax: string;
  totalPrice: string;
}

export type QuotationStatus = "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

export interface Quotation {
  id: string;
  adminId: string;
  clientName: string;
  clientEmail: string;
  status: QuotationStatus;
  totalAmount: string;
  validityDate: string;
  createdAt: string;
  updatedAt: string;
  items: QuotationItem[];
}

export interface QuotationListResponse {
  items: Quotation[];
  count: number;
}

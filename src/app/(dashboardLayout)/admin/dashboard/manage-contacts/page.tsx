import ContactsTable from "@/components/modules/admin/contacts/ContactsTable";
import ContactFilters from "@/components/modules/admin/contacts/ContactFilters";
import Pagination from "@/components/shared/Pagination";
import { getAllContacts } from "@/services/contact/contact.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Contacts | Admin Dashboard",
  description: "View and manage contact messages",
};

interface SearchParams {
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export default async function ManageContactsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: params.limit || "10",
  };
  // const page = params?.page ? Number(params.page) : 1;
  // const limit = params?.limit ? Number(params.limit) : 10;

  if (params.search) queryParams.search = params.search;
  if (params.status) queryParams.status = params.status;
  if (params.sortBy) {
    queryParams.sortBy = params.sortBy;
    queryParams.sortOrder = params.sortOrder || "desc";
  }

  // Default sort
  if (!queryParams.sortBy) queryParams.sortBy = "createdAt";
  if (!queryParams.sortOrder) queryParams.sortOrder = "desc";

  const contactsData = await getAllContacts(queryParams);
  const contacts = contactsData?.data || [];
  const meta = contactsData?.meta;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Contact Messages
          </h1>
          <p className="text-muted-foreground">
            Manage user inquiries and support requests ({meta?.total || 0})
          </p>
        </div>
      </div>

      <ContactFilters />

      <ContactsTable contacts={contacts} meta={meta} />

      {meta && meta.total > meta.limit && (
        <div className="mt-4">
          <Pagination
            totalPages={meta.totalPage}
            currentPage={meta.page}
            totalItems={meta.total}
          />
        </div>
      )}
    </div>
  );
}

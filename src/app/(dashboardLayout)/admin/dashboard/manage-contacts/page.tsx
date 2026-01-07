import ContactsTable from "@/components/modules/admin/contacts/ContactsTable";
import Pagination from "@/components/shared/Pagination";
import { getAllContacts } from "@/services/contact/contact.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Contacts | Admin Dashboard",
  description: "View and manage contact messages",
};

export default async function ManageContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const page = query?.page ? Number(query.page) : 1;
  const limit = query?.limit ? Number(query.limit) : 10;
  
  const contactsData = await getAllContacts({ page, limit, ...query });
  const contacts = contactsData?.data || [];
  const meta = contactsData?.meta;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Contact Messages</h1>
            <p className="text-muted-foreground">
                Manage user inquiries and support requests ({meta?.total || 0})
            </p>
        </div>
      </div>

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

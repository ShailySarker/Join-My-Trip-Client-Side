"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { IContact } from "@/types/contact.interface";
import { updateContactStatus } from "@/services/contact/contact.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ContactsTableProps {
  contacts: IContact[];
  meta: any;
}

export default function ContactsTable({ contacts, meta }: ContactsTableProps) {
  const router = useRouter();
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [adminResponse, setAdminResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleView = (contact: IContact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleUpdateClick = (contact: IContact) => {
    setSelectedContact(contact);
    setNewStatus(contact.status);
    setAdminResponse(contact.adminResponse || "");
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedContact) return;

    setLoading(true);
    try {
      const res = await updateContactStatus(selectedContact._id, {
        status: newStatus,
        adminResponse,
      });

      if (res?.success) {
        toast.success("Contact status updated successfully");
        setIsUpdateModalOpen(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="w-3 h-3 mr-1" /> Reserved</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Clock className="w-3 h-3 mr-1" /> In Progress</Badge>;
      case "PENDING":
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30"><AlertCircle className="w-3 h-3 mr-1" /> Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                        No messages found.
                    </TableCell>
                </TableRow>
            ) : (
                contacts.map((contact) => (
                <TableRow key={contact._id}>
                    <TableCell className="font-medium">
                    {new Date(contact.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                    <div className="flex flex-col">
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-xs text-muted-foreground">{contact.email}</span>
                    </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{contact.subject}</TableCell>
                    <TableCell>{getStatusBadge(contact.status)}</TableCell>
                    <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(contact)}>
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleUpdateClick(contact)}>
                        <MessageSquare className="w-4 h-4" />
                    </Button>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">From</h4>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                  <p className="font-medium">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                 <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                 <div>{getStatusBadge(selectedContact.status)}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Subject</h4>
                <div className="p-3 bg-muted rounded-md text-sm font-medium">{selectedContact.subject}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Message</h4>
                <div className="p-4 bg-muted/50 rounded-md text-sm whitespace-pre-wrap leading-relaxed h-[200px] overflow-y-auto border">
                  {selectedContact.message}
                </div>
              </div>

              {selectedContact.adminResponse && (
                <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Admin Response</h4>
                    <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-md text-sm border border-blue-100 dark:border-blue-900/30">
                        {selectedContact.adminResponse}
                    </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Response (Optional - sent via email)</label>
              <Textarea 
                placeholder="Write a response..." 
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateSubmit} disabled={loading}>
                {loading ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, CheckCircle, XCircle, Users, MapPin } from "lucide-react";
import { approveTravelPlan } from "@/services/travelPlans/travelPlans.service";
import {
  ITravelPlan,
  ITrevelStatus,
  ITrevelIsApproved,
} from "@/types/travelPlan.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define strict types for the component props
type TravelPlanWithHost = ITravelPlan & {
  _id: string;
  host: {
    _id: string;
    fullname: string;
    email: string;
  };
};

interface TravelPlanTableProps {
  travelPlans: TravelPlanWithHost[];
}

export default function TravelPlanTable({ travelPlans }: TravelPlanTableProps) {
  const router = useRouter();
  const [approvePlanId, setApprovePlanId] = useState<string | null>(null);
  const [rejectPlanId, setRejectPlanId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleApprove = async () => {
    if (!approvePlanId) return;

    setProcessing(true);
    try {
      const result = await approveTravelPlan(
        approvePlanId,
        ITrevelIsApproved.APPROVED
      );
      if (result.success) {
        toast.success("Travel plan approved successfully");
        router.refresh(); // Refresh server component
      } else {
        toast.error(result.message || "Failed to approve travel plan");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setProcessing(false);
      setApprovePlanId(null);
    }
  };

  const handleReject = async () => {
    if (!rejectPlanId) return;

    setProcessing(true);
    try {
      // Assuming REJECTED is generic rejection status
      const result = await approveTravelPlan(
        rejectPlanId,
        ITrevelIsApproved.REJECTED
      );
      if (result.success) {
        toast.success("Travel plan rejected");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to reject travel plan");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setProcessing(false);
      setRejectPlanId(null);
    }
  };

  const travelStatusColors: Record<ITrevelStatus, string> = {
    [ITrevelStatus.UPCOMING]:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    [ITrevelStatus.ONGOING]:
      "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
    [ITrevelStatus.COMPLETED]:
      "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
    [ITrevelStatus.CANCELLED]:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const getApprovalBadge = (approval: ITrevelIsApproved) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      [ITrevelIsApproved.APPROVED]: "default",
      [ITrevelIsApproved.PENDING]: "secondary",
      [ITrevelIsApproved.REJECTED]: "destructive",
    };
    return (
      <Badge variant={variants[approval] || "secondary"}>{approval}</Badge>
    );
  };

  return (
    <>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {travelPlans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No travel plans found.
                </TableCell>
              </TableRow>
            ) : (
              travelPlans.map((plan) => (
                <TableRow key={plan._id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {plan.title}
                  </TableCell>
                  <TableCell>
                    {/* Host type might vary, checking if fullname exists */}
                    {plan.host?.fullname || "Unknown Host"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {plan.destination?.city}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {plan.startDate
                      ? format(new Date(plan.startDate), "MMM d")
                      : "N/A"}{" "}
                    -<br />
                    {plan.endDate
                      ? format(new Date(plan.endDate), "MMM d, yy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {plan.budget} <span className="text-xs">BDT</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={travelStatusColors[plan.status]}>
                      {plan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{getApprovalBadge(plan.isApproved)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {plan.participants?.length || 0}/{plan.maxGuest}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/dashboard/manage-travel-plans/${plan._id}`}
                      >
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      {plan.isApproved === ITrevelIsApproved.PENDING && (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => setApprovePlanId(plan._id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setRejectPlanId(plan._id)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Approve Dialog */}
      <AlertDialog
        open={!!approvePlanId}
        onOpenChange={() => setApprovePlanId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Travel Plan?</AlertDialogTitle>
            <AlertDialogDescription>
              This will make the travel plan visible to all users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} disabled={processing}>
              {processing ? "Approving..." : "Approve"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog
        open={!!rejectPlanId}
        onOpenChange={() => setRejectPlanId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Travel Plan?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reject the travel plan and it will be cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={processing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {processing ? "Rejecting..." : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

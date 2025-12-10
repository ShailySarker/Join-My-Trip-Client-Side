"use client";

import { IUser } from "@/types/user.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteSingleUser } from "@/services/user/userService";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserTableProps {
  users: IUser[];
  onUserDeleted?: () => void;
}

export default function UserTable({ users, onUserDeleted }: UserTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (user: IUser) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete?._id) return;

    setIsDeleting(true);
    try {
      const result = await deleteSingleUser(userToDelete._id);
      if (result.success) {
        toast.success("User deleted successfully");
        setDeleteDialogOpen(false);
        setUserToDelete(null);
        if (onUserDeleted) {
          onUserDeleted();
        }
        // Refresh the page to update the list
        window.location.reload();
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "ADMIN":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <ShieldAlert className="w-3 h-3" />;
      case "ADMIN":
        return <ShieldCheck className="w-3 h-3" />;
      default:
        return <Users className="w-3 h-3" />;
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="text-left p-4 font-semibold">User</th>
              <th className="text-left p-4 font-semibold">Contact</th>
              <th className="text-left p-4 font-semibold">Location</th>
              <th className="text-left p-4 font-semibold">Role</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Subscription</th>
              <th className="text-left p-4 font-semibold">Stats</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-muted/30 transition-colors"
              >
                {/* User */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={user.profilePhoto || "/default-avatar.svg"}
                        alt={user.fullname}
                        fill
                        className="rounded-full object-cover"
                      />
                      {user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                          <svg
                            className="w-2 h-2 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{user.fullname}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        ID: {user._id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="p-4">
                  <div className="space-y-1 max-w-xs">
                    <p className="truncate text-xs">{user.email}</p>
                    {user.phone && (
                      <p className="truncate text-xs text-muted-foreground">
                        {user.phone}
                      </p>
                    )}
                  </div>
                </td>

                {/* Location */}
                <td className="p-4">
                  {user.currentLocation ? (
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="truncate max-w-[150px]">
                        {user.currentLocation.city},{" "}
                        {user.currentLocation.country}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">N/A</span>
                  )}
                </td>

                {/* Role */}
                <td className="p-4">
                  <Badge className={getRoleBadgeColor(user.role)}>
                    <span className="flex items-center gap-1">
                      {getRoleIcon(user.role)}
                      {user.role}
                    </span>
                  </Badge>
                </td>

                {/* Status */}
                <td className="p-4">
                  <div className="space-y-1">
                    <Badge
                      variant={user.isVerified ? "default" : "outline"}
                      className="text-xs"
                    >
                      {user.isVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </td>

                {/* Subscription */}
                <td className="p-4">
                  {user.subscriptionInfo?.plan ? (
                    <div className="space-y-1">
                      <Badge
                        variant={
                          user.subscriptionInfo.status === "ACTIVE"
                            ? "default"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {user.subscriptionInfo.plan}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {user.subscriptionInfo.status}
                      </p>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Free</span>
                  )}
                </td>

                {/* Stats */}
                <td className="p-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span>{user.myFollowers?.length || 0} followers</span>
                    </div>
                    {user.averageRating !== undefined &&
                      user.averageRating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span>
                            {user.averageRating.toFixed(1)} (
                            {user.reviewCount || 0})
                          </span>
                        </div>
                      )}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/dashboard/manage-users/${user._id}`}>
                      <Button variant="outline" size="icon-sm" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon-sm"
                      onClick={() => handleDeleteClick(user)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userToDelete?.fullname}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

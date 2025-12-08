/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { IUser, IUserGender, IUserRole } from "@/types/user.interface";
import { ITrevelInterest } from "@/types/travelPlan.interface";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileValidationSchema } from "@/zod/auth.validation";
import InputFieldError from "@/components/shared/InputFieldError";
import { IInputErrorState } from "@/lib/getInputFieldError";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateMyProfile } from "@/services/auth/updateMyProfile";

interface EditProfileModalProps {
  user: Partial<IUser>;
}

export default function EditProfileModal({ user }: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0); // Key to force re-render of file input
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset, // Destructure reset
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(editProfileValidationSchema),
    defaultValues: {
      fullname: user.fullname || "",
      phone: user.phone || "",
      bio: user.bio || "",
      gender: user.gender,
      // @ts-ignore
      age: user.age ? String(user.age) : "", // Cast to string for form
      city: user.currentLocation?.city || "",
      country: user.currentLocation?.country || "",
      visitedCountries: user.visitedCountries?.join(", ") || "",
      travelInterests: user.travelInterests || [],
    },
  });

  // Sync form values with user prop when it changes
  useEffect(() => {
    const resetValues = {
      fullname: user.fullname || "",
      phone: user.phone || "",
      bio: user.bio || "",
      gender: user.gender,
      // @ts-ignore
      age: user.age ? String(user.age) : "",
      city: user.currentLocation?.city || "",
      country: user.currentLocation?.country || "",
      visitedCountries: user.visitedCountries?.join(", ") || "",
      travelInterests: user.travelInterests || [],
    };
    reset(resetValues);
  }, [user, reset]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset(); // Reset form values
      setImageFile(null); // Clear image file state
      setInputKey((prev) => prev + 1); // Force reset file input
    }
  };

  const errorState: IInputErrorState = {
    // ... same as before
    success: false,
    errors: Object.entries(errors).map(([key, value]: [string, any]) => ({
      field: key,
      message: value.message || "Invalid field",
    })),
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);

    try {
      const payload: any = {
        fullname: data.fullname,
        phone: data.phone,
        bio: data.bio,
        gender: data.gender,
        age: data.age ? Number(data.age) : undefined,
        visitedCountries: data.visitedCountries
          ? data.visitedCountries
              .split(",")
              .map((c: string) => c.trim())
              .filter(Boolean)
          : [],
        travelInterests: data.travelInterests,
      };

      if (data.city || data.country) {
        payload.currentLocation = {
          city: data.city || "",
          country: data.country || "",
        };
      }

      const res = await updateMyProfile(payload, imageFile || undefined);

      if (res.success) {
        toast.success(res.message);
        handleOpenChange(false); // Close and reset
        router.refresh(); // Refresh the page data
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {(imageFile || user?.profilePhoto) && (
              <div className="grid gap-2 justify-center">
                <Image
                  key={imageFile ? "local" : "remote"}
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : user?.profilePhoto || ""
                  }
                  alt="Profile Photo"
                  width={100}
                  height={100}
                  className="rounded-full border-2 object-cover w-[100px] h-[100px]"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  {...register("fullname")}
                  placeholder="Your full name"
                  className={errors.fullname ? "border-red-500" : ""}
                />
                <InputFieldError field="fullname" state={errorState} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="Phone number"
                />
                <InputFieldError field="phone" state={errorState} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age")}
                  placeholder="Age"
                />
                <InputFieldError field="age" state={errorState} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(IUserGender).map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <InputFieldError field="gender" state={errorState} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input
                key={inputKey} // Force re-render on reset
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImageFile(file);
                }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Tell us about yourself"
              />
              <InputFieldError field="bio" state={errorState} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} placeholder="City" />
                <InputFieldError field="city" state={errorState} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  {...register("country")}
                  placeholder="Country"
                />
                <InputFieldError field="country" state={errorState} />
              </div>
            </div>

            {user?.role === IUserRole.USER && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="visitedCountries">
                    Visited Countries (comma separated)
                  </Label>
                  <Input
                    id="visitedCountries"
                    {...register("visitedCountries")}
                    placeholder="USA, Canada, Japan"
                  />
                  <InputFieldError
                    field="visitedCountries"
                    state={errorState}
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="mb-2">Travel Interests</Label>
                  <Controller
                    control={control}
                    name="travelInterests"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Object.values(ITrevelInterest).map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={interest}
                              checked={field.value?.includes(interest)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...(field.value || []),
                                    interest,
                                  ]);
                                } else {
                                  field.onChange(
                                    field.value?.filter(
                                      (i: string) => i !== interest
                                    )
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={interest}
                              className="text-[10px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <InputFieldError field="travelInterests" state={errorState} />
                </div>
              </>
            )}

            <div className="flex justify-end mt-4 pt-6 border-t">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Saving..." : "Save Now!"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

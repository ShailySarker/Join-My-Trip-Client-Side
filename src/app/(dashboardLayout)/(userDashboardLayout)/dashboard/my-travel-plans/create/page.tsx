/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodError } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Plus, Trash2, Upload, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  // ITravelPlan,
  ITravelType,
  ITrevelInterest,
  IParticipantDetails,
} from "@/types/travelPlan.interface";
import { createTravelPlan } from "@/services/travelPlans/travelPlans.service";
import InputFieldError from "@/components/shared/InputFieldError";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { IUserGender } from "@/types/user.interface";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { createBooking } from "@/services/bookings/bookings.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  createTravelPlanSchema,
  participantSchema,
} from "@/zod/travelPlan.validation";

// Manually define FormValues to bypass TS server caching issues
// This matches the exact structure after our schema updates
type FormValues = {
  title: string;
  description: string;
  image: File;
  budget: number;
  city: string;
  country: string;
  departureLocation?: string;
  arrivalLocation?: string;
  included: string[]; // Required array with default []
  excluded: string[]; // Required array with default []
  startDate: string; // String, not Date (no transform)
  endDate: string; // String, not Date (no transform)
  travelType: ITravelType;
  interests: ITrevelInterest[];
  maxGuest: number;
  minAge: number;
};

export default function CreateTravelPlanPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [createdPlan, setCreatedPlan] = useState<any>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [extraParticipants, setExtraParticipants] = useState<
    IParticipantDetails[]
  >([]);

  // New Participant State
  const [newParticipant, setNewParticipant] = useState<
    Partial<IParticipantDetails>
  >({
    name: "",
    phone: "",
    gender: "MALE" as IUserGender,
    age: 0,
  });
  const [participantErrors, setParticipantErrors] = useState<
    Partial<Record<keyof IParticipantDetails, string>>
  >({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfo();
      setUserInfo(user);
    };
    fetchUser();
  }, []);

  // Custom resolver wrapper to force correct types (bypasses TS caching)
  const customResolver = zodResolver(createTravelPlanSchema) as any;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: customResolver,
    defaultValues: {
      title: "",
      description: "",
      // budget: 0,
      city: "",
      country: "",
      departureLocation: "",
      arrivalLocation: "",
      included: [""],
      excluded: [""],
      startDate: "",
      endDate: "",
      interests: [],
      travelType: ITravelType.SOLO,
      // maxGuest: 5,
      // minAge: 8,
    } as Partial<FormValues>,
  });

  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = (useFieldArray as any)({
    control,
    name: "included",
  });
  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = (useFieldArray as any)({
    control,
    name: "excluded",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image must be < 5MB");
      return;
    }

    // Set both state and form value
    setImageFile(f);
    setValue("image", f); // Register with react-hook-form

    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(f);
  };

  const errorState: IInputErrorState = {
    success: false,
    errors: Object.entries(errors).map(([key, value]: [string, any]) => ({
      field: key,
      message: value.message || "Invalid field",
    })),
  };

  const onSubmit = async (data: FormValues) => {
    // client side validation: dates
    const s = new Date(data.startDate);
    const e = new Date(data.endDate);
    if (s > e) {
      toast.error("End date must be after start date");
      return;
    }

    setLoading(true);
    try {
      // Build payload matching ITravelPlan
      const payload = {
        title: data.title,
        description: data.description,
        budget: data.budget,
        destination: {
          city: data.city,
          country: data.country,
        },
        departureLocation: data.departureLocation,
        arrivalLocation: data.arrivalLocation,
        included: data.included.filter(Boolean),
        excluded: data.excluded.filter(Boolean),
        startDate: data.startDate,
        endDate: data.endDate,
        travelType: data.travelType,
        interests: data.interests,
        maxGuest: data.maxGuest,
        minAge: data.minAge,
      };
      const result = await createTravelPlan(payload, imageFile!);

      if (result.success && result.data) {
        toast.success("Travel plan created successfully!");
        setCreatedPlan(result.data);
        setShowBookingModal(true);
        // router.push("/dashboard/my-travel-plans");
      } else {
        toast.error(result.message || "Failed to create travel plan");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const handleAddParticipant = () => {
  //   if (
  //     !newParticipant.name ||
  //     !newParticipant.phone ||
  //     !newParticipant.age ||
  //     !newParticipant.gender
  //   ) {
  //     toast.error("Please fill all participant fields");
  //     return;
  //   }

  //   setExtraParticipants([
  //     ...extraParticipants,
  //     newParticipant as IParticipantDetails,
  //   ]);
  //   setNewParticipant({
  //     name: "",
  //     phone: "",
  //     gender: "MALE" as IUserGender,
  //     age: 0,
  //   });
  // };

  const handleAddParticipant = () => {
    try {
      // 🔹 Clear previous errors
      setParticipantErrors({});

      // 🔹 Validate using Zod
      const parsedParticipant = participantSchema.parse({
        name: newParticipant.name,
        phone: newParticipant.phone,
        gender: newParticipant.gender,
        age: newParticipant.age,
      });

      // 🔹 Add participant if valid
      setExtraParticipants((prev) => [
        ...prev,
        parsedParticipant as IParticipantDetails,
      ]);

      // 🔹 Reset form
      setNewParticipant({
        name: "",
        phone: "",
        gender: "MALE" as IUserGender,
        age: 0,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof IParticipantDetails, string>> =
          {};

        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof IParticipantDetails;
          fieldErrors[field] = issue.message;
        });

        setParticipantErrors(fieldErrors);
        toast.error("Please fix participant validation errors");
      }
    }
  };

  const removeParticipant = (index: number) => {
    const newParticipants = [...extraParticipants];
    newParticipants.splice(index, 1);
    setExtraParticipants(newParticipants);
  };

  const handleConfirmBooking = async () => {
    if (!createdPlan || !userInfo) return;

    setBookingLoading(true);
    try {
      if ((userInfo.age as number) < createdPlan.minAge) {
        toast.error(
          "You must be at least " +
            createdPlan.minAge +
            " years old to join this travel plan."
        );
        setShowBookingModal(false);
        return;
      }
      // 1. Add Self
      const selfParticipant: IParticipantDetails = {
        name: userInfo.fullname || "Me",
        phone: userInfo.phone,
        gender: userInfo.gender as IUserGender,
        age: userInfo.age,
        userId: userInfo._id,
      };

      // 2. Combine with Extras
      const allParticipants = [selfParticipant, ...extraParticipants];

      // 3. Create Booking Payload
      const bookingPayload = {
        travelId: createdPlan._id,
        amount: createdPlan.budget,
        // amount: createdPlan.budget * allParticipants.length,
        totalPeople: allParticipants.length,
        participants: allParticipants,
      };

      const result = await createBooking(bookingPayload);
      if (result.success) {
        toast.success("Booking confirmed successfully!");
        setShowBookingModal(false);
        router.push("/dashboard/my-travel-plans");
        // router.push("/dashboard/my-bookings");
      } else {
        toast.error(result.message || "Failed to confirm booking");
      }
    } catch (error: any) {
      toast.error("An error occurred while confirming booking");
    } finally {
      setBookingLoading(false);
    }
  };

  const interestsList = Object.values(ITrevelInterest);
  const totalPeople = 1 + extraParticipants.length;
  const availableSeats =
    createdPlan?.maxGuest != null
      ? createdPlan.maxGuest - (createdPlan.participants?.length ?? 0)
      : 0;

  return (
    <div className="xl:p-4">
      <div>
        {/* <h1>{new Date().toISOString()}</h1> */}

        <Link href="/dashboard/my-travel-plans" className="p-0">
          <Button variant="ghost" className="mb-4 p-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Travel Plans
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="xl:text-4xl lg:text-[32px] text-3xl pb-2 font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Create Travel Plan
          </h1>
          <p className="text-muted-foreground">
            Share your travel plans with the community
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="e.g., Amazing Beach Adventure in Bali"
              />
              <InputFieldError field="title" state={errorState} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe your travel plan in detail..."
                rows={5}
              />
              <InputFieldError field="description" state={errorState} />
            </div>

            <div>
              <Label>Cover Image</Label>
              <div className="mt-2">
                {/* <Input
                  key={inputKey} // Force re-render on reset
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setImageFile(file);
                  }}
                /> */}
                {imagePreview ? (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="preview"
                      width={800}
                      height={420}
                      className="rounded-lg object-cover"
                    />
                    <div className="mt-2 flex gap-2">
                      <Button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                          setValue("image", undefined as any);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-dashed border-2 p-6 rounded-md text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <div className="flex justify-center w-48 mx-auto">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer"
                        // onChange={(e) => {
                        //   const file = e.target.files?.[0];
                        //   if (file) setImageFile(file);
                        // }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <InputFieldError field="image" state={errorState} />
            </div>
          </CardContent>
        </Card>

        {/* Destination & Dates */}
        <Card>
          <CardHeader>
            <CardTitle>Destination & Dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Start Date</Label>
                <Input type="date" {...register("startDate")} />
                <InputFieldError field="startDate" state={errorState} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>End Date</Label>
                <Input type="date" {...register("endDate")} />
                <InputFieldError field="endDate" state={errorState} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>City</Label>
                <Input {...register("city")} />
                <InputFieldError field="city" state={errorState} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Country</Label>
                <Input {...register("country")} />
                <InputFieldError field="country" state={errorState} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="departureLocation">
                  Departure Location (Optional)
                </Label>
                <Input
                  id="departureLocation"
                  {...register("departureLocation")}
                  placeholder="e.g., Los Angeles Airport"
                />
                <InputFieldError field="departureLocation" state={errorState} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="arrivalLocation">
                  Arrival Location (Optional)
                </Label>
                <Input
                  id="arrivalLocation"
                  {...register("arrivalLocation")}
                  placeholder="e.g., Bali International Airport"
                />
                <InputFieldError field="arrivalLocation" state={errorState} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Details */}
        <Card>
          <CardHeader>
            <CardTitle>Travel Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="travelType">Travel Type</Label>
                <select
                  {...register("travelType")}
                  defaultValue=""
                  className="w-full rounded-md border py-1.5 px-2"
                >
                  <option value="" disabled>
                    Select travel type
                  </option>
                  {Object.values(ITravelType).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                {/* <Select {...register("travelType")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select travel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ITravelType).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                <InputFieldError field="travelType" state={errorState} />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Budget (BDT) Per Person</Label>
                <Input
                  type="number"
                  {...register("budget", { valueAsNumber: true })}
                />
                <InputFieldError field="budget" state={errorState} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Max Guests</Label>
                <Input
                  type="number"
                  {...register("maxGuest", { valueAsNumber: true })}
                />
                <InputFieldError field="maxGuest" state={errorState} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Minimum Age</Label>
                <Input
                  type="number"
                  {...register("minAge", { valueAsNumber: true })}
                />
                <InputFieldError field="minAge" state={errorState} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Label>Included</Label>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => appendIncluded("")}
                  >
                    <Plus />
                  </Button>
                </div>
                <div className="space-y-2 mt-1">
                  {includedFields.map((f: any, i: number) => (
                    <div key={f.id} className="flex gap-2">
                      <Input {...register(`included.${i}` as const)} />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => removeIncluded(i)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Label>Excluded</Label>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => appendExcluded("")}
                  >
                    <Plus />
                  </Button>
                </div>
                <div className="space-y-2 mt-1">
                  {excludedFields.map((f: any, i: number) => (
                    <div key={f.id} className="flex gap-2">
                      <Input {...register(`excluded.${i}` as const)} />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => removeExcluded(i)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Interests</Label>
              <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 mt-2">
                {interestsList.map((it) => (
                  <label key={it} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={it}
                      onChange={(e) => {
                        const arr = watch("interests") ?? [];
                        if (e.target.checked)
                          setValue("interests", [...arr, it]);
                        else
                          setValue(
                            "interests",
                            arr.filter((v: string) => v !== it)
                          );
                      }}
                      checked={(watch("interests") ?? []).includes(it)}
                    />
                    <span className="text-xs">{it.replaceAll("_", " ")}</span>
                  </label>
                ))}
              </div>
              <InputFieldError field="interests" state={errorState} />
            </div>
          </CardContent>
        </Card>

        <CardFooter className="grid grid-cols-2 gap-4 p-0">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Travel Plan"}
          </Button>
          <Link href="/dashboard/my-travel-plans" className="w-full">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
        </CardFooter>
      </form>
      {/* Booking Confirmation Modal */}
      <Dialog open={showBookingModal} onOpenChange={() => {}}>
        <DialogContent className="lg:min-w-3xl min-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Travel Plan Created Successfully!</DialogTitle>
            <DialogDescription>
              Your travel plan &quot;{createdPlan?.title}&quot; has been
              created. Confirm your booking now. A booking for you will be
              created automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Primary Participant (You)</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Name: {userInfo?.fullname}</div>
                <div>Email: {userInfo?.email}</div>
              </div>
            </div>

            {/* Add Extra Participants */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Add Other Participants</h3>
              </div>

              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-3 flex flex-col gap-1">
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={newParticipant.name}
                    onChange={(e) =>
                      setNewParticipant({
                        ...newParticipant,
                        name: e.target.value,
                      })
                    }
                    placeholder="Full Name"
                    className="h-8 w-full"
                  />
                </div>
                <div className="col-span-3 flex flex-col gap-1">
                  <Label className="text-xs">Phone</Label>
                  <Input
                    value={newParticipant.phone}
                    onChange={(e) =>
                      setNewParticipant({
                        ...newParticipant,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone"
                    className="h-8 w-full"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <Label className="text-xs">Age</Label>
                  <Input
                    type="number"
                    value={newParticipant.age || ""}
                    onChange={(e) =>
                      setNewParticipant({
                        ...newParticipant,
                        age: Number(e.target.value),
                      })
                    }
                    placeholder="Age"
                    className="h-8 w-full"
                  />
                </div>
                <div className="col-span-3 flex flex-col gap-1">
                  <Label className="text-xs">Gender</Label>
                  <Select
                    value={newParticipant.gender}
                    onValueChange={(v) =>
                      setNewParticipant({
                        ...newParticipant,
                        gender: v as IUserGender,
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Button
                    onClick={handleAddParticipant}
                    disabled={availableSeats <= totalPeople}
                    size="sm"
                    className="h-8 w-full"
                    type="button"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-destructive">
                {participantErrors.name && <li>{participantErrors.name}</li>}
                {participantErrors.phone && <li>{participantErrors.phone}</li>}
                {participantErrors.age && <li>{participantErrors.age}</li>}
                {createdPlan &&
                  newParticipant.age !== undefined &&
                  newParticipant.age < createdPlan.minAge && (
                    <li>TravelPlan minimum age is {createdPlan.minAge}</li>
                  )}

                {participantErrors.gender && (
                  <li>{participantErrors.gender}</li>
                )}
              </ul>

              {/* Extras List */}
              {extraParticipants.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="py-2">Name</TableHead>
                        <TableHead className="py-2">Phone</TableHead>
                        <TableHead className="py-2">Details</TableHead>
                        <TableHead className="py-2"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {extraParticipants.map((p, i) => (
                        <TableRow key={i}>
                          <TableCell className="py-2">{p.name}</TableCell>
                          <TableCell className="py-2">{p.phone}</TableCell>
                          <TableCell className="py-2">
                            {p.age}y / {p.gender}
                          </TableCell>
                          <TableCell className="py-2 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeParticipant(i)}
                            >
                              <X className="w-4 h-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            {/* Total Summary */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <div className="text-sm text-muted-foreground">
                  Total Participants
                </div>
                <div className="font-bold text-lg">
                  {extraParticipants.length + 1}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  Total to Pay
                </div>
                <div className="font-bold text-2xl text-primary">
                  {/* BDT {createdPlan?.budget} */}
                  {(
                    createdPlan?.budget *
                    (extraParticipants.length + 1)
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            {/* <Button
              variant="outline"
              onClick={() => router.push("/dashboard/my-travel-plans")}
              disabled={bookingLoading}
            >
              Skip Booking
            </Button> */}
            <Button onClick={handleConfirmBooking} disabled={bookingLoading}>
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

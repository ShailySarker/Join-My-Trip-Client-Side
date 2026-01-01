/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Plus, Trash2, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ITravelType, ITrevelInterest } from "@/types/travelPlan.interface";
import {
  getTravelPlanById,
  updateTravelPlan,
} from "@/services/travelPlans/travelPlans.service";
import InputFieldError from "@/components/shared/InputFieldError";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { useRouter } from "next/navigation";
import {
  baseTravelPlanSchema,
  updateTravelPlanSchema,
} from "@/zod/travelPlan.validation";

// Modified schema for Edit: Image is optional
const editTravelPlanSchema = baseTravelPlanSchema
  .extend({
    image: z.union([z.instanceof(File), z.string()]).optional().nullable(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );
  // We can optionally add the future date check here if strictly required for edits,
  // but for editing existing plans, enforcing future start date might block valid updates to imminent trips.
  // I will omit the 'future date' check for edits to allow maximum flexibility. 

type FormValues = {
  title: string;
  description: string;
  image: File | string | null;
  budget: number;
  city: string;
  country: string;
  departureLocation?: string;
  arrivalLocation?: string;
  included: string[];
  excluded: string[];
  startDate: string;
  endDate: string;
  travelType: ITravelType;
  interests: ITrevelInterest[];
  maxGuest: number;
  minAge: number;
};

export default function EditTravelPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [planId, setPlanId] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(editTravelPlanSchema), // Use modified schema
    defaultValues: {
      included: [""],
      excluded: [""],
      interests: [],
    },
  } as any);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        setPlanId(id);

        const result = await getTravelPlanById(id);
        if (result.success && result.data) {
          const plan = result.data;

          // Format dates for input type="date"
          const startDate = plan.startDate
            ? new Date(plan.startDate).toISOString().split("T")[0]
            : "";
          const endDate = plan.endDate
            ? new Date(plan.endDate).toISOString().split("T")[0]
            : "";

          setImagePreview(plan.image);

          reset({
            title: plan.title,
            description: plan.description,
            budget: plan.budget,
            city: plan.destination.city,
            country: plan.destination.country,
            departureLocation: plan.departureLocation,
            arrivalLocation: plan.arrivalLocation,
            included: plan.included.length ? plan.included : [""],
            excluded: plan.excluded.length ? plan.excluded : [""],
            startDate,
            endDate,
            travelType: plan.travelType,
            interests: plan.interests,
            maxGuest: plan.maxGuest,
            minAge: plan.minAge,
            image: plan.image,
          });
        } else {
          toast.error("Failed to fetch travel plan details");
          router.push("/dashboard/my-travel-plans");
        }
      } catch (error) {
        toast.error("An error occurred fetching travel plan");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [params, reset, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image must be < 5MB");
      return;
    }

    setImageFile(f);
    setValue("image", f);

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
    console.log("it is clicking");
    const s = new Date(data.startDate);
    const e = new Date(data.endDate);
    if (s > e) {
      toast.error("End date must be after start date");
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, any> = {
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

      // Remove undefined/null/empty strings if necessary or rely on backend to handle partial
      // But updateTravelPlan expects payload.
      // Image is handled separately as file arg.

      const result = await updateTravelPlan(
        { ...payload, id: planId },
        imageFile || undefined
      );

      if (result.success) {
        toast.success("Travel plan updated successfully!");
        router.push("/dashboard/my-travel-plans");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update travel plan");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const interestsList = Object.values(ITrevelInterest);

  if (fetching) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        Loading travel plan content...
      </div>
    );
  }

  return (
    <div className="xl:p-4">
      <div>
        <Link href="/dashboard/my-travel-plans" className="p-0">
          <Button variant="ghost" className="mb-4 p-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Travel Plans
          </Button>
        </Link>
        <div className="mb-8">
          <h1 className="xl:text-4xl lg:text-[32px] text-3xl pb-2 font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Edit Travel Plan
          </h1>
          <p className="text-muted-foreground">
            Update your travel plan details
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
                {imagePreview ? (
                  <div className="relative w-fit">
                    <Image
                      src={imagePreview}
                      alt="preview"
                      width={800}
                      height={420}
                      className="rounded-lg object-cover max-h-[400px]"
                    />
                    <div className="mt-2 flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const fileInput = document.getElementById(
                            "image-upload"
                          ) as HTMLInputElement;
                          if (fileInput) fileInput.click();
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
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
                  className="w-full rounded-md border py-1.5 px-2 bg-background"
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
                <InputFieldError field="travelType" state={errorState} />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Budget (BDT)</Label>
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
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 mt-1">
                  {includedFields.map((f: any, i: any) => (
                    <div key={f.id} className="flex gap-2">
                      {/* Cast index to any to avoid type check issues in iteration if complex */}
                      <Input {...register(`included.${i}` as const)} />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => removeIncluded(i)}
                      >
                        <Trash2 className="w-4 h-4" />
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
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 mt-1">
                  {excludedFields.map((f: any, i: any) => (
                    <div key={f.id} className="flex gap-2">
                      <Input {...register(`excluded.${i}` as const)} />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => removeExcluded(i)}
                      >
                        <Trash2 className="w-4 h-4" />
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
                      className="rounded border-gray-300"
                    />
                    <span className="text-xs capitalize">
                      {it.replaceAll("_", " ").toLowerCase()}
                    </span>
                  </label>
                ))}
              </div>
              <InputFieldError field="interests" state={errorState} />
            </div>
          </CardContent>
        </Card>

        <CardFooter className="p-0 grid grid-cols-2 gap-4">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Travel Plan"}
          </Button>
          <Link href="/dashboard/my-travel-plans" className="w-full">
            <Button variant="outline" type="button" className="w-full">
              Cancel
            </Button>
          </Link>
        </CardFooter>
      </form>
    </div>
  );
}

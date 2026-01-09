"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/services/reviews/reviews.service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
  revieweeId: z.string().min(1, "Please select a person to review"),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export interface Reviewee {
  _id: string;
  fullname: string;
  email: string;
  profilePhoto?: string;
}

interface ReviewModalProps {
  travelId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  potentialReviewees: Reviewee[];
}

export default function ReviewModal({
  travelId,
  trigger,
  onSuccess,
  potentialReviewees = [],
}: ReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      revieweeId:
        potentialReviewees.length === 1 ? potentialReviewees[0]._id : "",
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      const reviewInfo = {
        travelId,
        revieweeId: data.revieweeId,
        rating: data.rating,
        comment: data.comment,
      };
      const result = await createReview(reviewInfo);
      if (result.success) {
        toast.success("Review submitted successfully");
        setOpen(false);
        form.reset();
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="secondary">Review</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
          <DialogDescription>
            Share your experience with your travel companions. This helps the
            community!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="revieweeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Who do you want to review?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a person" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {potentialReviewees.map((person) => (
                        <SelectItem key={person._id} value={person._id}>
                          {person.fullname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center gap-2 py-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none transition-transform hover:scale-110"
                          onClick={() => field.onChange(star)}
                        >
                          <Star
                            className={cn(
                              "w-8 h-8 transition-colors",
                              star <= field.value
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-100 text-gray-300 dark:fill-gray-800 dark:text-gray-700"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

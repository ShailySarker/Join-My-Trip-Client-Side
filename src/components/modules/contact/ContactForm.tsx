"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createContact } from "@/services/contact/contact.service";
import { Send } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = await createContact(data);
      if (res?.success) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name
          </label>
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Your name"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="text-sm text-destructive font-medium">
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive font-medium">
              {errors.email.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Subject
        </label>
        <Input
          {...register("subject", { required: "Subject is required" })}
          placeholder="How can we help?"
        />
        {errors.subject && (
          <p className="text-sm text-destructive font-medium">
            {errors.subject.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Message
        </label>
        <Textarea
          {...register("message", { required: "Message is required" })}
          placeholder="Tell us more about your inquiry..."
          className="min-h-[150px]"
        />
        {errors.message && (
          <p className="text-sm text-destructive font-medium">
            {errors.message.message as string}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          "Sending..."
        ) : (
          <>
            Send Message <Send className="ml-2 w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}

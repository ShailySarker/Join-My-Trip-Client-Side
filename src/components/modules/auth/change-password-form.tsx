"use client";

import { useActionState, useEffect } from "react";
import { changePassword } from "@/services/auth/changePassword";
import { toast } from "sonner";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";

const ChangePasswordForm = () => {
    const [state, formAction, isPending] = useActionState(changePassword, null);

    useEffect(() => {
        if (state) {
            if (state.success) {
                toast.success(state.message || "Password changed successfully");
            } else if (!state.success && state.message) {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <form action={formAction}>
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    {/* Old Password */}
                    <Field>
                        <FieldLabel htmlFor="oldPassword">Old Password</FieldLabel>
                        <Input
                            id="oldPassword"
                            name="oldPassword"
                            type="password"
                            placeholder="Current Password"
                            defaultValue={(state?.data as any)?.oldPassword}
                        />
                        <InputFieldError field="oldPassword" state={state as any} />
                    </Field>
                    {/* New Password */}
                    <Field>
                        <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="New Password"
                            defaultValue={(state?.data as any)?.newPassword}
                        />
                        <InputFieldError field="newPassword" state={state as any} />
                    </Field>
                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm New Password"
                            defaultValue={(state?.data as any)?.confirmPassword}
                        />
                         <InputFieldError field="confirmPassword" state={state as any} />
                    </Field>
                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Changing Password..." : "Change Password"}
                        </Button>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default ChangePasswordForm;

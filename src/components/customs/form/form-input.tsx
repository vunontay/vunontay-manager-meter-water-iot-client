import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import { UseFormReturn, FieldValues, FieldPath } from "react-hook-form";

interface IFormInput<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    disabled?: boolean;
    className?: string;
    required?: boolean;
}

export const FormInput = <TFieldValues extends FieldValues>({
    form,
    name,
    label,
    placeholder,
    type = "text",
    disabled = false,
    className = "",
    required = false,
}: IFormInput<TFieldValues>) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>
                        {label}
                        {required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </FormLabel>
                    <FormControl className="relative">
                        <Input
                            type={
                                type === "password" && showPassword
                                    ? "text"
                                    : type
                            }
                            placeholder={placeholder}
                            disabled={disabled}
                            {...field}
                        />
                        {type === "password" && (
                            <span
                                className={cn(
                                    "absolute cursor-pointer top-1/2 right-2 -translate-y-1/2 text-gray-400"
                                )}
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </span>
                        )}
                    </FormControl>
                    <FormMessage className="text-red-500" />
                </FormItem>
            )}
        />
    );
};

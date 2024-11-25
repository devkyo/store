import { Steps } from "@/types/checkout-steps";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckoutStore } from "@/stores/checkout-store";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { states } from "@/data/states";

const formSchema = z.object({
    street: z.string().min(2, "Required field"),
    number: z.string().min(2, "Required field"),
    complement: z.string().optional(),
    district: z.string().min(2, "Required field"),
    city: z.string().min(2, "Required field"),
    state: z.string().min(2, "Required field"),
});

type Props = {
    setStep: Dispatch<SetStateAction<Steps>>;
};

export const StepAddress = ({ setStep }: Props) => {
    const { address, setAddress } = useCheckoutStore((state) => state);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...address },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAddress(values);
        setStep("finish");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Complement</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>District</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="State" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {states.map((state) => (
                                                <SelectItem
                                                    key={state.code}
                                                    value={state.code}
                                                >
                                                    {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between between mt-4">
                    <Button variant="link" onClick={() => setStep("user")}>
                        Back
                    </Button>
                    <Button type="submit" variant="outline">
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
};

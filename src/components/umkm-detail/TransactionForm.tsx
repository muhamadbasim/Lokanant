import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAddTransaction } from "@/hooks/use-transactions";

const formSchema = z.object({
    date: z.date({
        required_error: "Tanggal transaksi harus diisi",
    }),
    description: z.string().min(1, "Deskripsi harus diisi"),
    category: z.enum(["Pemasukan", "Pengeluaran"], {
        required_error: "Kategori harus dipilih",
    }),
    amount: z.string().min(1, "Jumlah harus diisi").refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Jumlah harus berupa angka positif",
    }),
});

interface TransactionFormProps {
    umkmId: string;
    lastBalance: number;
    onSuccess?: () => void;
}

export function TransactionForm({ umkmId, lastBalance, onSuccess }: TransactionFormProps) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const addTransaction = useAddTransaction();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            amount: "",
            date: new Date(),
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const amount = Number(values.amount);
        const newBalance = values.category === "Pemasukan"
            ? lastBalance + amount
            : lastBalance - amount;

        // Adjust amount for storage if needed (e.g. store expense as negative?)
        // Based on table.txt: "amount NUMERIC NOT NULL".
        // And sample data: "Pengeluaran", -6000000.
        // So if category is Pengeluaran, amount should be negative.
        const finalAmount = values.category === "Pemasukan" ? amount : -amount;

        addTransaction.mutate({
            umkm_id: umkmId,
            date: values.date.toISOString(), // Or just date string if DB expects that, but ISO is safe for timestamp
            description: values.description,
            category: values.category,
            amount: finalAmount,
            balance: newBalance,
        }, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Tanggal</FormLabel>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP", { locale: idLocale })
                                            ) : (
                                                <span>Pilih tanggal</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            setIsCalendarOpen(false);
                                        }}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Input placeholder="Contoh: Pembelian bahan baku" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Pemasukan">Pemasukan</SelectItem>
                                        <SelectItem value="Pengeluaran">Pengeluaran</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jumlah (Rp)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full" disabled={addTransaction.isPending}>
                    {addTransaction.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        "Simpan Transaksi"
                    )}
                </Button>
            </form>
        </Form>
    );
}

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseName: string;
    recipientName: string;
    date: string;
}

export const CertificateModal = ({ isOpen, onClose, courseName, recipientName, date }: CertificateModalProps) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[800px] bg-white text-black p-0 overflow-hidden print:shadow-none print:border-none print:max-w-none print:w-full print:h-full print:fixed print:inset-0 print:z-[9999]">
                <DialogHeader className="sr-only">
                    <DialogTitle>Sertifikat Kelulusan</DialogTitle>
                </DialogHeader>

                <div className="relative p-10 border-[20px] border-double border-primary/20 m-4 print:m-0 print:border-none print:p-0 h-full flex flex-col items-center justify-center text-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary print:hidden"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-primary print:hidden"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-primary print:hidden"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary print:hidden"></div>

                    <div className="space-y-6 max-w-2xl mx-auto py-10 print:py-20">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-serif font-bold text-primary tracking-wider uppercase">Sertifikat Kelulusan</h2>
                            <p className="text-muted-foreground italic">Diberikan kepada</p>
                        </div>

                        <div className="py-4 border-b-2 border-primary/10">
                            <h1 className="text-5xl font-serif font-bold text-foreground mb-2">{recipientName}</h1>
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg text-muted-foreground">Atas keberhasilannya menyelesaikan kursus</p>
                            <h3 className="text-3xl font-bold text-primary">{courseName}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-12 mt-12 pt-12">
                            <div className="text-center space-y-2">
                                <div className="w-32 h-0.5 bg-foreground/50 mx-auto"></div>
                                <p className="font-bold">Lokananta Academy</p>
                                <p className="text-xs text-muted-foreground">Penyelenggara</p>
                            </div>
                            <div className="text-center space-y-2">
                                <p className="font-serif text-lg">{date}</p>
                                <div className="w-32 h-0.5 bg-foreground/50 mx-auto"></div>
                                <p className="text-xs text-muted-foreground">Tanggal</p>
                            </div>
                        </div>

                        <div className="pt-8 print:hidden">
                            <Button onClick={handlePrint} className="gap-2">
                                <Printer className="w-4 h-4" />
                                Cetak Sertifikat
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

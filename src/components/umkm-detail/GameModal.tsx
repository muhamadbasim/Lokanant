import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface GameModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameUrl: string;
}

export const GameModal = ({ isOpen, onClose, gameUrl }: GameModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[900px] h-[80vh] p-0 overflow-hidden bg-black border-purple-900/50">
                <DialogHeader className="sr-only">
                    <DialogTitle>Game</DialogTitle>
                </DialogHeader>
                <iframe
                    src={gameUrl}
                    className="w-full h-full border-0"
                    title="Game"
                />
            </DialogContent>
        </Dialog>
    );
};

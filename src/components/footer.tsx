import { Separator } from "@/components/ui/separator";

export const Footer = () => {
    return (
        <footer className="mt-5 mx-3">
            <Separator />
            <div className="my-5 text-center text-sm opacity-50 flex w-full justify-between">
                <div>RWS Workshop 2025</div>
                <div>1.0.0</div>
            </div>

        </footer>
    );
};

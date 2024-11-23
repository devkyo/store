import { Steps } from "@/types/checkout-steps";
import { Dispatch, SetStateAction } from "react";

type Props = {
    setStep: Dispatch<SetStateAction<Steps>>;
};

export const StepAddress = ({ setStep }: Props) => {
    return <div>...</div>;
};

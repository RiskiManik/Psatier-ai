import { BotIcon, BrainCircuit, BrainCog, Cat } from "lucide-react";

type Model = {
  name: string;
  logo: React.ElementType;
  model: string;
  plan: string;
};

export const MODELS: Model[] = [
  {
    name: "Qwen: Qwen2.5 VL 72B Instruct",
    logo: BotIcon,
    model: "qwen/qwen2.5-vl-72b-instruct:free",
    plan: "Free",
  },
  {
    name: "Qwen: Qwen VL Plus",
    logo: BotIcon,
    model: "qwen/qwen-vl-plus:free",
    plan: "Free",
  },
  {
    name: "DeepSeek: R1 Distill Llama 70B",
    logo: BrainCircuit,
    model: "deepseek/deepseek-r1-distill-llama-70b:free",
    plan: "Free",
  },
  {
    name: "DeepSeek: R1",
    logo: BrainCircuit,
    model: "deepseek/deepseek-r1:free",
    plan: "Free",
  },
  {
    name: "Qwen 2 7B Instruct",
    logo: BotIcon,
    model: "qwen/qwen-2-7b-instruct:free",
    plan: "Free",
  },
  {
    name: "Google: Gemma 2 9B ",
    logo: BrainCircuit,
    model: "google/gemma-2-9b-it:free",
    plan: "Free",
  },
  {
    name: "DeepSeek: DeepSeek V3",
    logo: BrainCircuit,
    model: "deepseek/deepseek-chat:free",
    plan: "Free",
  },
  {
    name: "Meta: Llama 3.3 70B Instruct ",
    logo: BrainCog,
    model: "meta-llama/llama-3.3-70b-instruct:free",
    plan: "Free",
  },
  {
    name: "Rogue Rose 103B v0.2",
    logo: Cat,
    model: "sophosympatheia/rogue-rose-103b-v0.2:free",
    plan: "Free",
  },
];

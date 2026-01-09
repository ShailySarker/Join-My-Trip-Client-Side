import { Metadata } from "next";
import { getTravelPlanById } from "@/services/travelPlans/travelPlans.service";
import { notFound } from "next/navigation";
import TravelPlanDetails from "./TravelPlanDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = await getTravelPlanById(id);
  if (!result.success || !result.data) {
    return {
      title: "Travel Plan Not Found",
    };
  }

  const plan = result.data;
  return {
    title: `${plan.title} - Join My Trip`,
    description: plan.description,
    openGraph: {
      title: plan.title,
      description: plan.description,
      images: plan.image ? [plan.image] : [],
    },
  };
}

export default async function TravelPlanPage({ params }: Props) {
  const { id } = await params;

  const result = await getTravelPlanById(id);
  if (!result.success || !result.data) {
    notFound();
  }

  return <TravelPlanDetails travelPlan={result.data} />;
}

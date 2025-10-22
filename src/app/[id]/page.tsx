import { notFound } from "next/navigation";
import { allData } from "@/lib/data/_generated";
import UniversityPage from "@/components/UniversityPage";

export async function generateStaticParams() {
  return allData.universities.map((uni) => ({
    id: uni.id,
  }));
}

export default function UniversityDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const university = allData.universities.find((uni) => uni.id === params.id);

  if (!university) {
    notFound();
  }

  return <UniversityPage university={university} universityData={university} />;
}

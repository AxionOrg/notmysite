import { notFound } from "next/navigation";
import { allData } from "@/lib/data/_generated";
import UniversityPage from "@/components/UniversityPage";

export default function AgriPage() {
  const university = allData.universities.find((uni) => uni.id === "agri");

  if (!university) {
    notFound();
  }

  // The 'universityData' prop expects a more detailed object, which allData.universities provides.
  const universityData = university;

  return (
    <UniversityPage university={university} universityData={universityData} />
  );
}

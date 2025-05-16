import StaffDetailPage from "./staff-detail";

export default async function page({ params }: { params: { staffId: string } }) {
  return <StaffDetailPage staffId={params.staffId} />;
}

import RestoreDeletedStaffPage from "./restore-deleted-staff-page";

export default async function page({
  params,
}: {
  params: { staffId: string };
}) {
  return <RestoreDeletedStaffPage staffId={params.staffId} />;
}

export default async function OtherProfilePage({
  params,
}: {
  params: Promise<{ profileUsername: string }>;
}) {
  const { profileUsername } = await params;

  return (
    <div>
      <h1>{profileUsername}</h1>
    </div>
  );
}

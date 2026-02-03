import { getCartsByUser } from "@/app/actions/api";

export default async function MySavedCartsPage() {
  const savedCartsData = await getCartsByUser('33');
  console.log("Saved Carts data:", savedCartsData);
  return (
    <div className="my-6">
      <h1 className="font-bold text-2xl">My Saved Carts ({savedCartsData.total})</h1>
      {savedCartsData.carts.length <= 0 ? (
        <p className="mt-4">You have no saved carts.</p>
      ) : (
        <div className="mt-4 space-y-6"></div>
      )}

    </div>
  );
}
import { getCartsByUser } from "@/app/actions/api";
import SavedCart from "@/components/cart/SavedCart";
import { Accordion } from "@/components/ui/accordion";
import { CartType } from "@/lib/cartTypes";

export default async function MySavedCartsPage() {
  const savedCartsData = await getCartsByUser('33');
  return (
    <div className="my-6">
      <h1 className="font-bold text-2xl">
        My Saved Carts ({savedCartsData.total})
      </h1>
      {savedCartsData.carts.length <= 0 ? (
        <p className="mt-4">You have no saved carts.</p>
      ) : (
        <div className="mt-4 space-y-6">
          <Accordion type="single" collapsible>
          {savedCartsData.carts.map((cart: CartType) => (
            <SavedCart key={cart.id} cart={cart} />
          ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
import Image from "next/image";
import { CartItem } from "@/lib/cartTypes";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";

interface CartItemData {
  cartItem: CartItem;
  closeOnLinkClick?: boolean;
  onLinkClick?: () => void;
}

const MiniCartItem = ({ cartItem, closeOnLinkClick = false, onLinkClick }: CartItemData) => {

  return (
    <li className="flex flex-row gap-2 m-2">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
        <Image 
          src={cartItem?.thumbnail ? cartItem?.thumbnail : ""} 
          alt={cartItem?.title ? cartItem?.title : ""} 
          className="size-full object-cover" 
          fill
          style={{objectFit:'contain'}}
          />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              {closeOnLinkClick ? (
                <SheetClose asChild>
                  <Link href={`/product/${cartItem?.id}`} className="font-medium text-indigo-600 hover:text-indigo-500 text-left">{cartItem?.title}</Link>
                </SheetClose>
              ) : (
                <Link 
                  href={`/product/${cartItem?.id}`} 
                  className="font-medium text-indigo-600 hover:text-indigo-500 text-left"
                  onClick={onLinkClick}
                >
                  {cartItem?.title}
                </Link>
              )}
            </h3>
            <p className="ml-4">${cartItem?.price}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {cartItem?.quantity}</p>

          <div className="flex">
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
          </div>
        </div>
      </div>
    </li>
  )
}

MiniCartItem.displayName = 'MiniCartItem'

export default MiniCartItem
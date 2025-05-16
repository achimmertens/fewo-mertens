
import { Separator } from "@/components/ui/separator";
import { PriceDetails } from "@/types/booking";
import { PRICES } from "@/constants/prices";

interface PriceDisplayProps {
  totalPrice: number;
  priceDetails: PriceDetails;
  laundryPackages: number;
  breakfastCount: number;
}

const PriceDisplay = ({
  totalPrice,
  priceDetails,
  laundryPackages,
  breakfastCount,
}: PriceDisplayProps) => {
  return (
    <div className="mt-4 p-4 bg-forest-50 rounded-md w-full mb-4">
      <h3 className="font-medium text-lg mb-2 font-serif">Preisdetails:</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Erste Nacht:</span>
          <span>€{priceDetails.firstNightPrice.toFixed(2)}</span>
        </div>
        {priceDetails.additionalNightsCount > 0 && (
          <div className="flex justify-between">
            <span>Weitere Nächte ({priceDetails.additionalNightsCount}x):</span>
            <span>€{priceDetails.additionalNightsPrice.toFixed(2)}</span>
          </div>
        )}
        {priceDetails.breakfastPrice > 0 && (
          <>
            <div className="flex justify-between">
              <span>Frühstück:</span>
              <span>€{priceDetails.breakfastPrice.toFixed(2)}</span>
            </div>
            {breakfastCount > 1 && (
              <div className="flex justify-between text-xs text-gray-500 pl-4">
                <span>
                  (Erstes Frühstück: €{priceDetails.breakfastFirstPersonPrice.toFixed(2)}, 
                  {breakfastCount > 1 ? ` ${breakfastCount-1} weitere: €${priceDetails.breakfastAdditionalPrice.toFixed(2)}` : ""}
                  )
                </span>
                <span></span>
              </div>
            )}
          </>
        )}
        {priceDetails.laundryPrice > 0 && (
          <>
            <div className="flex justify-between">
              <span>Wäschepakete ({laundryPackages}x):</span>
              <span>€{priceDetails.laundryPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 pl-4">
              <span>€{PRICES.LAUNDRY_PACKAGE} pro Paket</span>
              <span></span>
            </div>
          </>
        )}
        <div className="flex justify-between">
          <span>Endreinigung:</span>
          <span>€{priceDetails.cleaningPrice.toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-medium">
          <span>Gesamtpreis:</span>
          <span>€{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceDisplay;

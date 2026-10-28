import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="Rooms-Card">
      <div className="Rooms-image">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="Rooms-imageStyle"
        />
      </div>
      <div className="Rooms-info">
        <div className="Rooms-infoBox">
          <h3 className="Rooms-name">Room {name}</h3>

          <div className="Rooms-guests">
            <UsersIcon className="Rooms-guests-icon" />
            <p className="Rooms-guests-text">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="Rooms-price">
            {discount > 0 ? (
              <>
                <span className="Rooms-withDisount">
                  ${regularPrice - discount}
                </span>
                <span className="Rooms-discount">${regularPrice}</span>
              </>
            ) : (
              <span className="Rooms-withDiscount">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="Rooms-details">
          <Link href={`/cabins/${name}`} className="Rooms-details-Link">
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;

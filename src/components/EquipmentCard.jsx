
import { MapPin, Star, ArrowUpRight } from 'lucide-react';

function EquipmentCard({ equipment, onBook }) {
    const {
        name,
        category,
        description,
        pricingType,
        hourlyRate,
        perAcreRate,
        rating,
        reviews,
        available,
        image,
    } = equipment;

    return (
        <article className="equipment-card">
            <div className="equipment-image-wrap">

                <img className="equipment-image" src={image} alt={name} loading="lazy" />

                <span className={`availability ${available ? 'available' : 'unavailable'}`}>
                    <span className="availability-dot" />
                    {available ? 'Available' : 'Unavailable'}
                </span>

                <span className="equipment-category">{category}</span>
            </div>

            <div className="equipment-card-body">
                <div className="equipment-title-row">
                    <h3>{name}</h3>
                    <span className="rating">
                        <Star size={15} fill="currentColor" />
                        {rating}
                    </span>
                </div>

                <p className="equipment-description">{description}</p>

                <div className="review-count">
                    {reviews} sample reviews
                </div>

                <div className="equipment-card-footer">

                    <div className="equipment-price">
                        <strong>
                            ₹
                            {Number(
                                pricingType === 'PER_HOUR' ? hourlyRate : perAcreRate
                            ).toLocaleString('en-IN')}
                        </strong>

                        <span>
                            / {pricingType === 'PER_HOUR' ? 'hour' : 'acre'}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="card-action"
                        onClick={onBook}
                        disabled={!equipment.available}
                        // onClick={() =>
                        //     alert(`Selected ${name}. Booking will be added next.`)
                        // }
                        aria-label={`View ${name}`}
                        >
                        {equipment.available ? 'Book Now' : 'Blocked'}
                        {/* <ArrowUpRight size={19} /> */}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default EquipmentCard;
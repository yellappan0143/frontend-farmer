
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Tractor,
  IndianRupee,
  CheckCircle2,
} from 'lucide-react';
import '../style/BookingReview.css';

function BookingReview({ booking, onBack, onConfirm }) {
  const isHourly = booking.pricingType === 'PER_HOUR';

  const formattedDate = new Date(
    `${booking.bookingDate}T00:00:00`
  ).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = new Date(
    `2000-01-01T${booking.startTime}:00`
  ).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="review-page">
      <div className="review-container">
        <button
          type="button"
          className="review-back"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back to booking details
        </button>

        <div className="review-heading">
          <span className="review-heading-icon">
            <CheckCircle2 size={26} />
          </span>

          <div>
            <h1>Review Your Booking</h1>
            <p>Please check your details before confirming.</p>
          </div>
        </div>

        <div className="review-layout">
          <section className="review-details-card">
            <div className="review-card-title">
              <Tractor size={21} />
              <h2>Booking details</h2>
            </div>

            <div className="review-equipment">
              <div className="review-tractor-icon">
                <Tractor size={30} />
              </div>

              <div>
                <h3>{booking.equipmentName}</h3>
                <p>
                  ₹{booking.rate.toLocaleString('en-IN')} /{' '}
                  {isHourly ? 'hour' : 'acre'}
                </p>
              </div>
            </div>

            <div className="review-detail-row">
              <span>
                <CalendarDays size={18} />
                Booking date
              </span>
              <strong>{formattedDate}</strong>
            </div>

            <div className="review-detail-row">
              <span>
                <Clock size={18} />
                Start time
              </span>
              <strong>{formattedTime}</strong>
            </div>

            <div className="review-detail-row">
              <span>
                <Clock size={18} />
                {isHourly ? 'Duration' : 'Land area'}
              </span>
              <strong>
                {booking.quantity} {isHourly ? 'hour(s)' : 'acre(s)'}
              </strong>
            </div>

            <div className="review-detail-row">
              <span>
                <MapPin size={18} />
                Farm location
              </span>
              <strong className="review-location">
                {booking.location}
              </strong>
            </div>
          </section>

          <aside className="review-summary-card">
            <h2>Price summary</h2>

            <div className="review-price-row">
              <span>Rate</span>
              <strong>
                ₹{booking.rate.toLocaleString('en-IN')} /{' '}
                {isHourly ? 'hour' : 'acre'}
              </strong>
            </div>

            <div className="review-price-row">
              <span>Quantity</span>
              <strong>
                {booking.quantity} {isHourly ? 'hour(s)' : 'acre(s)'}
              </strong>
            </div>

            <div className="review-price-row">
              <span>Additional charges</span>
              <strong>Not included</strong>
            </div>

            <div className="review-grand-total">
              <span>Estimated total</span>
              <strong>
                <IndianRupee size={25} />
                {booking.totalAmount.toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>

            <p className="review-disclaimer">
              The final price may change if transport or other charges
              apply. Your booking will not be saved until a backend is
              connected.
            </p>

            <button
              type="button"
              className="review-confirm-button"
              onClick={onConfirm}
            >
              Confirm Booking
            </button>

            <button
              type="button"
              className="review-edit-button"
              onClick={onBack}
            >
              Edit Details
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default BookingReview;
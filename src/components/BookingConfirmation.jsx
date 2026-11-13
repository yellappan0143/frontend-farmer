
import { CheckCircle2, CalendarDays, MapPin, Tractor } from 'lucide-react';
import '../style/BookingConfirmation.css';

function BookingConfirmation(props) {
 
    const { booking, onClose } = props;

  if (!booking) return null;

  return (
    <div
      className="booking-overlay"
      onClick={onClose}
    >
      <section
        className="booking-modal confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="confirmation-icon">
          <CheckCircle2 size={48} />
        </div>

        <h2 id="confirmation-title">Booking Confirmed!</h2>
        <p>Your FarmRide booking has been confirmed successfully.</p>

        <div className="confirmation-details">
          <p>
            <Tractor size={18} />
            <strong> Equipment:</strong> {booking.equipmentName}
          </p>

          <p>
            <CalendarDays size={18} />
            <strong> Date:</strong> {booking.bookingDate}
          </p>

          <p>
            <MapPin size={18} />
            <strong> Location:</strong> {booking.location}
          </p>

          <p>
            <strong>Total Amount: ₹
              {Number(booking.totalAmount).toLocaleString('en-IN')}
            </strong>
          </p>
        </div>

        <button
          type="button"
          className="review-confirm-button"
          onClick={onClose}
        >
          Done
        </button>
      </section>
    </div>
  );
}

export default BookingConfirmation;


import { useState } from 'react';
import { X, CalendarDays, Clock, MapPin, IndianRupee } from 'lucide-react';
import '../style/BookingModal.css';

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function BookingModal({ equipment, onClose, onConfirm }) {
    const isHourly = equipment.pricingType === 'PER_HOUR';

    const rate = isHourly
        ? equipment.hourlyRate
        : equipment.perAcreRate;

    const [bookingDate, setBookingDate] = useState(getToday());
    const [startTime, setStartTime] = useState('09:00');
    const [quantity, setQuantity] = useState('1');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const validQuantity =
        quantity.trim() !== '' &&
        Number.isFinite(Number(quantity)) &&
        Number(quantity) > 0;

    const totalAmount =
        validQuantity && Number.isFinite(rate) && rate >= 0
            ? Number(quantity) * rate
            : 0;

    function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (!bookingDate || bookingDate < getToday()) {
            setError('Please select today or a future booking date.');
            return;
        }

        if (!startTime) {
            setError('Please select a start time.');
            return;
        }

        if (!validQuantity) {
            setError(
                isHourly
                    ? 'Please enter a valid number of hours.'
                    : 'Please enter a valid land area.'
            );
            return;
        }

        if (!location.trim()) {
            setError('Please enter your farm location.');
            return;
        }

        onConfirm({
            equipmentId: equipment.id,
            equipmentName: equipment.name,
            pricingType: equipment.pricingType,
            rate,
            quantity: Number(quantity),
            bookingDate,
            startTime,
            location: location.trim(),
            totalAmount,
        });
    }

    return (
        <div className="booking-overlay" onClick={onClose}>
            <section
                className="booking-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-title"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="booking-modal-header">
                    <div>
                        <span className="booking-eyebrow">FARMRIDE BOOKING</span>
                        <h2 id="booking-title">Book Equipment</h2>
                        <p>Schedule your farming work.</p>
                    </div>

                    <button
                        type="button"
                        className="booking-close"
                        onClick={onClose}
                        aria-label="Close booking form"
                    >
                        <X size={22} />
                    </button>
                </header>

                <div className="booking-equipment">
                    <div>
                        <span>Selected equipment</span>
                        <h3>{equipment.name}</h3>
                        <p>
                            ₹{Number(rate).toLocaleString('en-IN')} /{' '}
                            {isHourly ? 'hour' : 'acre'}
                        </p>
                    </div>
                    <span className="booking-equipment-icon">🚜</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="booking-fields">
                        <div className="booking-field">
                            <label htmlFor="booking-date">
                                <CalendarDays size={16} /> Booking date
                            </label>
                            <input
                                id="booking-date"
                                type="date"
                                min={getToday()}
                                value={bookingDate}
                                onChange={(event) => setBookingDate(event.target.value)}
                                required
                            />
                        </div>

                        <div className="booking-field">
                            <label htmlFor="booking-time">
                                <Clock size={16} /> Start time
                            </label>
                            <input
                                id="booking-time"
                                type="time"
                                value={startTime}
                                onChange={(event) => setStartTime(event.target.value)}
                                required
                            />
                        </div>

                        <div className="booking-field">
                            <label htmlFor="booking-quantity">
                                {isHourly ? 'Duration (hours)' : 'Land area (acres)'}
                            </label>
                            <input
                                id="booking-quantity"
                                type="number"
                                min="0.1"
                                step="0.1"
                                placeholder={isHourly ? 'Enter hours' : 'Enter acres'}
                                value={quantity}
                                onChange={(event) => setQuantity(event.target.value)}
                                required
                            />
                        </div>

                        <div className="booking-field">
                            <label htmlFor="farm-location">
                                <MapPin size={16} /> Farm location
                            </label>
                            <input
                                id="farm-location"
                                type="text"
                                placeholder="Village, town, or farm address"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="booking-total">
                        <div>
                            <span>Estimated total</span>
                            <p>
                                {quantity || '0'} {isHourly ? 'hour(s)' : 'acre(s)'} × ₹
                                {Number(rate).toLocaleString('en-IN')}
                            </p>
                        </div>
                        <strong>
                            <IndianRupee size={23} />
                            {totalAmount.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                            })}
                        </strong>
                    </div>

                    {error && (
                        <p className="booking-error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="booking-actions">
                        <button
                            type="button"
                            className="booking-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="booking-confirm">
                            Review Booking
                        </button>
                    </div>

                    <p className="booking-disclaimer">
                        This is an estimated amount. Transport and additional charges
                        may apply. Your booking is not yet saved to a server.
                    </p>
                </form>
            </section>
        </div>
    );
}

export default BookingModal;

import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { equipments } from '../data/equipments';
import CategoryFilter from '../components/CategoryFilter';
import EquipmentCard from '../components/EquipmentCard';
import BookingModal from '../components/BookingModal';
import BookingReview from '../components/BookingReview';
import BookingConfirmation from './BookingConfirmation';
import BookingWorkTracker from '../components/BookingWorkTracker';







function Home() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [bookingToReview, setBookingToReview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Equipment');
  const [activeWorkBooking, setActiveWorkBooking] = useState(null);



  const filteredEquipments = useMemo(() => {

    const search = searchTerm.trim().toLowerCase();

    return equipments.filter((equipment) => {
      const matchesCategory = selectedCategory === 'All Equipment' || equipment.category === selectedCategory;

      const matchesSearch =
        equipment.name.toLowerCase().includes(search) ||
        equipment.category.toLowerCase().includes(search) ||
        equipment.description.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);




 


  return (
    <>


      <section className="equipment-section" id="equipment">
        
        <div className="equipment-heading">
          <div>
            <span className="section-label">
              EQUIPMENT MARKETPLACE
            </span>

            <h2>Find the right equipment for your farm</h2>
            <p>
              Explore agricultural equipment for every stage
              of your farming journey.
            </p>
          </div>

          <span className="equipment-count">
            {filteredEquipments.length} equipment type{filteredEquipments.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="equipment-toolbar">
          <div className="equipment-search">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search tractors, ploughs, harvesters..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search equipment"
            />
          </div>

          <div className="filter-label">
            <SlidersHorizontal size={17} />
            <span>Filter by type</span>
          </div>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {filteredEquipments.length > 0 ? (
          <div className="equipment-grid">
            {filteredEquipments.map((equipment) => (
              <EquipmentCard
                key={equipment.id}
                equipment={equipment}
                onBook={() => setSelectedEquipment(equipment)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <Search size={34} />
            <h3>No equipment found</h3>
            <p>Try another search term or choose a different category.</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Equipment');
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {selectedEquipment && (
          <BookingModal
            equipment={selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
            onConfirm={(booking) => {
              setBookingToReview(booking);
              setSelectedEquipment(null);
            }}
          />
        )}

        {bookingConfirmation && (
          <div className="booking-success" role="status">
            <h3>Booking details reviewed!</h3>

            <p>
              Equipment: {bookingConfirmation.equipmentName}
            </p>

            <p>
              Date: {bookingConfirmation.bookingDate} at{' '}
              {bookingConfirmation.startTime}
            </p>

            <p>
              Location: {bookingConfirmation.location}
            </p>

            <p>
              Estimated amount: ₹
              {bookingConfirmation.totalAmount.toLocaleString('en-IN')}
            </p>

            <button
              type="button"
              onClick={() => setBookingConfirmation(null)}
            >
              Close
            </button>
          </div>
        )}

        {selectedEquipment && (
          <BookingModal
            equipment={selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
            onConfirm={(booking) => {
              setBookingToReview(booking);
              setSelectedEquipment(null);
            }}
          />
        )}

        {bookingToReview && (
          <BookingReview
            booking={bookingToReview}
            onBack={() => {
              const equipment = equipments.find(
                (item) => item.id === bookingToReview.equipmentId
              );

              setBookingToReview(null);

              if (equipment) {
                setSelectedEquipment(equipment);
              }
            }}
            onConfirm={() => {
              setBookingConfirmation(bookingToReview);
              setBookingToReview(null);
            }}
          />
        )}

        {bookingConfirmation && (
          <BookingConfirmation
            booking={bookingConfirmation}
            onClose={() => {
              setActiveWorkBooking(bookingConfirmation);
              setBookingConfirmation(null);
            }}
          />
        )}

        {activeWorkBooking && (
          <BookingWorkTracker booking={activeWorkBooking} />
        )}

      </section>
    </>
  );
}

export default Home;

import { useState } from 'react';
import { Calculator, IndianRupee } from 'lucide-react';
import { equipments } from '../data/equipments';
import '../style/LandCalculator.css';

function LandCalculator() {
    const [equipmentId, setEquipmentId] = useState(String(equipments[0]?.id ?? ''));
    const [quantity, setQuantity] = useState('');

    const selectedEquipment = equipments.find((equipment) => String(equipment.id) === equipmentId);

    const isHourly = selectedEquipment?.pricingType === 'PER_HOUR';

    const rate = isHourly ? selectedEquipment?.hourlyRate : selectedEquipment?.perAcreRate;

    const amount =
        quantity.trim() !== '' &&
            Number.isFinite(Number(quantity)) &&
            Number(quantity) > 0 &&
            Number.isFinite(rate) &&
            rate >= 0
            ? Number(quantity) * rate
            : 0;

    function handleEquipmentChange(event) {
        setEquipmentId(event.target.value); setQuantity('');
    }

    return (
        <section className="calculator-section" id="calculator">
            <div className="calculator-container">
                <div className="calculator-heading">
                    <span className="calculator-icon">
                        <Calculator size={25} />
                    </span>

                    <div>
                        <h2>Calculate Your Rental Cost</h2>
                        <p>Estimate your equipment rental before booking.</p>
                    </div>
                </div>

                <div className="calculator-form">
                    <div className="calculator-field">
                        <label htmlFor="equipment">Select equipment</label>

                        <select
                            id="equipment"
                            value={equipmentId}
                            onChange={handleEquipmentChange}
                        >
                            <option key="" value="">
                                Select equipment
                            </option>
                            {equipments.map((equipment) => (
                                <option key={equipment.id} value={String(equipment.id)}>
                                    {equipment.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="calculator-field">
                        <label htmlFor="quantity">
                            {isHourly ? 'Duration (hours)' : 'Land area (acres)'}
                        </label>

                        <input
                            id="quantity"
                            type="number"
                            min="0.1"
                            step="0.1"
                            placeholder={isHourly ? 'Enter hours' : 'Enter acres'}
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                        />
                    </div>

                    <div className="calculator-result">
                        <span>Estimated rental cost</span>

                        <h3>
                            <IndianRupee size={24} />
                            {amount.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                            })}
                        </h3>

                        <small>
                            {selectedEquipment ? `₹ ${Number(rate).toLocaleString('en-IN')} ${isHourly ? 'per hour' : 'per acre'}` : 'Select equipment to view the rate'}
                        </small>
                    </div>
                </div>

                <p className="calculator-note">* Estimates use sample rates. Transport, extra hours, and other charges may apply.</p>
            </div>
        </section>
    );
}

export default LandCalculator;
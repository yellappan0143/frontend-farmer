
import { useEffect, useState } from 'react';
import { MapPin, Play, Square, Clock, CheckCircle2, } from 'lucide-react';
import '../style/BookingWorkTracker.css';

function BookingWorkTracker({ booking }) {

    const [status, setStatus] = useState('ACCEPTED');

    const [ownerStartConfirmed, setOwnerStartConfirmed] = useState(false);
    const [farmerStartConfirmed, setFarmerStartConfirmed] = useState(false);

    const [ownerEndConfirmed, setOwnerEndConfirmed] = useState(false);
    const [farmerEndConfirmed, setFarmerEndConfirmed] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [now, setNow] = useState(Date.now());


    // Update the displayed timer every second while work is running.
    useEffect(() => {
        if (status !== 'IN_PROGRESS') return;

        const intervalId = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [status]);

    const formatDuration = (milliseconds) => {
        const totalSeconds = Math.max(
            0,
            Math.floor(milliseconds / 1000)
        );

        const hours = String(
            Math.floor(totalSeconds / 3600)
        ).padStart(2, '0');

        const minutes = String(
            Math.floor((totalSeconds % 3600) / 60)
        ).padStart(2, '0');

        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    const workDuration = startTime
        ? formatDuration((endTime ?? now) - startTime)
        : '00:00:00';

    const markArrived = () => {
        setStatus('ARRIVED');
    };

    const requestStart = () => {
        setOwnerStartConfirmed(true);
        setStatus('START_PENDING');
    };

    const confirmStart = () => {
        const confirmedAt = Date.now();

        setFarmerStartConfirmed(true);

        if (ownerStartConfirmed) {
            setStartTime(confirmedAt);
            setNow(confirmedAt);
            setStatus('IN_PROGRESS');
        }
    };

    const requestEnd = () => {
        setOwnerEndConfirmed(true);
        setStatus('END_PENDING');
    };

    const confirmEnd = () => {
        setFarmerEndConfirmed(true);

        if (ownerEndConfirmed) {
            setEndTime(Date.now());
            setStatus('COMPLETED');
        }
    };

    const resetStartRequest = () => {
        setOwnerStartConfirmed(false);
        setFarmerStartConfirmed(false);
        setStatus('ARRIVED');
    };

    const resetEndRequest = () => {
        setOwnerEndConfirmed(false);
        setFarmerEndConfirmed(false);
        setStatus('IN_PROGRESS');
    };

    return (
        <section className="work-tracker">
            <h2>FarmRide Work Tracking</h2>

            <p>
                <strong>Equipment:</strong> {booking.equipmentName}
            </p>

            <p>
                <strong>Location:</strong> {booking.location}
            </p>

            <p>
                <strong>Status:</strong>{' '}
                {status.replaceAll('_', ' ')}
            </p>

            {status === 'ACCEPTED' && (
                <button onClick={markArrived}>
                    <MapPin size={18} /> Mark Tractor Arrived
                </button>
            )}

            {status === 'ARRIVED' && (
                <>
                    <p>The tractor has arrived. Work has not started.</p>

                    <button onClick={requestStart}>
                        <Play size={18} /> Owner: Request Start
                    </button>
                </>
            )}

            {status === 'START_PENDING' && (
                <>
                    <p>
                        Owner confirmation:{' '}
                        {ownerStartConfirmed ? 'Confirmed' : 'Pending'}
                    </p>

                    <p>
                        Farmer confirmation:{' '}
                        {farmerStartConfirmed ? 'Confirmed' : 'Pending'}
                    </p>

                    {!farmerStartConfirmed && (
                        <button onClick={confirmStart}>
                            <CheckCircle2 size={18} /> Farmer: Confirm Start
                        </button>
                    )}

                    <button onClick={resetStartRequest}>
                        Cancel Start Request
                    </button>
                </>
            )}

            {status === 'IN_PROGRESS' && (
                <>
                    <div className="work-timer">
                        <Clock size={24} />
                        <h3>{workDuration}</h3>
                        <p>Work timer is running</p>
                    </div>

                    <button onClick={requestEnd}>
                        <Square size={18} /> Owner: Request Completion
                    </button>
                </>
            )}

            {status === 'END_PENDING' && (
                <>
                    <p>
                        Owner completion:{' '}
                        {ownerEndConfirmed ? 'Confirmed' : 'Pending'}
                    </p>

                    <p>
                        Farmer completion:{' '}
                        {farmerEndConfirmed ? 'Confirmed' : 'Pending'}
                    </p>

                    {!farmerEndConfirmed && (
                        <button onClick={confirmEnd}>
                            <CheckCircle2 size={18} /> Farmer: Confirm Completion
                        </button>
                    )}

                    <button onClick={resetEndRequest}>
                        Cancel Completion Request
                    </button>
                </>
            )}

            {status === 'COMPLETED' && (
                <div>
                    <CheckCircle2 size={32} />
                    <h3>Work Completed!</h3>
                    <p>Actual work duration: {workDuration}</p>
                    <p>Start time: {new Date(startTime).toLocaleString()}</p>
                    <p>End time: {new Date(endTime).toLocaleString()}</p>
                </div>
            )}
        </section>
    );
}

export default BookingWorkTracker;

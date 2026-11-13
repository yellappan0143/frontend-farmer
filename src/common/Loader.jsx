
import '../style/Loader.css';
import { Tractor } from 'lucide-react';

function Loader({ message = 'Loading...' }) {
    return (
        <div className="loader-container">
            <div className="eco-loader">
                <span className="eco-ring"></span>
                <span className="eco-ring"></span>
                <span className="eco-ring"></span>

                <div className="eco-icon">
                    
                    <img className="brand-icon" src="/public/icons8-tractor (1).svg" alt="Tractor" />
                    {/* <Tractor size={35} strokeWidth={2} /> */}
                </div>
            </div>

            <h3>FarmRide</h3>
            <p>{message}</p>
        </div>
    );
}

export default Loader;

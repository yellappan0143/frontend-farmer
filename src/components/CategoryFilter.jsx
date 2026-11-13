
import { Tractor, Sprout, Wheat, Droplets, Shovel, Layers } from 'lucide-react';



const categories = [
    { name: 'All Equipment', icon: Tractor },
    { name: 'Plough', icon: Shovel },
    { name: 'Harvester', icon: Wheat },
    { name: 'Seeder', icon: Sprout },
    { name: 'Rotavator', icon: Layers },
    { name: 'Sprayer', icon: Droplets },
];


function CategoryFilter({ selectedCategory, onCategoryChange }) {
    return (
        <div className="category-list">

            {categories.map(({ name, icon: Icon }) => (

                <button
                    data-testid={`category-chip-${name}`}
                    key={name}
                    type="button"
                    className={`category-chip ${selectedCategory === name ? 'selected' : ''}`}
                    onClick={() => onCategoryChange(name)}
                    aria-pressed={selectedCategory === name}
                >

                    <Icon size={20} />

                    <span>{name}</span>

                </button>
            ))}
        </div>
    )
}

export default CategoryFilter;

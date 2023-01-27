import './directory.scss'
import CategoryItem from './../category-item/category-item.js';

const Directory = ({ categories }) => {

    return (
        <div className="categories-container">
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
}

export default Directory;
import './category-item.style.scss'

interface Category {
    id: number;
    title: string;
    imageUrl: string;
  }

  interface CategoryItemProps {
    category: Category;
  }
  

const CategoryItem = ({category}: CategoryItemProps) => {
    const {imageUrl, title} = category
    return (
        <div className="category-container">
        <div className="background-image" style={{
          backgroundImage: `url(${imageUrl})`
        }}></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
    )
}

export default CategoryItem
import {ReactNode} from 'react'
import CategoryItem from '../category-item/category-item.component'
import {DirectoryProps} from '../../types/category.types'
import './directory.styles.scss'


const Directory = ({categories}: DirectoryProps) => {
    return (
        <div className="directory-container">
        {categories.map((category) : ReactNode => {
          return (
            <CategoryItem key={category.id} category={category} />
          )
        })}
      </div>
    )
}

export default Directory;
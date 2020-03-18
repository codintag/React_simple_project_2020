import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

class CategoryList extends Component {

    state = {
        categories: [
            //     { categoryId: 1, categoryName: 'JavaScript' },
            //     { categoryId: 2, categoryName: 'PHP' },
            //     { categoryId: 3, categoryName: 'MySQL' },
            //     { categoryId: 4, categoryName: 'Python' },
            //     { categoryId: 5, categoryName: 'Angular' },
        ]
    };

    componentDidMount() {
        this.getCategories();
    }

    getCategories = (data) => {
        fetch("http://localhost:3000/categories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }))
    }

    render() {
        return (
            <div>
                <h3>{this.props.info.title}</h3>
                <ListGroup>
                    {
                        this.state.categories.map(category => (
                            <ListGroupItem active={category.categoryName === this.props.currentCategory ? true : false} onClick={() => this.props.changeCategory(category)} key={category.id}>{category.categoryName}</ListGroupItem>
                        ))
                    }
                </ListGroup>
            </div>
        )
    }
}
export default CategoryList;
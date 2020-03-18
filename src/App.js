import React, { Component } from 'react'
import Navi from './Nav';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import { Container, Row, Col } from 'reactstrap';
import alertify from 'alertifyjs';
import { Route, Switch } from 'react-router-dom'
import NotFound from './NotFound';
import CartList from './CartList';
import FormDemo1 from './FormDemo1';
import FormDemo2 from './FormDemo2';


class App extends Component {

  state = {
    currentCategory: "",
    products: [],
    cart: []
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category.id);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "/?categoryId=" + categoryId;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }))
  }

  addToCart = (product) => {
    let newCart = this.state.cart;
    let addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success("<strong>" + product.productName + "</strong>" + " added to Cart");
  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error("<strong>" + product.productName + "</strong>" + " removed from Cart");
  }

  render() {

    let productInfo = { title: "La liste des produits" }
    let categoryInfo = { title: "Les categories" }


    return (

      <div>

        <Container>

          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart}></Navi>

          <Row>
            <Col xs="3">
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={categoryInfo} />
            </Col>
            <Col xs="9">
              <Switch>
                <Route exact path="/" render={props => (
                  <ProductList
                    {...props}
                    products={this.state.products}
                    addToCart={this.addToCart}
                    currentCategory={this.state.currentCategory}
                    info={productInfo} />
                )
                } />
                <Route exact path="/cart" render={props => (
                  <CartList
                    {...props}
                    cart={this.state.cart}
                    removeFromCart={this.removeFromCart} />
                )
                } />
                <Route path="/form1" component={FormDemo1} />
                <Route path="/form2" component={FormDemo2} />
                <Route component={NotFound} />
              </Switch>


            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;

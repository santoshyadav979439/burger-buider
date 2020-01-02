import React, { Component } from "react";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
  render() {
    const ingredientSummary = this.props.ingrediants;
    const orderDetails = Object.keys(ingredientSummary).map(ingredient => (
      <li key={ingredient}>
        <span style={{ textTransform: "capitalize" }}>{ingredient}</span> :
        {ingredientSummary[ingredient]}
      </li>
    ));
    return (
      <Auxilary>
        <h3>Your order</h3>
        <p> A delicious burger with following ingrediants</p>
        <ul>{orderDetails}</ul>
        <p>
          <strong>Total Price: {this.props.price}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCELE
        </Button>
        <Button btnType="Success" clicked={this.props.success}>
          CONTINUE
        </Button>
      </Auxilary>
    );
  }
}

export default OrderSummary;

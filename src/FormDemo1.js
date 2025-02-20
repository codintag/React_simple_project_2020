import React, { Component } from 'react'

class FormDemo1 extends Component {
    state = {
        userName: ''
    }

    onChangeHandler = (event) => {
        // this.setState({ userName: event.target.value })
        let name = event.target.name;
        let value = event.target.value;

        this.setState({[name] : value})
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        alert(this.state.userName);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>UserName</h3>
                    <input name="userName" onChange={this.onChangeHandler} type="test" ></input>
                    <h3>UserName is {this.state.userName}</h3>

                    <h3>City</h3>
                    <input name="city" onChange={this.onChangeHandler} type="test" ></input>
                    <h3>City is {this.state.city}</h3>

                    <input type="submit" value="save"></input>
                </form>
            </div>
        )
    }
}
export default FormDemo1;
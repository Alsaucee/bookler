import React, { Component } from 'react'

export default class Data extends Component {
    render() {
        let number = this.props.data.indexOf(this.props.names) + 1;
        return (
            <tr>
                <td>{number}</td>
                <td>{this.props.names.name}</td>
                <td>{this.props.names.fnum}</td>
                <td>{this.props.names.office}</td>
                <td>{this.props.names.id}</td>
                <td>{this.props.names.date}</td>
            </tr>
        );
    }
}

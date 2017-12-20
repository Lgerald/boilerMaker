import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
//add a home and navbar element later

//component imports;
import First from './first'

//store import
import store from '../store'
//thunk imports


/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
    // componentDidMount () {
    //     //thunks go here

    //     //store.dispatch(thunk) goes here
    // }

    render() {
        return (
            <div>
                <First />
            </div>
        )
    }
}



/* -----------------    CONTAINER     ------------------ */
const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(Root)
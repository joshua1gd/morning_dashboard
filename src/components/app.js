import React, {Component, Fragment} from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';

import axios from 'axios';
import Test from './test';


import './general/general.scss';
import Header from './boardHeader/header'
import Footer from './boardFooter/footer';
import Home from './boardCenter/home';

import {Route, Switch} from 'react-router-dom';

class App extends Component{

    state = {
        'homeResponse': [],
        'newsResponse':[]
    }

    getLongLat(){
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);

            });
    }

    async getHomeData(){
        const resp = await axios.get('/api/response.php');
        console.log('imediate server response: ', resp);
        this.setState({
            'homeResponse' : resp.data.data
        });
    }

    async getRssData(){
        const resp = await axios.get('/api/rssResponse.php');
        console.log('rss response: ', resp);
        this.setState({
            'newsResponse': resp.data.data
        });
    }

    componentDidMount(){
        this.getLongLat();
        this.getHomeData();
        this.getRssData();
    }

    render () {
        const { agenda, quote, user_id, weather } = this.state.homeResponse;

        if(this.state.homeResponse.length === 0 ||this.state.newsResponse.length === 0){
            return (
                <div className='dashBoard'>
                    <p className="">Please Wait...</p>
                </div>
            )
        } else{
            return (
                <div className='dashBoard'>
                    <Fragment>
                        <Header agendaObj={agenda}/>
                        <Switch>
                            <Route path='/home' render={() => <Home section={'quote'} feed={quote}/>}/>
                            <Route path='/social' render={() => <Home section={'social'} />} />
                            <Route path='/news' render={() => <Home section={'news'} feed={this.state.newsResponse}/>} />
                        </Switch>
                        <Footer weatherObj={weather} />
                    </Fragment>
                    {/* <Test/> */}
                </div>
            )
        }



    }
}

export default App;

import React, { Component } from 'react'
import Header from './header'
class MainLogin extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            works: []
        }
    }

    myChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value, });
    }
    add(event) {
        var id = this.state.id;
        var name = this.state.name;
        var data = { id, name }
        if (localStorage.getItem('works') == null) {
            console.log("current it is null")
            var works = [];
            works.push(data);
            localStorage.setItem('works', JSON.stringify(works))
            this.props.history.push('/homepage');

        } else {
            console.log('Curerntly it is not null')
            works = JSON.parse(localStorage.getItem('works'));
            works.push(data);
            localStorage.setItem('works', JSON.stringify(works));
            this.props.history.push('/homepage');
        }
    }
    componentDidMount(){
        localStorage.removeItem('Url')
    }
    render() {
        return (

            <div>
                <Header/>
                <div className="row m-0">
                   
                    <div className="col-md-4 col-lg-4"></div>
                    <div className="col-md-5 col-lg-5 mt-5 mb-5 pb-5" style={{marginBottom: '100px'}}>
                    <h1>Guest Login</h1>
                        <form className="border border-white shadow-lg text-left p-4" onSubmit={this.add.bind(this)}> 
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Enter Id</label>
                                <input type="number" className="form-control"
                                    name='id'
                                    onChange={this.myChangeHandler}
                                    value={this.state.id} aria-describedby="emailHelp" placeholder="Id" required/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your cradentials with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Enter Name</label>
                                <input type="text" className="form-control"  name='name'
                                    value={this.state.name}
                                    onChange={this.myChangeHandler}
                                    placeholder="Name" required />
                            </div>
                            <button type="submit" className="btn mt-3 text-white" style={{background: '#009487'}}>Login<i className="fa fa-user pl-3"></i></button>
                        </form>
                    </div>
                    <div className="col-md-4 col-lg-4"></div>
                </div>
            
            </div>
        )

    }
}

export default MainLogin;
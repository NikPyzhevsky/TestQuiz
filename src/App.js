import React, {Component} from 'react';
import Layout from "./hoc/Layout/layout";
import Quiz from './container/Quiz/Quiz'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import QuizList from './container/Quiz/QuizList/QuizList'
import Auth from './container/Quiz/Auth/Auth'
import QuizCreator from './container/Quiz/QuizCreator/QuizCreator'
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/action';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }
  render(){

    let rutes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" exact component={QuizList}/>
        <Redirect to="/"/>
      </Switch>
    )

    if(this.props.isAuthentification){
      rutes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator}/>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={QuizList}/>
          <Redirect to="/"/>
        </Switch>
      )
    }
    return (
    <Layout>
      {rutes}
    </Layout>
  );
}
}

function mapStateToProps(state) {
  return{
    isAuthentification: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return{
    autoLogin: () => dispatch(autoLogin())
  }
}


export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App));

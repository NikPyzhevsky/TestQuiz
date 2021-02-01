import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import is from 'is_js'

import { connect } from 'react-redux'
import { auth } from '../../../store/actions/action';

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls:{
            email:{
                value:'',
                type:'email',
                label:'Email',
                errorMessage: 'Введите коректный email',
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    email:true
                }
            },
            password:{
                value:'',
                type:'password',
                label:'Пароль',
                errorMessage: 'Введите коректный password ',
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    minLength:6
                }
            }
        }
    }

    loginHndler = async () => {
       this.props.auth(
           this.state.formControls.email.value,
           this.state.formControls.password.value,
           true
       )
    }

    registerHandler = async() => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
       
    }
    SubmitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation){
        if(!validation){
            return true
        }

        let isValid = true

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }
        
        if(validation.email){
            isValid = is.email(value) && isValid
        }
        
        if(validation.minLength){
            isValid = value.length>= validation.minLength && isValid;
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        // console.log('${controlName}: ',event.target.value)

        const formControls = this.state.formControls 
        const control = formControls[controlName]

        control.value = event.target.value
        control.touched = true;
        control.valid = this.validateControl(control.value,control.validation)

        let isFormValid = true


        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

       
formControls[controlName] = control

        this.setState({
            formControls, isFormValid
        })
        // console.log("form:"+ this.state.isFormValid)
    }

    renderInputs(){
       return Object.keys(this.state.formControls).map((controlName,index) => {
            const control = this.state.formControls[controlName]
        return(
                <Input
                    key={controlName+index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }
  render(){
    return (
    <div className={classes.Auth}>
        <div>
            <h1>Авторизация</h1>

            <form onSubmit={this.SubmitHandler}>

                {this.renderInputs()}

                {/* <Input label="Email"/>
                <Input label="Password"
                    errorMessage={'Test'}
                /> */}
            
                <Button 
                    type='success' 
                    onClick={this.loginHndler}
                    disabled={!this.state.isFormValid}
                >
                    войти
                </Button>

                <Button 
                    type='primary' 
                    onClick={this.registerHandler}
                    disabled={!this.state.isFormValid}
                >
                    Зарегистрироваться
                </Button>
            </form>
        </div>
       
    </div>
  );
}
}

function mapDispatchToProps(dispatch){
    return{
        auth: (email,password,isLogin) => dispatch(auth(email,password,isLogin))
    }
}


export default connect(null, mapDispatchToProps)( Auth);

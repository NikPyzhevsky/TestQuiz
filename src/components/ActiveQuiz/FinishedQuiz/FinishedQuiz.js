import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../../UI/Button/Button'
import {Link} from 'react-router-dom'

const  FinishedQuiz = props =>{
    const successQuiz = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success'){
            total++;
        }
        return total
    },0)


    return(
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    
                    const cls =[
                        'fa',
                        props.results[quizItem.id-1] === 'error'? 'fa-times ' : 'fa-check ',
                        classes[props.results[quizItem.id-1]]
                    ]

                    return(
                        <li
                            key={index}
                        >
                            <strong>{index+1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
                {/* <li>
                    <strong>1.</strong>
                    How are you
                    <i className={'fa fa-times ' +classes.success}/>
                </li>
                <li>
                    <strong>2.</strong>
                    How are you
                    <i className={'fa fa-check ' + classes.error }/>
                </li> */}
            </ul>
            <p>Правильно {successQuiz} из {props.quiz.length}</p>
            <div>
            <Button onClick={props.onRetry} type="primary">Заново</Button>
            <Link to='/'>
            <Button type="success">Перейти к списку тестов</Button>

            </Link>
            </div>
            
        </div>
        
    )
}

export default FinishedQuiz;
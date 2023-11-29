import React, {useEffect, useState} from 'react';
import './questionTest.css';
import {Link} from "react-router-dom";

const QuestionTest = ({name, num, questions, next, submit, stats}) => {
    let question = questions[num].text
    let answers = questions[num].answers
    let [res, setRes] = useState(0);
    let [end, setEnd] = useState(false)

    let [myAnswers, setMyAnswers] = useState({})
    answers = Object.entries(answers);

    function check() {
        console.log(answers)
        let flag = true
        for (let answer of answers) {
            let otv = myAnswers[answer[0]]?.value

            if (myAnswers[answer[0]]?.value === undefined) otv = false

            console.log(myAnswers)

            if (otv !== answer[1][1]) {
                flag = false
                console.log(myAnswers[answer[0]])

                if (myAnswers[answer[0]]?.value === undefined) continue
                else {
                    myAnswers[answer[0]].isTrue = 'asnwer_true'
                }

            }
        }

        if (!next()) {
            if (flag) {
                submit(res+1)
                document.querySelector('#check').disabled = true;
                setEnd(true)
                showRes(true)
            }
            else {
                alert('res: ' + res)

            }
        }

        clearCheckboxes()
        if (flag) setRes(++res);
    }

    function refreshAnsws(value, letter) {
        let cache = {...myAnswers}
        cache[letter] = {value: value}
        setMyAnswers(cache)
    }


    function checkAnsws() {
        console.log(myAnswers)
    }

    function clearCheckboxes() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]')
        for (let checkbox of checkboxes) {
            checkbox.checked = false
            setMyAnswers({})
        }
    }

    function showRes(show) {
        if (show) document.querySelector('.test__results-popup').style.display = 'flex'
        else document.querySelector('.test__results-popup').style.display = 'none'
    }

    function showAllRes(show) {
        if (show) document.querySelector('.allResultspopup').style.display = 'flex'
        else document.querySelector('.allResultspopup').style.display = 'none'
    }

    return (
        <div className={'test__group'}>
            <button className='allResults' onClick={() => showAllRes(true)}>Показать общие результаты</button>

            <h1 className="test__question-text">{num}-й вопрос:  {question}</h1>
            <div className={"test__answers"}>



                {answers.map((answer, index) =>
                    <div className={"test__answer"} key={num+questions[num].answers[index]}>

                        <div  >

                            {index+1+')'}: {answer[1]}
                            <input data-letter={answer[0]} className={myAnswers?.[answer[0]]?.isTrue}  type="checkbox" onChange={(e) => refreshAnsws(e.target.checked, answer[0])}/>
                        </div>

                    </div>

                )}

            </div>
            <div className="isTrue">
                Правильно ответили: {res}/{num}
            </div>
            <div className='res'>
                <button id='check' className={'test__next'} onClick={check}>Check</button>
                {end === true ? <button onClick={() => showRes(true)}>Показать результат</button> : <></>}
            </div>

            <div className="test__results-popup">
                <div className="popup__content">
                    <button onClick={() => showRes(false)} className="X">X</button>
                    <p><span style={{color: 'yellow'}}>Имя:</span> {name}</p>
                    <p><span style={{color: 'yellow'}}>Результат:</span> {res}/{num}</p>
                </div>
            </div>

            <div className="allResultspopup">
                <div className="allResultspopup__content">
                    <button onClick={() => showAllRes(false)} className="X">X</button>
                    {stats.map(item =>
                        <div>
                            <span style={{color: 'yellow'}}>{item.name}:</span> {item.res}/{num}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default QuestionTest;
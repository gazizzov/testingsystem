import React, {useState} from 'react';
import './Make.css'
import axios from "axios";
import Questions from "./Questions.jsx";
import {Link} from "react-router-dom";

const Make = () => {

    let [nameOfTest, setNameOfTest] = useState();
    let [numOfQuestions, setNumOfQuestions] = useState([1]);
    let [questions, setQuestions] = useState({})

    function refreshQuestions(num, text, answers) {
        let cache = {...questions}
        if (!cache[num]) cache[num] = {}
        cache[num]['text'] = text
        cache[num]['answers'] = answers[num]
        setQuestions(cache)
    }

    async function make() {
        try {
            let form = new FormData()
            form.append('name', nameOfTest);
            console.log(JSON.stringify(questions));
            form.append('questions', JSON.stringify(questions));
            form.append('stats', JSON.stringify([]))

            let response = await axios.post('https://testingsystemtry2-f92461c47463.herokuapp.com/make', form)

            if (response.data === 200) showPopupOne(true)
            else showPopupTwo(true)
        }
        catch (e) {
            console.log(e)
        }
    }



    function addQuestion() {
        setNumOfQuestions([...numOfQuestions, numOfQuestions[numOfQuestions.length-1]+1])
    }

    function showPopupOne(show, isTrue) {
        if (show) document.querySelector('.make__popupOne').style.display = 'flex'
        else document.querySelector('.make__popupOne').style.display = 'none'
    }

    function showPopupTwo(show, isTrue) {
        if (show) document.querySelector('.make__popupTwo').style.display = 'flex'
        else document.querySelector('.make__popupTwo').style.display = 'none'
    }

    return (
            <div className="form">
                <div className='header'>
                    <ul className="nav__list">
                        <li><Link to="/make" className="nav__list-link">Создать тест</Link></li>
                        <li><Link to="/test" className="nav__list-link">Пройти тест</Link></li>
                    </ul>
                </div>

                    <input
                        className={'make__code'}
                        type="text"
                           placeholder="Придумайте код для подключения:"
                           onChange={(e) => setNameOfTest(e.target.value)}
                    />


                <Questions numberOfQuestions={numOfQuestions} func={refreshQuestions}/>

                <button className={'make__button'} onClick={() => addQuestion()}>Добавить вопрос</button>

                <button className={'make__button'} onClick={() => make()}>Создать тест</button>

                <div className="make__popupOne">
                    <div className="make__popup-contentOne">
                        <button onClick={() => showPopupOne(false)} className="X">X</button>
                        Ваш тест был удачно создан, код для его прохождения: <span style={{color: 'yellow'}}>{nameOfTest}</span>
                    </div>
                </div>

                <div className="make__popupTwo">
                    <div className="make__popup-contentTwo">
                        <button onClick={() => showPopupTwo(false)} className="X">X</button>
                        Ваш тест не был создан, так как тест с таким кодом уже существует.
                    </div>
                </div>
            </div>
    );
};

export default Make;
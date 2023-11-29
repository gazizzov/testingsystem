import React, {useState} from 'react';
import './questions.css'
import Answers from "./Answers.jsx";



const Questions = ({numberOfQuestions, func}) => {
    let [text, setText] = useState()
    let [answers, setAnswers] = useState({})

    function refreshAnswers(num, letter, value, isRight) {


        let cache = {...answers}
        if (!cache[num]) cache[num] = {}
        if (value === 'NIFIGA') {
            cache[num][letter] = [cache[num][letter][0], isRight]
        }
        else {
            cache[num][letter] = [value, isRight]
        }
        setAnswers(cache)
        console.log(cache)
    }




    return (
        <div>
            {
                numberOfQuestions.map((num) => <div  onBlur={() => func(num, text, answers)} className='questions' key={num}>
                    <div >
                        <input className="make__question" placeholder={`${num}-ый Вопрос:`} type="text" onChange={(e) => setText(e.target.value)}/>
                    </div>

                    <Answers refresh={refreshAnswers} num={num}/>

                </div>)
            }
        </div>
    );
};

export default Questions;
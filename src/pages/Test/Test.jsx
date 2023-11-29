import React, {useRef, useState} from 'react';
import './test.css'
import axios from "axios";
import QuestionTest from "./QuestionTest.jsx";
import {Link, useSearchParams} from "react-router-dom";

const Test = () => {
    let [code, setCode] = useState(0)
    let popup = useRef()
    let [nums, setNums] = useState()
    let [num, setNum] = useState(0)
    let [questions, setQuestions] = useState([])
    let [stats, setStats] = useState([])
    let [name, setName] = useState('')

    const [searchParams, setSearchParams] = useSearchParams();


    if (searchParams.get('code') && code === 0) {
        console.log(Number(searchParams.get('code')))
        setCode(Number(searchParams.get('code')))
    }

    async function fetchTest() {
        try {
            let response = await axios.get(`https://testingsystemtry2-f92461c47463.herokuapp.com/test?code=${code}`)
            console.log(JSON.parse(response.data.stats))
            setQuestions(JSON.parse(response.data.questions))
            setStats(JSON.parse(response.data.stats))


            let nums = [1]
            let i = 1
            for (let key in JSON.parse(response.data.questions)) {
                if (i === 1) {
                    i++;
                    continue;
                }
                nums[nums.length] = i++
            }
            setNums(nums)
            setNum(0)
            hide()
        }
        catch (e) {
            console.log(e)
        }

    }

    function hide() {
        popup.current.classList.toggle('hidden')
    }

    function next() {
        if (num < nums.at(-1)) {
            setNum(++num)
            return true
        } else {

            return false
        }
    }


    async function submit(res) {
        let form = new FormData()
        form.append('name', JSON.stringify(code));
        form.append('stats', JSON.stringify([...stats, {name: name, res: res}]))

        let response = await axios.post('https://testingsystemtry2-f92461c47463.herokuapp.com/update', form)

        console.log(response.data)
    }

    return (
        <div className='test'>
            <div className='header'>
                <ul className="nav__list">
                    <li><Link to="/make" className="nav__list-link">Создать тест</Link></li>
                    <li><Link to="/test" className="nav__list-link">Пройти тест</Link></li>
                </ul>
            </div>


            <div className="popup" ref={popup}>
                <div  className='form__label'>
                    Code:
                    <input className='form__input' type="text" value={code}
                           placeholder="Введите код приглашения"
                           onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                <button className='form__btn' onClick={() => fetchTest()} className='form__btn' type='submit'>Начать</button>

            </div>

            <div className="test__question">
                <button onClick={hide}>Изменить код</button>
                {num !== 0 ?
                    <>
                        <QuestionTest stats={stats} name={name} num={num} questions={questions} submit={submit} next={next}/>
                    </> : <></>
                }

                {num === 0 ?
                <>
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
                    <button onClick={next}>START</button>
                </>
                : <></>}


            </div>

        </div>

    );
};

export default Test;
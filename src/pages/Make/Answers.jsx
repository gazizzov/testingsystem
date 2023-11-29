import React, {useState} from 'react';
import './Answers.css';

const Answers = ({refresh, num}) => {
    let [letters, setLetters] = useState(['A', "B"])


    function addLetter() {
        let newLetter = String.fromCharCode(letters[letters.length-1].charCodeAt(0)+1)
        let cashe = [...letters, newLetter]
        setLetters(cashe)
    }


    return (
        <>
            {letters.map((letter, index) =>
                <>
                    <div  className='form__label' key={letter + num}>
                        <input
                               className={'make__answer'}
                               type="text"
                               placeholder={`Введите вариант ответа: ${letter}:`}
                               onChange={(e) => refresh(num, letter, e.target.value, false)}
                        />
                        <input  className={'make__checkbox'} type="checkbox" onChange={(event) => {
                            if (event.target.checked) refresh(num, letter, 'NIFIGA', true)
                            else refresh(num, letter, 'NIFIGA', false)
                        }}/>
                    </div>

                </>
            )}
            <button className={'make__button'} onClick={() => addLetter()}>Добавить вариант ответа</button>
        </>
    )
};

export default Answers;
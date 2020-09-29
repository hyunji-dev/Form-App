import React, { useState } from 'react';
import './App.css';

function App() {
    // 초기값은 안만들어도 됨
    const [movie, setMovie] = useState({
        title: '',
        rating: '',
        medium_cover_image: '',
    });

    function submit(e) {
        e.preventDefault();

        // 오브젝트를 제이슨으로 바꾸기
        let jsonUser = JSON.stringify(movie);
        console.log(jsonUser);

        // 제이슨을 다시 오브젝트로 바꾸기
        //let objectUser = JSON.parse(jsonUser);
        console.log(jsonUser);

        fetch('http://10.100.102.2:8000/api/movie', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            //body: jsonUser,
            body: JSON.stringify(movie),
        })
            .then((res) => res.text())
            .then((res) => {
                if (res === 'ok') {
                    alert('영화가 저장되었습니다.');
                }
            });
    }

    function list(e) {
        e.preventDefault();

        fetch('http://10.100.102.2:8000/api/movie')
            .then((res) => res.json())
            .then((res) => {
                setMovie(res);
            }, []);

        console.log('list movie', movie);
    }

    function inputHandle(e) {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        });
    }

    function reset(e) {
        e.preventDefault();
        setMovie({
            title: '',
            rating: '',
            medium_cover_image: '',
        }); // 값은 비워졌는데 화면을 다시 그리진 않음 연결된 돔(엘리먼트)이 없으니까...
        console.log(movie);
    }

    return (
        <div>
            <form>
                <button>영화등록</button>
                <button onClick={list}>영화목록</button>
                <br />
                <input
                    type="text"
                    value={movie.title}
                    onChange={inputHandle}
                    name="title"
                    placeholder="title을 입력하세요"
                />
                <br />
                <input
                    type="text"
                    value={movie.rating}
                    onChange={inputHandle}
                    name="rating"
                    placeholder="rating 입력하세요"
                />
                <br />
                <input
                    type="text"
                    value={movie.medium_cover_image}
                    onChange={inputHandle}
                    name="medium_cover_image"
                    placeholder="medium_cover_image를 입력하세요"
                />
                <br />
                <button onClick={submit}>등록</button>
                <button onClick={reset}>reset</button>
            </form>
        </div>
    );
}

export default App;

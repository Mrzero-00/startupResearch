import React from 'react';
import styled from 'styled-components';
import title from './img/Title.svg';
import intro_bg from './img/intro_bg.png';


function Start ({nextQuestion}) {
    const StartPage = styled.div`
        align-items:center;
        display:flex;
        flex-direction:column;
        width:100vw;
        height:100vh;
        background-color:#f7f7f7;
        color:#fff;

        .intro_title_box{
            width:100%;
            height:35%;
        }

        .intro_title{
            width:240px;
            height:100%;
            background:url(${title});
            background-size:contain;
            background-repeat:no-repeat;
            margin:5rem 0rem 0rem 2rem;
        }

        .intro_bg_box{
            width:100%;
            height:65%;
            background:url(${intro_bg});
        }


        button{
            position:fixed;
            bottom:0px;
            width:100%;
            height:56px;
            color:#fff;
            font-weight:600;
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:20px;
            padding:0.5rem 1rem;
            outline:none;
            border:none;
            background-color: #5704E2;
            
        }
    `;

    return (
        <StartPage>
            <div className="intro_title_box">
                <div className="intro_title"></div>
            </div>
            <div className="intro_bg_box">
                <div className="intro_bg_img">
                </div>
            </div>
            <button onClick={nextQuestion}>시작하기</button>
        </StartPage>
    );
}

export default Start;    
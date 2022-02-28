import React from 'react';
import styled from 'styled-components';
import title from './img/Title.svg';
import intro_bg from './img/intro_bg.png';


function Start ({nextQuestion}) {

    const StartPage = styled.div`
        align-items:center;
        display:flex;
        flex-direction:column;
        width:100%;
        height:100%;
        background-color:#f7f7f7;
        overflow:hidden;
        .intro_title_box{
            width:100%;
            height:35%;
            font-size:1.25rem;
            font-weight:700;
            margin:5rem 1rem 1rem 5rem;
        }

        .intro_title_md{
            width:100%;
            height:35%;
            font-size:2rem;
            font-weight:700;
            margin-top:30px;
        }

        .intro_bg_box{
            width:100%;
            height:65%;
        }


        button{
            position:absolute;
            bottom:0px;
            width:100%;
            max-width:480px;
            min-height:56px;
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

    const UnderText = styled.div`
        position:absolute;
        width:100%;
        bottom:100px;
        font-size:0.8rem;
        text-align:center;
    `

    return (
        <StartPage>
            <div className="intro_title_box">
                <div className="intro_title">내 생각을 말해준 대선후보는 누구?</div>
                <div className="intro_title_md">간단 질문을 찾아보는<br/>       
                    대선후보 매칭 테스트
                </div>
            </div>
            <img className="intro_bg_box" src={intro_bg}>
            </img>
            <UnderText>전국구 스타트업 매체 SBIZ-NEWS</UnderText>
            <button onClick={nextQuestion}>시작하기</button>
        </StartPage>
    );
}

export default Start;    
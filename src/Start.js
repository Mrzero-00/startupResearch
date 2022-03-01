import React from 'react';
import styled from 'styled-components';
import intro_bg from './img/intro_bg.png';


function Start ({nextQuestion}) {

    const StartPage = styled.div`
        position:relative;
        align-items:center;
        display:flex;
        flex-direction:column;
        width:100%;
        height:100%;
        background-color:#f7f7f7;
        overflow:hidden;
        text-shadow:2px 2px 2px rgba(0,0,0,0.1);
        box-shadow:2px 2px 2px rgba(0,0,0,0.1);
        
        
        .intro_title_box{
            position:absolute;
            z-index:9;
            width:100%;
            font-size:1.25rem;
            font-weight:700;
            
            /* background-color:#251a1a99; */
        }

        .intro_title{
            font-size:1.25rem;
            font-weight:700;
            padding:4rem 2rem 1rem 2rem;
            margin-top:10px; */
        }

        .intro_title_md{
            height:35%;
            padding:0rem 2rem 1rem 2rem;
            font-size:2rem;
            font-weight:700;
        }

        .intro_bg_box{
            position:absolute;
            width:100%;
            height:55%;
            bottom:0px;
        }

        .intro_btn_box{
            margin-top:8px;
            position:relative;
            width:100%;

        }

        button{
            position:absolute;
            right:2rem;
            max-width:420px;
            height:48px;
            color:#fff;
            font-weight:600;
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:20px;
            padding:0.5rem 1rem;
            outline:none;
            border:none;
            border-radius:8px;
            background-color: #5704E2;
            box-shadow:1px 1px 1px rgba(0,0,0,0.3);
            
        }
        @media(min-height:800px) {
            .intro_title{
                font-size:1.25rem;
                font-weight:700;
                padding:5rem 2rem 1rem 2rem;
                margin-top:10px; */
            }

            .intro_title_md{
                height:35%;
                padding:0rem 2rem 1rem 2rem;
                font-size:2rem;
                font-weight:700;
                margin-top:10px;
            }
            .intro_bg_box{
                position:absolute;
                width:100%;
                height:60%;
                bottom:0px;
            }
        }

        @media(max-height:512px) {
            .intro_title{
                font-size:1rem;
                font-weight:700;
                padding:2rem 2rem 0rem 2rem;
                margin-top:10px; */
            }

            .intro_title_md{
                height:35%;
                padding:0rem 2rem 0rem 2rem;
                font-size:1.5rem;
                font-weight:700;
                margin-top:10px;
            }
            .intro_bg_box{
                position:absolute;
                width:100%;
                height:60%;
                bottom:0px;
            }
        }

        @media(max-width:280px) {
            .intro_title{
                font-size:.9rem;
                font-weight:700;
                padding:3rem 2rem 0rem 2rem;
                margin-top:10px; */
            }

            .intro_title_md{
                height:35%;
                padding:1rem 2rem 1rem 2rem;
                font-size:1.3rem;
                font-weight:700;
                margin-top:10px;
            }
            .intro_bg_box{
                position:absolute;
                width:100%;
                height:60%;
                bottom:0px;
            }
        }
    `;

    const UnderText = styled.div`

        position:absolute;
        top:1rem;
        right:2rem;
        font-size:1rem;
        font-weight:bold;
        color:#323232;
        z-index:99;
        text-shadow:2px 2px 2px rgba(0,0,0,0.1); */
    `

    return (
        <StartPage>
            <div className="intro_title_box">
                <div className="intro_title">내 생각을 말해준 대선후보는 누구?</div>
                <div className="intro_title_md">간단 질문으로 찾아보는<br/>       
                    대선후보 매칭 테스트
                </div>
                <div className="intro_btn_box">
                    <button onClick={nextQuestion}>시작하기</button>
                </div>
            </div>
            <img className="intro_bg_box" src={intro_bg}>
            </img>
            <UnderText>에스비즈뉴스</UnderText>
        </StartPage>
    );
}

export default Start;    